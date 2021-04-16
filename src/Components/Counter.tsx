import { useStore, ConnectHoc } from "../pmr/pmrReactHooks";
import { State, StateSlice } from "../pmr/interfaces";
const Counter: React.FunctionComponent = () => {
  const [count, setCount] = useStore(Counter);
  // console.log("counter ran");
  return (
    <div style={{ textAlign: "center" }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <span id="count">{count && (count as any).one}</span>
      <br />
      <button id="btn" onClick={() => setCount({ type: "INCREMENT" })}>
        Increase
      </button>
      {/* <button onClick={() => unsub()}>Unsub</button> */}
      {/* <button onClick={() => sub()}>Sub</button> */}
    </div>
  );
};

const mapState: StateSlice = (state: State) => ({
  one: state.one,
});

export default ConnectHoc(Counter, mapState);
