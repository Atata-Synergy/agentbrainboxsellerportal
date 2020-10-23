import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
} from "react-router-dom";
import { Routes as RouteConfig } from "../../Partials/Route";
import Footer from "../../Components/Footer";

export default function AppNavigator() {
  return (
    <Router>
      <Switch>
        {RouteConfig.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
      </Switch>
    </Router>
  );
}
