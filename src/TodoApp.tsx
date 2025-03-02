import './App.css'
import {useTodos} from "./api/todos.api.ts";
import {Alert, Backdrop, Button, CircularProgress, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Todo} from "./todos.types.ts";
import {TodoList} from "./components/TodoList.tsx";

const todoHolder: Todo = { id: 0, title: '', completed: false }

function TodoApp() {
  const { loading, error, data, updateTodo, deleteTodo, addTodo } = useTodos();
  const [editTodo, setEditTodo] = useState<Todo>(todoHolder);
  const [editMode, setEditMode] = useState(false);

  const onComplete = (todo: Todo) => {
    void updateTodo(todo);
  }

  const onDelete = (id: number) => {
    void deleteTodo(id)
  }

  const onEdit = (todo: Todo) => {
    setEditTodo(todo)
    setEditMode(true)
    document.getElementById('todo-input')?.focus()
  }

  const onSaveEditClick = () => {
    if (!editTodo.title.trim()) {
      return
    }
    if (editMode) {
      void updateTodo(editTodo)
    } else {
      void addTodo(editTodo.title)
    }
    setEditMode(false)
    setEditTodo(todoHolder)
    document.getElementById('todo-input')?.blur();
  }

  const onCancelClick = () => {
    setEditMode(false)
    setEditTodo(todoHolder)
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const defaultButton = document.getElementById('default-button');
        if (defaultButton) {
          defaultButton.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {error && <Alert severity="error" sx={{ width: '100%' }}>{error.message}</Alert>}
      <div className="flex items-center justify-center">
        <div className="w-[700px]">
          <h1 className="flex items-center justify-center text-3xl m-4">
            Todo List
          </h1>

          <TodoList todos={data}
                    editMode={editMode}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onComplete={onComplete}
          />

          <div className="flex mt-6 gap-4">
            <TextField
              id="todo-input"
              fullWidth
              size={"small"}
              value={editTodo?.title}
              onChange={e => {
                setEditTodo({ ...editTodo, title: e.target.value })
              }}
            />
            {/* Edit Save Btn */}
            <Button
              id="default-button"
              variant="contained"
              color="primary"
              onClick={() => onSaveEditClick()}
            >
              {editMode ? "Save" : "Add"}
            </Button>

            {/* Cancel Button */}
            {editMode &&
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onCancelClick()}
              >
                Cancel
              </Button>
            }
          </div>
        </div>
      </div>
      {/* Loading effect */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
    </>
  )
}

export default TodoApp


