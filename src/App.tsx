// import image from "./test.png";
import "./style.css";
import Counter from "./Components/Counter";
import Counter2 from "./Components/Counter2";
import UserComponent from "./Components/UserComponent";
// import TestComp from "./Components/TestComp";

const App = () => {
  // const num = 5;
  return (
    <>
      <Counter />
      <Counter2 />
      <UserComponent />
      {/* <TestComp /> */}
    </>
  );
};

export default App;
