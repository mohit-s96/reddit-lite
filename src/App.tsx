// import image from "./test.png";
import Layout from "./Components/Layout/Layout";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import AuthRoute from "./Components/Authentication/AuthRoute";
import "./style.css";

const App = () => {
  // const num = 5;
  return (
    <BrowserRouter>
      <Switch>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <AuthRoute exact path="/" component={Layout} />
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
