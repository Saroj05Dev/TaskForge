import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "@/routes";
import { restoreSession } from "@/features/auth/login/loginSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
