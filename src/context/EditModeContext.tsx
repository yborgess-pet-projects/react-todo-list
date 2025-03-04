import {createContext} from "react";
import {EditModeContextType} from "../todos.types.ts";

export const EditModeContext = createContext<EditModeContextType | null>(null);