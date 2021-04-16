/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fetchOnLoad } from "../utils/actions";
import AddUser from "./AddUser";
import Users from "./Users";
import { useStore, ConnectHoc } from "../pmr/pmrReactHooks";
import { State, StateSlice } from "../pmr/interfaces";

const UserComponent = () => {
  // console.log("ran image comp");
  const [count] = useStore(UserComponent);
  // console.log(count);
  React.useEffect(() => {
    fetchOnLoad();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1080px",
          margin: "0 auto",
          // backgroundColor: "red",
          flexWrap: "wrap",
        }}
      >
        {count && (count as any).loading ? (
          "Loading"
        ) : count && (count as any).users && (count as any).users.length ? (
          <Users data={(count as any).users} />
        ) : (
          "no data"
        )}
      </div>
      <AddUser />
    </div>
  );
};

const mapState: StateSlice = (state: State) => ({
  users: state.users,
  loading: state.loading,
  auth: state.test.newTest.isAuth,
});

export default ConnectHoc(UserComponent, mapState);
