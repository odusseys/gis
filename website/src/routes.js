import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "screens/Home";
import Privacy from "screens/Privacy";
import Terms from "screens/Terms";
import Event from "screens/Event";

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/events/:id" component={Event} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Router;
