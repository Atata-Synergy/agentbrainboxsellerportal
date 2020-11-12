import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { Header, Button, Dropdown } from "semantic-ui-react";
import { Container, FormLabel, Form } from "react-bootstrap";
import { FormControl, DatePicker, Panel, Input, FormGroup } from "rsuite";
import NumberFormat from "react-number-format";
import {
  getAdvertCost,
  getProducts,
  createAd,
} from "../../Actions/productAction";
import { SET_AD_DATE, SET_AD_PRODUCT } from "../../Actions/types";
import { useEffect } from "react";
const CreatePromotion = (props) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [productId, setProductId] = useState(null);
  const [elapseDate, setElapseDate] = useState(null);
  const [showProductList, setShowProductList] = useState(
    Boolean(!props.adProduct.id)
  );
  useEffect(() => {
    props.getProducts();
  }, []);
  useEffect(() => {
    let productArray = [];
    props.products.map((product) => {
      productArray.push({
        key: product.id,
        text: product.name,
        value: product.id,
        image: { avatar: true, src: product.media[0].path },
      });
    });
    setProductData(productArray);
  }, [props.products]);
  const handleShowProductList = () => setShowProductList(!showProductList);
  const handDateChange = (e) => {
    props.getAdvertCost(e);
    dispatch({ type: SET_AD_DATE, payload: e });
  };
  const handleCreate = () => {
    const Ad = {
      ElapseDate: props.date,
      productId: props.adProduct.id,
    };
    props.createAd(Ad);
  };
  return (
    <Container>
      <div className="row">
        <div className="col-xs-12 col-md-6 mx-auto">
          <Panel
            bordered
            className="bg-light p=4"
            style={{ marginTop: "100px" }}
          >
            <Header>
              <Header.Content>Place an advert on your product</Header.Content>
              <Header.Subheader>
                Put your product at the front page of our website
              </Header.Subheader>
            </Header>

            <div className="m-2 p-4">
              <div className="form-group">
                {props.adProduct.name && (
                  <label htmlFor="product" className="form-control-label">
                    You are about to place an advert on {props.adProduct.name}{" "}
                    <a className="btn btn-link" onClick={handleShowProductList}>
                      Choose another product
                    </a>
                  </label>
                )}
              </div>
              <div className="form-group">
                {showProductList && (
                  <Dropdown
                    placeholder="Select a product"
                    fluid
                    selection
                    onChange={(e, { value }) => {
                      dispatch({
                        type: SET_AD_PRODUCT,
                        payload: {
                          id: value,
                        },
                      });
                    }}
                    options={productData}
                  />
                )}
              </div>
              <div className="form-group">
                <label className="form-control-label">
                  How long do you want this advert to run
                </label>
                <div className="pb-4">
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    block
                    onChange={handDateChange}
                    ranges={[
                      {
                        label: "Now",
                        value: new Date(),
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="form-control-label">Advert Cost</div>
                <NumberFormat
                  style={{
                    border: "1px solid #7e7e7e52",
                    padding: "10px",
                  }}
                  value={props.ad_cost}
                  disabled
                  thousandSeparator={true}
                  prefix="₦"
                />
              </div>
            </div>
            <div className="float-right">
              <Button
                className="p-4 btn-flat"
                color="green"
                disabled={!props.ad_cost}
                onClick={handleCreate}
              >
                Create Ad
              </Button>
            </div>
          </Panel>
        </div>
      </div>
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
  products: state.product.products,
  adProduct: state.product.adProduct,
  date: state.product.date,
});

const mapDispatchToProps = {
  getAdvertCost,
  getProducts,
  createAd,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePromotion);
