import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ConnectHoc, useStore } from "../../pmr/pmrReactHooks";
function AuthRoute({ component: Component, ...rest }) {
  const [data] = useStore(AuthRoute);
  console.log(data);
  return (
    <Route
      {...rest}
      render={(props) =>
        data.isAuth !== true ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

// AuthRoute.propTypes = {
//     user: PropTypes.object.isRequired
// };

const mapState = (state) => ({
  isAuth: state.isAuth,
});
export default ConnectHoc(AuthRoute, mapState);
