import { useStore, ConnectHoc } from "../pmr/pmrReactHooks";
import { State, StateSlice } from "../pmr/interfaces";
const Counter2 = () => {
  const [count, setCount] = useStore(Counter2);
  return (
    <div style={{ textAlign: "center" }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <span id="count">{count && (count as any).two}</span>
      <br />
      <button id="btn" onClick={() => setCount({ type: "DECREMENT" })}>
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
