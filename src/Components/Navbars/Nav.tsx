import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

interface Props {
  isAuth?: boolean;
  name?: string;
  avatar?: string;
}

function Nav({}: Props): ReactElement {
  return (
    <nav className="main-nav-block">
      <div className="nav-flex">
        <span className="nav-branding">SpReddit</span>
      </div>
      <div className="nav-flex">
        <span className="nav-item-btn">Profile</span>
        <span className="nav-item-btn">Random Sub</span>
        <span className="nav-item-btn">Logout</span>
        <span className="nav-item-btn">
          <Link to="/login">Login</Link>
        </span>
      </div>
    </nav>
  );
}

export default Nav;
