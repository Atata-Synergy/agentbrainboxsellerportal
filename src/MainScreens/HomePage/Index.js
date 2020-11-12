import React, { Component } from "react";
import {
  Container,
  Row,
  Header,
  Navbar,
  Nav,
  Dropdown,
  Icon,
  ButtonToolbar,
  Button,
} from "rsuite";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeNav from "./HomeNav";
import NavBarHeader from "../../Components/NavBarHeader";
import Footer from "../../Components/Footer";
import background from "../../Assets/img/bg.png";
import ProcessSection from "./ProcessSection";
export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ height: "100%", backgroundImage: `url(${background})` }}>
        <NavBarHeader />
        <div className="container-fluid body">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-5 my-4">
                <div className="text-left lead-text">
                  <h4>Sell on AgentBrainBox</h4>
                  <h2>
                    Reach out to thousand of Sporty bet agents across the
                    nation.{" "}
                  </h2>
                  <Link className="get-started-btn" to="/register">
                    {" "}
                    Get Started{" "}
                  </Link>
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <div className="statistic">
                  <div className="text-right">
                    <p>Over 1 million Users across the nation</p>
                  </div>
                </div>
                <div className="statistic">
                  <div className="text-right">
                    <p>Verified Logistic delivery Across 36 states </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clear-fix"></div>
        </div>
        <Footer />
      </div>
    );
  }
}
