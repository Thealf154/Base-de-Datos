import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../../css/filling.css";
import "../../css/dashboard-component.css";

const Dashboard = () => {
  const [isSidebarExpanded, setSidebarIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSidebarIsExpanded = () => {
    setSidebarIsExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    if (
      location.pathname === "dashboard/" ||
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      navigate("inicio");
    }
    return () => {};
  });

  return (
    <div id="layout">
      <Sidebar isSidebarExpanded={isSidebarExpanded} />
      <div id="content">
        <Topbar
          isSidebarExpanded={isSidebarExpanded}
          onSidebarIsExpanded={handleSidebarIsExpanded}
        />
        <div
          id="main"
          className={isSidebarExpanded ? "main-expanded" : "main-contracted"}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
