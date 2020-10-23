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
export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>        <NavBarHeader />
        <div className="container-fluid body">
          <div className="body-text">
            <p>Reach out to thousands of sport bet agent</p>
            <Link className="btn btn flat btn-light p-4" to="/register">Get Started</Link>
          </div>
        </div>
             <Footer />
         </>
    );
  }
}
