import {Button, Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Todo} from "../todos.types.ts";

export const TodoList = ({ todos = [], editMode, onEdit, onDelete, onComplete }: {
  todos: Todo[],
  editMode: boolean,
  onEdit: Function,
  onDelete: Function,
  onComplete: Function,
}) => {

  return (
    <List className="todos-list">
      {todos?.map((todo, index) => (
        <div key={todo.id}>
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
                    onEdit(todo)
                  }}>
                  Edit
                </Button>
                <Button
                  disabled={editMode}
                  variant="contained"
                  color="error"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(todo.id)
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
              onClick={() => onComplete({ ...todo, completed: !todo.completed })}>
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
          {index < todos.length - 1 && <Divider/>}
        </div>
      ))}
    </List>
  );
};
