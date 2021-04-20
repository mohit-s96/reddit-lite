import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ConnectHoc } from "pmrjs";
import { useStore } from "../../pmr/store";

interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
}

const AuthRoute: React.FC<RouteProps> = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const [data] = useStore(AuthRoute);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (data.isAuth !== undefined) {
          if (!data.isAuth) {
            return <Redirect to="/login" />;
          } else {
            return <Component {...props} />;
          }
        } else {
          return <h1>Loading...</h1>;
        }
      }}
    />
  );
};

const mapState = (state: any) => ({
  isAuth: state.isAuth,
});
export default ConnectHoc(AuthRoute, mapState);
