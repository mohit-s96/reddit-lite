import React, { ReactElement, useEffect, useState } from "react";
import { State } from "../Interfaces/Auth";
import { StoreState } from "../../pmr/interfaces";
import { login } from "../../pmr/actions";
import { ConnectHoc } from "pmrjs";
import { useStore } from "../../pmr/store";
import { useHistory } from "react-router-dom";
import "./login.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Login(): ReactElement {
  const history = useHistory();
  const [data] = useStore(Login);

  useEffect(() => {
    if (data.isAuth === true) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.isAuth]);
  // console.log(data);

  const initState: State = {};
  const [state, setState] = useState(initState);
  const submitLoginForm = (e: React.MouseEvent) => {
    e.preventDefault();
    login(state, history);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="login-page-container flex-center">
      <div className="login-form-wrapper">
        <h2 style={{ textAlign: "center", color: "#000", margin: "1rem" }}>
          Enter any email password combination to login
        </h2>
        <form className="flex-center">
          <div className="form-group flex-center">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" onChange={handleChange} />
          </div>
          <div className="form-group flex-center">
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" onChange={handleChange} />
          </div>
          <div className="form-group flex-center">
            <button type="submit" onClick={submitLoginForm}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapState = (state: StoreState) => ({
  authLoading: state.loading.authLoading,
  user: state.user,
  isAuth: state.isAuth,
});

export default ConnectHoc(Login, mapState as any);
