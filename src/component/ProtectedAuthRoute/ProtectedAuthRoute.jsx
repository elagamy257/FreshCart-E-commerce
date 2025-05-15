import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../context/userContext";

const ProtectedAuthRoute = ({ children }) => {
  const { isLogin } = useContext(userContext);
  const token = localStorage.getItem("userToken"); // Changed from "tkn" to "userToken"

  if (token && isLogin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAuthRoute;