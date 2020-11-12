import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Create from "./Create";
import CreatePromotion from "./CreatePromotion";
const AdRoute = (props) => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={path} component={(props) => <p>home</p>} />
        <Route
          path={`${path}/create`}
          component={(props) => <CreatePromotion {...props} />}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdRoute);
