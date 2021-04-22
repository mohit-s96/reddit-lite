import React, { ReactElement, useState } from "react";
import { StoreState } from "../../pmr/interfaces";
import { setActiveSub } from "../../pmr/actions";
import { ConnectHoc } from "pmrjs";
import { useStore } from "../../pmr/store";

function SelectSub(): ReactElement {
  const [search, setState] = useState("");
  const [data] = useStore(SelectSub);
  const changeActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "NA" && !data.postsLoading) {
      setActiveSub(e.target.value);
    }
  };
  const searchClick = () => {
    setActiveSub(search);
    setState("");
  };
  return (
    <div className="sub-select-container flex-center">
      {data.activeSub ? (
        <p className="no-content">Active sub : {data.activeSub}</p>
      ) : null}
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select
        name="sub-select"
        id="sub-select"
        onChange={changeActive}
        className="input-style"
      >
        <option value="NA">Select from these</option>
        <option value="memes">Memes</option>
        <option value="gaming">Gaming</option>
        <option value="okbuddyretard">OKBR</option>
        <option value="pics">Pics</option>
        <option value="dankmemes">Dank Memes</option>
      </select>
      <div>OR</div>
      <div>
        <input
          type="text"
          placeholder="Search here"
          value={search}
          className="input-style"
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
        <button onClick={searchClick} className="click-btn input-style">
          Search
        </button>
      </div>
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
