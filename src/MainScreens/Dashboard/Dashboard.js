import React from "react";
import TopDashboard from "./TopDashboard";
import CurrencyConverterSlide from "./CurrencyConverterSlide";
import { Row, Panel, Placeholder } from "rsuite";
import PromotionSlick from "./PromotionSlick";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";
import ChartReport from "./ChartReport";
import SellerNotificationColThree from "../GeneralNotification/SellerNotificationColThree";
export default function Dashboard() {
  const { Paragraph } = Placeholder;
  var settings = {
    count: 5432,
    border: true,
    showTitle: true,
    noPoints: true,
  };
  return (
    <div
      className="container"
      role="main"
      style={{ backgroundColor: "rgb(224, 219, 219)" }}
    >
      <div className="container">
        <div className="row p-3">
          <div className="col-12 mt-2 bg-light">
            <TopDashboard />
          </div>{" "}
        </div>{" "}
      </div>
      <div className="container">
        <div className="row  p-3" style={{ justifyContent: "space-between" }}>
          <div className="col-xs-12 col-md-8">
            <div className="row p-3 bg-light">
              <div className="col-12">
                <CurrencyConverterSlide />
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="col-xs-12 col-md-4 ">
           <SellerNotificationColThree />
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <Row>
        <PromotionSlick />
      </Row>{" "}
      <div className="row p-3">
        <Panel header="Monthly Report">
          <ChartReport />
        </Panel>{" "}
      </div>{" "}
    </div>
  );
}
