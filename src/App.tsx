// import image from "./test.png";
import Layout from "./Components/Layout/Layout";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import AuthRoute from "./Components/Authentication/AuthRoute.jsx";
import "./style.css";
// import Counter from "./Components/Counter";
// import Counter2 from "./Components/Counter2";
// import UserComponent from "./Components/UserComponent";
// import TestComp from "./Components/TestComp";

const App = () => {
  // const num = 5;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
