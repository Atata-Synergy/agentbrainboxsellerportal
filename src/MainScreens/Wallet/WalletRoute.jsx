import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Dashboard from "./Dashboard";
import FundAccount from "./FundAccount";
import Password from "./Password";
import { Dimmer, Loader } from "semantic-ui-react";
import Withdraw from "./Withdraw";
import { Notification } from "rsuite";
import WalletHistory from "./WalletHistory";

const WalletRoute = (props) => {
  const { path } = useRouteMatch();
  const open = (message, title = null) => {
     Notification[title || "success"]({
       title: title || "Success",
       description: message,
     });
  };
  React.useEffect(() => {
    props.withdrawSuccess && open(props.withdrawSuccess);
  }, [props.withdrawSuccess]);

  return (
    <>
      <Dimmer active={props.loading}>
        <Loader>{props.loadingText}</Loader>
      </Dimmer>
      <Switch>
        <Route
          exact
          path={path}
          component={(props) => <Password {...props} />}
        />
        <Route
          exact
          path={`${path}/dashboard`}
          component={(props) => <Dashboard {...props} />}
        />
        <Route
          path={`${path}/fund`}
          component={(props) => <FundAccount {...props} />}
        />{" "}
        <Route
          path={`${path}/history`}
          component={(props) => <WalletHistory {...props} />}
        />
        <Route
          path={`${path}/withdraw`}
          component={(props) => <Withdraw {...props} />}
        />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.wallet.loading,
  loadingText: state.wallet.loadingText,
  withdrawSuccess: state.wallet.withdrawSuccess,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WalletRoute);
