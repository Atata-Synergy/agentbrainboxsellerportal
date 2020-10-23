import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./index.css";
import logo from "../../Assets/logo.png";
import verifyToken from "../../Partials/Authentication";

export default function HomeNav() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand text-danger" href="#">
          ADB
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <h4 className="text-danger">Seller's Portal</h4>
          <ul className="nav mr-auto">
            <li className="nav-item m-1 active">
              <a className="text-dark" href="#">
                Visit Main Site
              </a>
            </li>
            <li className="nav-item m-1">
              <a className="text-dark" href="#">
                Learn about Us
              </a>
            </li>
            <li className="nav-item m-1">
              <a className="text-dark" href="#">
                Our Services
              </a>
            </li>
            <li className="nav-item m-1">
              <a className="text-dark" href="#">
                FAQ
              </a>
            </li>
          </ul>
          {token === null || token === undefined ? (
            <div style={{ justifySelf: "left" }}>
              <ul class="nav mr-auto d-flex">
                <li className="nav-item m-1">
                  <Link to="/register" className="nav-item text-dark">
                    Create an account
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <Link to="/login" className="nav-item text-dark">
                    Sign in
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/seller" className="nav-item text-dark">
                Dashboard
              </Link>
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  history.push({
                    pathname: "/login",
                    state: {
                      message: "You are logged out",
                    },
                  });
                }}
                className="nav-item text-dark"
              >
                Log Out
              </a>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
