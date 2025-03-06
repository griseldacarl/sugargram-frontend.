import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.currentUser);

  return isAuthenticated ? children : <Navigate to={"/Login"} />;
};

export default PrivateRoutes;
