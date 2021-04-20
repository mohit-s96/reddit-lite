import React, { ReactElement } from "react";
import { StoreState } from "../../pmr/interfaces";
import { setActiveSub } from "../../pmr/actions";
import { ConnectHoc } from "pmrjs";
import { useStore } from "../../pmr/store";

function SelectSub(): ReactElement {
  const [data] = useStore(SelectSub);
  const changeActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "NA" && !data.postsLoading) {
      setActiveSub(e.target.value);
    }
  };
  return (
    <div className="sub-select-container flex-center">
      {data.activeSub ? <p>Active sub : {data.activeSub}</p> : null}
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select name="sub-select" id="sub-select" onChange={changeActive}>
        <option value="NA">None Selected</option>
        <option value="memes">Memes</option>
        <option value="gaming">Gaming</option>
        <option value="okbuddyretard">OKBR</option>
        <option value="pics">Pics</option>
        <option value="dankmemes">Dank Memes</option>
      </select>
    </div>
  );
}

const mapState = (state: StoreState) => {
  return {
    activeSub: state.activeSub,
    postsLoading: state.loading.postsLoading,
  };
};

export default ConnectHoc(SelectSub, mapState as any);
