import {EditModeContext} from "./EditModeContext.tsx";
import {ReactNode, useContext, useState} from "react";
import {useTodos} from "../hooks/useTodos.tsx";
import {TodosContext} from "./TodosContext.tsx";
import {Todo} from "../todos.types.ts";

const todoHolder: Todo = {
  id: 0,
  title: '',
  completed: false,
};

export const TodosContextProvider = ({ children }:
                                     { children: ReactNode }) => {
  const [editMode, setEditMode] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo>(todoHolder);
  const { todos, addTodo, updateTodo, deleteTodo, loading, error } = useTodos();

  const disableEditMode = () => {
    setEditMode(false);
    setEditingTodo(todoHolder);
  }

  const enableEditMode = (todo: Todo) => {
    setEditMode(true);
    setEditingTodo(todo);
  }

  return (
    <EditModeContext.Provider value={{ editMode, editingTodo, setEditingTodo, enableEditMode, disableEditMode }}>
      <TodosContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, loading, error }}>
        {children}
      </TodosContext.Provider>
    </EditModeContext.Provider>
  );
};

export const useEditModeContext = () => {
  const editModeContext = useContext(EditModeContext);
  if (!editModeContext) {
    throw new Error("useEditModeContext must be used within a TodosContextProvider");
  }
  return editModeContext;
}

export const useTodosContext = () => {
  const todosContext = useContext(TodosContext);
  if (!todosContext) {
    throw new Error("useTodosContext must be used within a TodosContextProvider");
  }
  return todosContext;
}

