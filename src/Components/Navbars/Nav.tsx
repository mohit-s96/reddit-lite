import React, { ReactElement } from "react";
// import { Link } from "react-router-dom";
import { logout, flipProfile } from "../../pmr/actions";
import "./Nav.css";
import { ConnectHoc } from "pmrjs";
import { useStore } from "../../pmr/store";
import { StoreState } from "../../pmr/interfaces";

function Nav(): ReactElement {
  const [data] = useStore(Nav);
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
        <span className="nav-branding">Lite-Reddit</span>
      </div>
      <div className="nav-flex">
        <span
          className="nav-item-btn"
          role="button"
          tabIndex={0}
          onClick={flipProfile}
          onKeyDown={(e) => clickEnter(e, "profile")}
        >
          {data.profile ? "Close Profile" : "Profile"}
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

const mapState = (state: StoreState) => {
  return {
    profile: state.modalStates.profile,
  };
};

export default ConnectHoc(Nav, mapState as any);
