import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Dashboard from './Dashboard'
import FundAccount from './FundAccount'
import Password from './Password'

const WalletRoute = () => {
    const {path} = useRouteMatch()
    return (
      <>
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
          />
        </Switch>
      </>
    );
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletRoute)
