import React, { ReactElement, useState } from "react";
import { State } from "../Interfaces/Auth";
import { StoreState } from "../../pmr/interfaces";
import { login } from "../../utils/actions";
import { useStore, ConnectHoc } from "../../pmr/pmrReactHooks";

function Login(): ReactElement {
  const [data] = useStore(Login);
  //   console.log(data);

  const initState: State = {};
  const [state, setState] = useState(initState);
  const submitLoginForm = (e: React.MouseEvent) => {
    e.preventDefault();
    login(state);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="login-page-container">
      {data.authLoading ? (
        <div>Loading...</div>
      ) : data?.user?.email ? (
        <div>{data.user.email}</div>
      ) : (
        <div>not auth yet</div>
      )}
      <div className="login-form-wrapper">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" onChange={handleChange} />
          </div>
          <div className="form-group">
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

export default ConnectHoc(Login, mapState);
