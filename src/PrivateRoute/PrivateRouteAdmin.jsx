/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const PrivateRouteAdmin = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin] = useAdmin();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && isAdmin) {
    return <>{children}</>;
  }

  return <Navigate to="/#/dashboard" state={{ from: location }} replace />;
};

export default PrivateRouteAdmin;
