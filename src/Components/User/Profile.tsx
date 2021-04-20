import React, { ReactElement } from "react";
import { ConnectHoc } from "pmrjs";
import { useStore } from "../../pmr/store";
import { StoreState } from "../../pmr/interfaces";
import "./styles.css";

function Profile(): ReactElement {
  const [data] = useStore(Profile);
  return (
    <div className="profile-modal-wrapper flex-center">
      <div className="profile-modal flex-center">
        {data.user ? (
          <div className="flex-center flex-col">
            <h5>Welcome {data.user.name.first}</h5>
            <p>Your registered mail: {data.user.email}</p>
            <p>Nationality: {data.user.nat}</p>
            <p>Member since: {data.user.registered.age} years</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const mapState = (state: StoreState) => {
  return {
    user: state.user,
  };
};

export default ConnectHoc(Profile, mapState as any);
