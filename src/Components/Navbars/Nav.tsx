import React, { ReactElement } from "react";
// import { Link } from "react-router-dom";
import { logout, flipProfile } from "../../pmr/actions";
import "./Nav.css";

interface Props {
  isAuth?: boolean;
  name?: string;
  avatar?: string;
}

function Nav({}: Props): ReactElement {
  const clickEnter = (e: React.KeyboardEvent, type: string) => {
    if (e.keyCode === 13) {
      if (type === "logout") {
        logout();
      } else {
        flipProfile();
      }
    }
  };

  return (
    <nav className="main-nav-block">
      <div className="nav-flex">
        <span className="nav-branding">SpReddit</span>
      </div>
      <div className="nav-flex">
        <span
          className="nav-item-btn"
          role="button"
          tabIndex={0}
          onClick={flipProfile}
          onKeyDown={(e) => clickEnter(e, "profile")}
        >
          Profile
        </span>
        <span className="nav-item-btn">Random Sub</span>
        <span
          className="nav-item-btn"
          role="button"
          tabIndex={0}
          onClick={logout}
          onKeyDown={(e) => clickEnter(e, "logout")}
        >
          Logout
        </span>
      </div>
    </nav>
  );
}

export default Nav;
