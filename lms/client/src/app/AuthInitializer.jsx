import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreAuth } from "../features/auth/authThunk/authThunks.js";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  return children;
}

export default AuthInitializer;