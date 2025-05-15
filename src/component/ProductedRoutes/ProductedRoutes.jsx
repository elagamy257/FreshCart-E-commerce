import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../context/userContext";

export default function ProductedRoutes(props) {
  const { isLogin } = useContext(userContext);
  const token = localStorage.getItem("userToken");

  if (token && isLogin) {
    return props.children;
  } else {
    return <Navigate to="/login" replace />;
  }
}