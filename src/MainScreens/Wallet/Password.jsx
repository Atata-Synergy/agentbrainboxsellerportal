import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Panel, Button } from "rsuite";
import ReactCodeInput from "react-code-input";
import { getWalletAccess } from "../../Actions/walletAction";
const Password = (props) => {
  const [pin, setPin] = useState();
  const [error, setError] = useState([])
  const {match, history, wallet} = props
  useEffect(() => {
    if (props.walletInfo.blocked == 1) {
      return props.history.push("/");
    } else if (props.walletInfo.suspended == 1) {
      return props.history.push("/");
    } else if (props.walletInfo.id) {
      return props.history.push(`${match.path}/dashboard`);
    } else {
      return setError(error.push('Error'));
    }
  }, [props.walletInfo.id]);
  return (
    <div className="container">
      <div className="row">
        <div
          className="col-md-5 col-xs-12 mx-auto position-absolute"
          style={{ top: "30%", left: "25%" }}
        >
          <Panel bordered className="p-2 justify-content-center">
            <div className="w-100 mx-auto m-4 text-center">
              <div className="title">
                <div className="h4">
                  <label>Enter Your wallet Code</label>
                </div>
              </div>
              <ReactCodeInput
                type="number"
                onChange={(e) => {
                  setPin(e);
                }}
                fields={6}
                type="password"
                inputMode="numeric"
              />
            </div>
            <Button
              onClick={() => props.getWalletAccess(pin)}
              className="btn-flat"
              block
              color="green"
              loading={props.authorizing}
            >
              Enter
            </Button>
          </Panel>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authorizing: state.wallet.authorizing,
  walletToken: state.wallet.walletToken,
  walletErrors: state.wallet.walletErrors,
  walletInfo: state.wallet.walletInfo,
});

const mapDispatchToProps = {
  getWalletAccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);
