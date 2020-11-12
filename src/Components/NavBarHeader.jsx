import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { Nav, Icon } from "rsuite";
const NavBarHeader = () => {
  return (
    <header>
      <div id="top-header">
        <div className="container">
          <ul className="header-links pull-left">
            <li>
              <a href="#">
                <i className="fa fa-phone"></i> +021-95-51-84
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-envelope-o"></i> email@email.com
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-map-marker"></i> 1734 Stonecoal Road
              </a>
            </li>
          </ul>
          <ul className="header-links pull-right">
            <li>
              <Link to="/login">
                <i className="fa fa-lock"></i> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <i className="fa fa-user-o"></i> Register
              </Link>
            </li>
            
            <li>
              <a href="#">
                <i className="fa fa-user-o"></i> Buy a product
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div id="header">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="header-logo">
                <Link to="/" className="logo w-100">
                  <img src={logo} alt="agent bta" />
                </Link>
              </div>
            </div>
            <div className="col-md-9 col-sm-12">
              <Nav>
                <Nav.Item eventKey="home" icon={<Icon icon="home" />}>
                  Home
                </Nav.Item>
                <Nav.Item eventKey="news">How we work</Nav.Item>
                <Nav.Item eventKey="solutions">Our commission's</Nav.Item>
                <Nav.Item eventKey="products">Testimonials</Nav.Item>
                <Nav.Item eventKey="about">FAQ</Nav.Item>
                <Nav.Item eventKey="about">Contact US</Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarHeader);
