import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, FlexboxGrid, Panel, Row, Button, Divider } from "rsuite";
import NumberFormat from "react-number-format";
import { useState } from "react";
import { withdrawFund } from "../../Actions/walletAction";

const Withdraw = (props) => {
  const [amount, setAmount] = useState(0);

  
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-md-6 mt-4 mx-auto my-4">
            <div className="card border my-4">
              <div className="card-body">
                <Divider className="p-2 my-4 bg-success" />
                <h5 className="text-center">Fund Your Account</h5>
                <hr className="p-4 my-4" />
                <div className="text-center">
                  <p>
                    <strong className="text-primary">
                      Your current balance
                    </strong>
                    : <br />
                    <span style={{ fontSize: "3em" }}>
                      ₦{props.walletInfo && props.walletInfo.ballance}
                    </span>
                  </p>
                  <div className="form-group">
                    <label htmlFor="Amount" className="form-control-label mr-4">
                      How much will you like to withdraw?
                    </label>
                    <br />
                    <NumberFormat
                      style={{
                        border: "1px solid #f1f1f3",
                        padding: "10px",
                        fontSize: "16px",
                      }}
                      thousandSeparator={true}
                      placeholder="₦"
                      prefix="₦"
                      onValueChange={(e) => setAmount(e.floatValue)}
                      value={amount}
                    />
                  </div>
                  <Button
                    onClick={() => props.withdrawFund(amount)}
                    className="btn-primary btn-flat p-3 mx-4"
                    block
                  >
                    Make Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  merchant: state.auth.merchant,
  walletInfo: state.wallet.walletInfo,
});

const mapDispatchToProps = {
  withdrawFund,
};

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
