import React, { ReactElement } from "react";
import { ConnectHoc } from "pmrjs";
import { useStore } from "../../pmr/store";
import PostCard from "./PostCard";
import "./styles.css";
import { StoreState } from "../../pmr/interfaces";

function ShowSub(): ReactElement {
  const [data] = useStore(ShowSub);
  return (
    <div className="flex-center show-sub-wrapper">
      {data.postsLoading ? (
        <p>Loading</p>
      ) : data.posts?.length ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.posts.map((x: any) => (
          <PostCard data={x} key={Math.random() * 1000000} />
        ))
      ) : (
        "No posts"
      )}
    </div>
  );
}

const mapState = (state: StoreState) => {
  return {
    posts: state.posts,
    postsLoading: state.loading.postsLoading,
  };
};

export default ConnectHoc(ShowSub, mapState as any);
