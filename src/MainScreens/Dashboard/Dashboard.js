import React, { useEffect } from "react";
import TopDashboard from "./TopDashboard";
import CurrencyConverterSlide from "./CurrencyConverterSlide";
import { Row, Panel, Placeholder, Message } from "rsuite";
import PromotionSlick from "./PromotionSlick";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";
import ChartReport from "./ChartReport";
import SellerNotificationColThree from "../GeneralNotification/SellerNotificationColThree";
import { connect } from 'react-redux'
import { getAdvert, getProducts } from "../../Actions/productAction";
function Dashboard(props) {
  const { Paragraph } = Placeholder;
  const { merchant } = props
  var settings = {
    count: 5432,
    border: true,
    showTitle: true,
    noPoints: true,
  };
  useEffect(() => {
  props.getProducts();
  }, [])
  return (
    <div
      className="container"
      role="main"
      style={{ backgroundColor: "rgb(224, 219, 219)" }}
    >
      <div className="container">
        <div className="row p-3">
          <div className="col-xs-12">
            {merchant && merchant.contact_verification === 0 ? (
              <Message
                full
                type="warning"
                description="Your contact is yet to be verified, Please check your mail"
              />
            ) : null}
          </div>
          <div className="col-12 mt-2 bg-light">
            <TopDashboard {...merchant} />
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="row  p-3" style={{ justifyContent: "space-between" }}>
          <div className="col-xs-12 col-md-4 ">
            <SellerNotificationColThree />
          </div>
        </div>
      </div> */}
      <div className="w-100">
        <PromotionSlick products = {props.products} />
      </div>
      <div className="row p-3">
        <Panel header="Monthly Report">
          <ChartReport />
        </Panel>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  merchant: state.auth.merchant,
  products: state.product.products,
});

const mapDispatchToProps = {
  getAdvert,
  getProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)