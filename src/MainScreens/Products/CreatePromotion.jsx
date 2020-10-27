import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { Header } from "semantic-ui-react";
import { Container, FormLabel, Form } from "react-bootstrap";
import { FormControl, DatePicker, Panel, Input, FormGroup } from "rsuite";
import NumberFormat from "react-number-format";
import { getAdvertCost } from "../../Actions/productAction";
import { SET_AD_DATE } from "../../Actions/types";
export const CreatePromotion = (props) => {
    const dispatch = useDispatch()
  const handDateChange = (e) => {
   props.getAdvertCost(e);
   dispatch({type: SET_AD_DATE, payload: e})
  };
  return (
    <Container>
      <Panel header="" bordered>
        <Header>
          <Header.Content>Place an ad</Header.Content>
          <Header.Subheader>
            Put your product at the front page of our website
          </Header.Subheader>
        </Header>

        <div className="m-2 p-4">
          <FormGroup className="row mb-4">
            <FormLabel className="col-sm-12 col-md-3">
              Set The Duration of The ad
            </FormLabel>
            <br />
            <DatePicker
              className="col-sm-12 col-md-6"
              format="YYYY-MM-DD HH:mm:ss"
              onChange={handDateChange}
              ranges={[
                {
                  label: "Now",
                  value: new Date(),
                },
              ]}
            />
          </FormGroup>

          <FormGroup className="row mb-4">
            <FormLabel className="col-sm-12 col-md-3">Advert Cost</FormLabel>
            <NumberFormat
              className="col-sm-12 col-md-6"
              style={{
                border: "1px solid #7e7e7e52",
                padding: "10px",
              }}
              value={props.ad_cost}
              disabled
              thousandSeparator={true}
              prefix="₦"

              //   value={inputField.value}
            />
          </FormGroup>
        </div>
      </Panel>
    </Container>
  );
};

CreatePromotion.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({
  gettingAdCost: state.product.gettingAdCost,
  ad_cost: state.product.ad_cost,
  ad_cost_error: state.product.ad_cost_error,
});

const mapDispatchToProps = {
  getAdvertCost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePromotion);
