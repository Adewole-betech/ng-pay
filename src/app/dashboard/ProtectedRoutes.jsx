import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import store from "../../redux/store/store";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector(() => store.getState().login);
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
