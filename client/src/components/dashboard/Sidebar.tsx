import React from "react";
import "../../css/sidebar.css";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import {
  IoBookOutline,
  IoCogOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoRocket,
  IoSchoolOutline,
  IoShieldOutline,
} from "react-icons/io5";

const Sidebar = ({ isSidebarExpanded }: {isSidebarExpanded: boolean }) => {
  return (
    <>
      <IconContext.Provider
        value={{ className: "sidebar-icons", size: "2.0em" }}
      >
        <nav
          className={
            isSidebarExpanded
              ? "navbar side-expanded"
              : "navbar side-contracted"
          }
        >
          <ul className="navbar-nav">
            <li className="nav-logo">
                <a href="/#" className="nav-link">
                    <IoRocket id="logo" className=""/>
                    <span className="option-title logo-text">Alfredo</span>
                </a>
            </li>
            <li className="nav-item">
              <NavLink
                to="inicio"
                className={({ isActive }) =>
                  isActive ? "nav-link link-active" : "nav-link link-inactive"
                }
              >
                <IoHomeOutline />
                <span className="option-title">Inicio</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="materias"
                className={({ isActive }) =>
                  isActive ? "nav-link link-active" : "nav-link link-inactive"
                }
              >
                <IoBookOutline />
                <span className="option-title">Materias</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="docentes"
                className={({ isActive }) =>
                  isActive ? "nav-link link-active" : "nav-link link-inactive"
                }
              >
                <IoPersonOutline />
                <span className="option-title">Docentes</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="alumnos"
                className={({ isActive }) =>
                  isActive ? "nav-link link-active" : "nav-link link-inactive"
                }
              >
                <IoSchoolOutline />
                <span className="option-title">Alumnos</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="incidencias"
                className={({ isActive }) =>
                  isActive ? "nav-link link-active" : "nav-link link-inactive"
                }
              >
                <IoShieldOutline />
                <span className="option-title">Incidencias</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="admin"
                className={({ isActive }) =>
                  isActive ? "nav-link link-active" : "nav-link link-inactive"
                }
              >
                <IoCogOutline />
                <span className="option-title">Administrador</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
