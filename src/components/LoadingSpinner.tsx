import {Backdrop, CircularProgress} from "@mui/material";
import {useTodosContext} from "../context/TodosContextProvider.tsx";

export const LoadingSpinner = () => {
  const { loading } = useTodosContext();
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
};
