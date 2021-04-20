import React, { ReactElement, useEffect } from "react";
import Nav from "../Navbars/Nav";
import Profile from "../User/Profile";
import { StoreState } from "../../pmr/interfaces";
import SelectSub from "../SubredditViews/SelectSub";
import ShowSub from "../SubredditViews/ShowSub";
import { loadPagination } from "../../pmr/actions";
import { ConnectHoc } from "pmrjs";
import { useStore } from "../../pmr/store";

function Layout(): ReactElement {
  const [data] = useStore(Layout);
  // console.log(data);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
        !data.paginationLoading
      ) {
        loadPagination();
      }
    });
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div>
      <Nav />
      {data.profile ? <Profile /> : null}
      <SelectSub />
      <ShowSub />
      {data.paginationLoading ? <p>Loading...</p> : null}
    </div>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapState = (state: StoreState) => {
  return {
    isAuth: state.isAuth,
    profile: state.modalStates.profile,
    paginationLoading: state.loading.paginationLoading,
    activeSub: state.activeSub,
    nextPageId: state.nextPageId,
  };
};
export default ConnectHoc(Layout, mapState as any);
