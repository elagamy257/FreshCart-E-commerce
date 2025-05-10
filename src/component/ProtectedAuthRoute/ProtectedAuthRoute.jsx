import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }) => {
  if (localStorage.getItem("tkn") !== null) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedAuthRoute;