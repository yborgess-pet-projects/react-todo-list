import {Button, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Todo} from "../todos.types.ts";
import {useEditModeContext, useTodosContext} from "../context/TodosContextProvider.tsx";

export const TodoListItem = ({ todo }: { todo: Todo }) => {
  const { editMode, enableEditMode } = useEditModeContext();
  const { updateTodo, deleteTodo } = useTodosContext();

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <div className="flex gap-4">
          <Button
            disabled={editMode}
            className={"edit-btn"}
            variant="contained"
            onClick={e => {
              e.stopPropagation();
              enableEditMode(todo);
            }}>
            Edit
          </Button>
          <Button
            disabled={editMode}
            variant="contained"
            color="error"
            onClick={e => {
              e.stopPropagation();
              deleteTodo(todo.id)
            }}>
            Delete
          </Button>
        </div>
      }
    >
      <ListItemButton
        disabled={editMode}
        dense
        sx={{ paddingLeft: 2, paddingRight: 2 }}
        onClick={() => {
          const updated = { ...todo, completed: !todo.completed }
          updateTodo(updated)
        }}>
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
  );
};
