import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "screens/Login";
import Home from "screens/Home";

const AuthRouteBase = ({ connected, ...rest }) => {
  if (connected) {
    return <Route {...rest} />;
  }
  return <Redirect to="/login" />;
};

const mapStateToProps = state => ({ connected: !!state.auth.token });

const AuthRoute = connect(
  mapStateToProps,
  null,
  null,
  { pure: true }
)(AuthRouteBase);

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/" component={Home} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
