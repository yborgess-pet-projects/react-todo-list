import './App.css'
import {useTodos} from "./api/todos.api.ts";
import {
  Alert,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField
} from "@mui/material";
import {MouseEvent, useEffect, useState} from "react";
import {Todo} from "./todos.types.ts";

const todoHolder: Todo = { id: 0, title: '', completed: false }

function App() {
  const { loading, error, data, updateTodo, deleteTodo, addTodo } = useTodos()
  const [editTodo, setEditTodo] = useState<Todo>(todoHolder)
  const [editMode, setEditMode] = useState(false)

  const onCompleteClick = (todo: Todo) => {
    void updateTodo(todo);
  }

  const onDeleteClick = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    void deleteTodo(id)
  }

  const onEditClick = (e: MouseEvent<HTMLButtonElement>, todo: Todo) => {
    e.stopPropagation()
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
          <List className="todos-list">
            {data?.map((todo, index) => (
              <div key={todo.id}>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <div className="flex gap-4">
                      <Button
                        disabled={editMode}
                        className={"edit-btn"}
                        variant="contained"
                        onClick={e => onEditClick(e, todo)}>
                        Edit
                      </Button>
                      <Button
                        disabled={editMode}
                        variant="contained"
                        color="error"
                        onClick={e => onDeleteClick(e, todo.id)}>
                        Delete
                      </Button>
                    </div>
                  }
                >
                  <ListItemButton
                    disabled={editMode}
                    dense
                    sx={{ paddingLeft: 2, paddingRight: 2 }}
                    onClick={() => onCompleteClick({ ...todo, completed: !todo.completed })}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={todo.completed}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={todo.title}
                      sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    />
                  </ListItemButton>
                </ListItem>
                {index < data.length - 1 && <Divider/>}
              </div>
            ))}
          </List>


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
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default App


