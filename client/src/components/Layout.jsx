import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/authHook";

const Layout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (!auth.accessToken || !sessionStorage.getItem("accessToken")) {
        navigate("/login");
      } else {
        navigate("/dashboard/inicio");
      }
    }
    return () => {};
  });

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
