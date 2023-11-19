import {createContext, useEffect, useState} from "react";
import TodoForm from "./components/todoForm.jsx";
import TodoList from "./components/todoList.jsx";
import {Container} from "react-bootstrap";
import {addNewTodoApi, deleteTodoApi, editTitleApi, retrieveTodos, updateTodoApi} from "./api.js";
import Loading from "./components/loading.jsx";
import Error from "./components/error.jsx";

export const EditModeCtx = createContext(false);

function App() {
    const [todos, setTodos] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [todo, setTodo] = useState({id: '', title: '', completed: false})

    useEffect(() => {
        let ignore = false
        retrieveTodos()
            .then(json => {
                if(!ignore) {
                    setTodos(json)
                }
            })
            .catch(apiError => {
                setError(apiError)
            })
            .finally(() => setLoading(false))

        return () => (
            ignore = true
        )
    }, []);

    function onSubmitForm(todo) {
        setLoading(true)
        if (!editMode) {
            addNewTodoApi(todo)
                .then(json => {
                    setTodos((current) => {
                        return [...current, json]
                    })
                    setTodo({id: '', title: '', completed: false})
                })
                .catch(apiError => {
                    setError(apiError)
                })
                .finally(() => setLoading(false))
        } else {
            editTitleApi(todo)
                .then(json => {
                    setTodos(current => {
                        return current.map(todo => {
                            if (todo.id === json.id) {
                                return json
                            }
                            return todo
                        })
                    })
                    setTodo({id: '', title: '', completed: false})
                    setEditMode(false)
                })
                .catch(apiError => {
                    setError(apiError)
                })
                .finally(() => setLoading(false))
        }
    }

    function toggleCompleted(id, completed) {
        setLoading(true)
        updateTodoApi(id, completed)
            .then(json => {
                setTodos(current => {
                    return current.map(todo => {
                        if (todo.id === id) {
                            return json
                        }
                        return todo
                    })
                })
            })
            .catch(apiError => {
                setError(apiError)
            })
            .finally(() => setLoading(false))
    }

    function deleteTodo(id) {
        setLoading(true)
        deleteTodoApi(id)
            .then(() => setTodos(current => {
                return current.filter(t => t.id !== id)
            }))
            .catch(apiError => {
                setError(apiError)
            })
            .finally(() => setLoading(false))
    }

    function editHandler(id) {
        setEditMode(true)
        setTodo(todos.find(todo => todo.id === id))
    }

    return (
        <>
            {error && <Error msg={error}/>}
            {loading && <Loading/>}

            <EditModeCtx.Provider value={{
                editMode,
                setEditMode
            }}>
                <Container fluid="sm">
                    <TodoForm onSubmitForm={onSubmitForm}
                              todo={todo}
                    />
                    <TodoList todos={todos}
                              completeHandler={toggleCompleted}
                              deleteHandler={deleteTodo}
                              editHandler={editHandler}
                    />
                </Container>
            </EditModeCtx.Provider>
        </>
    )
}

export default App
