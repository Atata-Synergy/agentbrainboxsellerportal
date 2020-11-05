import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import OrderTable from "./OrderTable";

export default function RecentOrder() {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route
          exact
          path={path}
          component={(props) => <OrderTable {...props} />}
        />
      </Switch>
    </>
  );
}
