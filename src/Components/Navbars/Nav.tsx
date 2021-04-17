import React, { ReactElement } from "react";
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
      </div>
    </nav>
  );
}

export default Nav;
