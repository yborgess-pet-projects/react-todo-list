import {Alert} from "@mui/material";
import {TodoList} from "./TodoList.tsx";
import {TodoEditSave} from "./TodoEditSave.tsx";
import {useTodosContext} from "../context/TodosContextProvider.tsx";
import {LoadingSpinner} from "./LoadingSpinner.tsx";

export const TodoMain = () => {
  const { error, todos } = useTodosContext();
  return (
    <>
      {error && <Alert severity="error" sx={{ width: '100%' }}>{error.message}</Alert>}
      <div className="flex items-center justify-center">
        <div className="w-[700px]">
          <h1 className="flex items-center justify-center text-3xl m-4">
            Todo List
          </h1>

          <TodoList todos={todos}/>

          <TodoEditSave/>
        </div>
      </div>
      <LoadingSpinner />
    </>
  )
    ;
};
