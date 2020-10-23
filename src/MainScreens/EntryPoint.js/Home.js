import React, { Component } from "react";
import "../../Styles/custom.css";
import "../../Styles/bootstrap.min.css";
import Dashboard from "../Dashboard/Dashboard";
import "rsuite/dist/styles/rsuite-default.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import RecentOrder from "../Order/RecentOrder";
import TrackOrder from "../Order/TrackOrder";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { authenticatedRoute as RouteConfig } from "../../Partials/Route";
import { Navbar, Dropdown, Nav, Icon } from "rsuite";
import SidebarNavigation from "../../Sidebar/SidebarNavigation";
import verifyToken from "../../Partials/Authentication";
import SellerNavigator from "./SellerNavigator";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerData: null,
      tokenError: "",
    };
  }

  // async componentDidMount() {
  //   // console.log(this.props);
  //   /***
  //    * Check if there is a token in the browser, save if there is none
  //    */
  //   const savedToken = localStorage.getItem("token");
  //   if (!savedToken) {
  //     /**
  //      * If There is no token in the local storage,
  //      *  get token from parameter
  //      */
  //     if (this.props.navigation.state.params) {
  //       const TOKEN = this.props.navigation.state.params.access_token;
  //       /**
  //        * If token exist in parameter, verify token
  //        */
  //       if (TOKEN) {
  //         verifyToken(TOKEN)
  //           .then((response) => {
  //             console.log(response);
  //             this.setState({ sellerData: JSON.parse(response.sellerData) });
  //             localStorage.setItem("token", TOKEN);
  //           })
  //           /**
  //            * If token can't be verified, navigate to login page,
  //            * with error message
  //            */
  //           .catch((error) => {
  //             this.props.navigation.navigate("login", {
  //               Message:
  //                 "Could not verify Session token, Please Sign Again, If problem persist,",
  //               type: "error",
  //               showTokenError: true,
  //             });
  //             console.log(error);
  //           });
  //       } else {
  //         /**
  //          * If token does not exist in parameter,
  //          * navigate to login page
  //          */
  //         this.props.navigation.navigate("login", {
  //           Message: "Please Login first",
  //           type: "error",
  //         });
  //       }
  //     } else {
  //       /**
  //        * If there are no parameter from prop
  //        */
  //       this.props.navigation.navigate("login", {
  //         Message: "Please Login first",
  //         type: "error",
  //       });
  //     }
  //   } else {
  //     /**
  //      * If there is a token in the localStorage
  //      */
  //     verifyToken(savedToken)
  //       .then((response) => {
  //         this.setState({ sellerData: JSON.parse(response.sellerData) });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.props.navigation.navigate("login", {
  //           Message: "Could not verify Session token, Please Sign Again",
  //           type: "error",
  //           showTokenError: true,
  //         });
  //       });
  //   }
  //   // localStorage.setItem("token", TOKEN);
  //   // console.log(TOKEN);
  // }
  render() {
    return (
      <>
        <Router>
          <div className="row w-100">
            <div className="col-md-3">
              <SidebarNavigation sellerData={this.state.sellerData} />
            </div>
            <div className="col-md-9">
              <Navbar className="container-fluid bg-light">
                {/* <Navbar.Header>
          <a href="#" className="navbar-brand logo">
            RSUITE
          </a>
        </Navbar.Header> */}
                <Navbar.Body>
                  <Nav>
                    <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
                    <Nav.Item>Products</Nav.Item>
                    <Dropdown title="About">
                      <Dropdown.Item>Company</Dropdown.Item>
                      <Dropdown.Item>Team</Dropdown.Item>
                      <Dropdown.Item>Contact</Dropdown.Item>
                    </Dropdown>
                  </Nav>
                  <Nav pullRight>
                    <Dropdown
                      title="Account Settings"
                      icon={<Icon icon="cog" />}
                    >
                      <Dropdown.Item
                        onSelect={() => {
                          localStorage.removeItem("token");
                          // this.props.navigation.navigate("login", {
                          //   Message:
                          //     "Logged Out",
                          //   type: "info",
                          //   showTokenError: true,
                          // });
                        }}
                      >
                        Log out
                      </Dropdown.Item>
                      <Dropdown.Item>Team</Dropdown.Item>
                      <Dropdown.Item>Contact</Dropdown.Item>
                    </Dropdown>
                  </Nav>
                </Navbar.Body>
              </Navbar>

              <TransitionGroup>
                <CSSTransition classNames="fade" timeout={300}>
                  <SellerNavigator />
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>
        </Router>
      </>
    );
  }
}
