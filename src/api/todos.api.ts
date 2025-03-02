import axios, {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {Convert, Todo} from "../todos.types";
import {config} from "../config";

const axiosConfig = {
  baseURL: config.BACKEND_BASE_URL,
  timeout: config.BACKEND_TIMEOUT,
  headers: { 'Content-Type': 'application/json' }
}
export const todosApi = axios.create(axiosConfig);

export const useTodos = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (internalLoading) {
      timer = setTimeout(() => setLoading(true), 1000); // delay of 500ms
    } else {
      setLoading(false);
    }
    return () => clearTimeout(timer);
  }, [internalLoading]);

  const handleError = (err: unknown) => {
    console.log(err)
    if (axios.isAxiosError(err)) {
      setError(err);
    } else {
      const errMsg = (err as Error).message;
      setError(new AxiosError(errMsg));
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInternalLoading(true);
        const resp = await todosApi.get<Todo[]>('/todos');
        setData(resp.data);
      } catch (err) {
        handleError(err);
      } finally {
        setInternalLoading(false);
      }
    }

    void fetchData();
  }, []);

  const updateTodo = async (todo: Todo) => {
    const config = {
      ...axiosConfig,
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    }

    try {
      setInternalLoading(true);
      const body = Convert.todoToJson(todo);
      await todosApi.patch(`/todos/${todo.id}`, body, config);
      setData(data.map(t => t.id === todo.id ? todo : t));
    } catch (err) {
      handleError(err);
    } finally {
      setInternalLoading(false);
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      setInternalLoading(true);
      await todosApi.delete(`/todos/${id}`);
      setData(data.filter(todo => todo.id !== id))
    } catch (err) {
      handleError(err);
    } finally {
      setInternalLoading(false);
    }
  }

  const addTodo = async (title: string) => {
    try {
      setInternalLoading(true);
      const resp = await todosApi.post(`/todos/`, { title: title })
      setData([...data, resp.data])
    } catch (err) {
      handleError(err);
    } finally {
      setInternalLoading(false);
    }
  }

  return { loading, error, data, updateTodo, deleteTodo, addTodo };
};
