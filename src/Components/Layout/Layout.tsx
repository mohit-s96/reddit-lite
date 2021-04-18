import React, { ReactElement } from "react";
import Nav from "../Navbars/Nav";
import { ConnectHoc, useStore } from "../../pmr/pmrReactHooks";

function Layout(): ReactElement {
  const [data] = useStore(Layout);
  console.log(data);

  return (
    <div>
      <Nav />
    </div>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapState = (state: any) => {
  return {
    isAuth: state.isAuth,
  };
};
export default ConnectHoc(Layout, mapState);
