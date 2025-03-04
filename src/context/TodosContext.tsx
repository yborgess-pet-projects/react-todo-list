import {createContext} from "react";
import {TodosContextType} from "../todos.types.ts";

export const TodosContext = createContext<TodosContextType | null>(null);