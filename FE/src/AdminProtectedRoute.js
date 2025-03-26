import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ApiUrl = process.env.REACT_APP_API_BASE_URL;

const AdminProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get(ApiUrl + "/api/admin/check", { withCredentials: true })
      .then(() => {
        console.log("인증 성공");
        setIsAuth(true);
      })
      .catch((err) => {
        console.warn("인증 실패", err);
        setIsAuth(false);
      });
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default AdminProtectedRoute;
