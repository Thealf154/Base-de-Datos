import React from "react";
import { IconContext } from "react-icons";
import {
  IoLogOutOutline,
  IoNotificationsOutline,
  IoReorderThreeOutline,
  IoSearchOutline,
} from "react-icons/io5";
import "../../css/topbar.css";
import { useAuth } from "../../hooks/authHook";
import { useNavigate } from "react-router";
import Profile from "../../assets/profile.png";

type Props = {
  isSidebarExpanded: boolean;
  onSidebarIsExpanded: VoidFunction;
};

const Topbar = (props: Props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signout(() => {
      navigate("/login");
    });
  };

  return (
    <IconContext.Provider value={{ className: "topbar-icons", size: "1.6em" }}>
      <nav
        className={
          props.isSidebarExpanded
            ? "topbar top-expanded"
            : "topbar top-contracted"
        }
      >
        <div className="topbar-menu-left">
          <button
            className="expand-contract-sidebar button-icon"
            onClick={() => props.onSidebarIsExpanded()}
          >
            <IoReorderThreeOutline size={"2.2rem"} />
          </button>
          <div className="searchbox-container">
            <IoSearchOutline size={"1.5rem"} />
            <input
              type="text"
              name="searchbox"
              id="searchbox"
              placeholder="Buscar..."
            />
          </div>
        </div>
        <div className="topbar-menu-right">
          <button className="button-icon">
            <div className="new-notification-circle"></div>
            <IoNotificationsOutline size={"1.7rem"} />
          </button>
          <div className="userbox-container">
            <div className="userbox">
              <img src={Profile} alt="" className="profile-pic" />
              <span>
                <span className="username">Alfredo Vanegas</span>
                <span className="role">Administrador</span>
              </span>
              <button className="logout-button" onClick={() => handleLogout()}>
                <IoLogOutOutline size={"1.6rem"} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </IconContext.Provider>
  );
};

export default Topbar;
