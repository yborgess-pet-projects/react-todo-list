import './App.css'
import {TodosContextProvider} from "./context/TodosContextProvider.tsx";
import {TodoMain} from "./components/TodoMain.tsx";

function TodoApp() {
  return (
    <TodosContextProvider>
      <TodoMain />
    </TodosContextProvider>
  )
}

export default TodoApp


