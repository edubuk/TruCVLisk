// import packages
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("googleIdToken");

  useEffect(() => {
    if (!user) {
      return navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
      <Outlet />
  );
};

export default ProtectedRoute;