import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./userContext";

const ProtectedRoute = () => {
  const { userInfo, loading } = useUser();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
