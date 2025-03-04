import {Divider, List} from "@mui/material";
import {Todo} from "../todos.types.ts";
import {TodoListItem} from "./TodoListItem.tsx";

export const TodoList = ({ todos = [] }: { todos: Todo[] }) => {
  return (
    <List className="todos-list">
      {todos?.map((todo, index) => (
        <div key={todo.id}>
          <TodoListItem todo={todo} />
          {index < todos.length - 1 && <Divider/>}
        </div>
      ))}
    </List>
  );
};
