import React, { useEffect } from "react";
import TopDashboard from "./TopDashboard";
import CurrencyConverterSlide from "./CurrencyConverterSlide";
import { Row, Panel, Placeholder, Message, Tag } from "rsuite";
import PromotionSlick from "./PromotionSlick";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";
import ChartReport from "./ChartReport";
import OrderStatistic from "./OrderStatistic";
import { connect } from "react-redux";
import { getAdvert, getProducts } from "../../Actions/productAction";
function Dashboard(props) {
  const { Paragraph } = Placeholder;
  const { merchant } = props;
  var settings = {
    count: 5432,
    border: true,
    showTitle: true,
    noPoints: true,
  };
  useEffect(() => {
    props.getProducts();
  }, []);
  return (
    <div className="main-content" id="panel">
      <div className="header bg-primary pb-6">
        <div className="container-fluid">
          <div className="header-body">
            <TopDashboard {...props.merchant} />
          </div>
        </div>
      </div>
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col-xl-8">
            <div className="card bg-light">
              <div className="card-header bg-transparent">
                <div className="row align-items-center">
                  <div className="col pt-4">
                    <ChartReport />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <OrderStatistic {...props} />
          </div>
        </div>
        <div className="container-fluid">
          <PromotionSlick products={props.products} />
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
