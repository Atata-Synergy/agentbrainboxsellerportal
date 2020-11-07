import React, { useEffect } from "react";
import TopDashboard from "./TopDashboard";
import CurrencyConverterSlide from "./CurrencyConverterSlide";
import { Row, Panel, Placeholder, Message } from "rsuite";
import PromotionSlick from "./PromotionSlick";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";
import ChartReport from "./ChartReport";
import SellerNotificationColThree from "../GeneralNotification/SellerNotificationColThree";
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
            {/* <!-- Card stats --> */}
            <div className="row mt-4">
              <div className="col-xl-3 col-md-6">
                  <TopDashboard {...merchant} />
                
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  {/* <!-- Card body --> */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          New users
                        </h5>
                        <span className="h2 font-weight-bold mb-0">2,356</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-chart-pie-35"></i>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up"></i> 3.48%
                      </span>
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  {/* <!-- Card body --> */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Sales
                        </h5>
                        <span className="h2 font-weight-bold mb-0">924</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                          <i className="ni ni-money-coins"></i>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up"></i> 3.48%
                      </span>
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                  {/* <!-- Card body --> */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">
                          Performance
                        </h5>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                          <i className="ni ni-chart-bar-32"></i>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up"></i> 3.48%
                      </span>
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col-xl-8">
            <div className="card bg-default">
              <div className="card-header bg-transparent">
                <div className="row align-items-center">
                  <div className="col">
                    <ChartReport />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card">
              <div className="card-header bg-transparent">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h5 className="h3 mb-0">Total orders</h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="chart">
                  <canvas id="chart-bars" className="chart-canvas"></canvas>
                </div>
              </div>
            </div>
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
