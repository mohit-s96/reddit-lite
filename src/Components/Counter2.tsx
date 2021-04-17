import { useStore, ConnectHoc } from "../pmr/pmrReactHooks";
import { State, StateSlice } from "../pmr/interfaces";
import { subOne } from "../utils/actions";
const Counter2 = () => {
  const [count] = useStore(Counter2);
  return (
    <div style={{ textAlign: "center" }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <span id="count">{count && (count as any).two}</span>
      <br />
      <button id="btn" onClick={subOne}>
        Decrease
      </button>
      {/* <button onClick={() => unsub()}>Unsub</button> */}
      {/* <button onClick={() => sub()}>Sub</button> */}
    </div>
  );
};

const mapState: StateSlice = (state: State) => ({
  two: state.two,
});

export default ConnectHoc(Counter2, mapState);
