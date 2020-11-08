import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, FlexboxGrid, Panel, Row, Button, Divider } from "rsuite";
import Col from "rsuite/lib/Carousel";
import {
  usePaystackPayment,
  PaystackButton,
  PaystackConsumer,
} from "react-paystack";
import NumberFormat from "react-number-format";
import { useState } from "react";
import { fundAccount } from "../../Actions/walletAction";

const FundAccount = (props) => {
  const [amount, setAmount] = useState(0);
  const [config, setConfig] = useState({});
  const [reference, setReference] = useState(new Date().getTime());
  const [email, setEmail] = useState(props.merchant.business_email);

  const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      purpose: "fund account",
      merchant: { ...props.merchant },
    },
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    text: "Pay Now",
    onSuccess: (response) => {
      const data = {
        reference: response.reference,
        amount,
      };
      props.fundAccount(data);
    },
    onClose: () => alert("Wait! Don't leave :("),
  };
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
                    <strong className="text-primary">Your current balance</strong>: <br />
                    <span style={{ fontSize: "3em" }}>₦{props.walletInfo && props.walletInfo.ballance}</span>
                  </p>
                  <div className="form-group">
                    <label htmlFor="Amount" className="form-control-label mr-4">
                      Input Amount
                    </label>
                    <NumberFormat
                      style={{
                        border: "1px solid #f1f1f3",
                        padding: "10px",
                      }}
                      thousandSeparator={true}
                      placeholder="₦"
                      prefix="₦"
                      onValueChange={(e) => setAmount(e.floatValue)}
                      value={amount}
                    />
                  </div>
                  <PaystackButton
                    className="btn btn-success btn-flat  p-3 btn-block"
                    {...componentProps}
                  />
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
  fundAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(FundAccount);
