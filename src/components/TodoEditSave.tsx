import {Button, TextField} from "@mui/material";
import {useEffect, useRef} from "react";
import {useEditModeContext, useTodosContext} from "../context/TodosContextProvider.tsx";

export const TodoEditSave = () => {
  const { editMode, editingTodo, setEditingTodo, disableEditMode } = useEditModeContext();
  const { addTodo, updateTodo } = useTodosContext();

  const defaultBtn = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        defaultBtn.current?.click();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    inputRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const onSaveEdit = () => {
    if (!editingTodo.title.trim()) {
      return
    }
    if (editMode) {
      void updateTodo(editingTodo)
    } else {
      void addTodo(editingTodo.title)
    }
    disableEditMode();
    inputRef.current?.blur();
  }

  const onCancel = () => {
    disableEditMode();
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  }

  return (
    <div className="flex mt-6 gap-4">
      <TextField
        id="todo-input"
        ref={inputRef}
        fullWidth
        size={"small"}
        value={editingTodo.title}
        onChange={e => {
          setEditingTodo({ ...editingTodo, title: e.target.value })
        }}
      />
      {/* Edit Save Btn */}
      <Button
        ref={defaultBtn}
        variant="contained"
        color="primary"
        onClick={onSaveEdit}
      >
        {editMode ? "Save" : "Add"}
      </Button>

      {/* Cancel Button */}
      {editMode &&
        <Button
          variant="contained"
          color="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      }
    </div>
  );
};
