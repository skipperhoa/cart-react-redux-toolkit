import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
export function RequireAuth({ children }) {
  const { success } = useSelector(state=>state.login);
  let location = useLocation();
  if (!success) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}