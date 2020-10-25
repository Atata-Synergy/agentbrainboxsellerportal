import React, { Component, useState } from "react";
import Sidebar from "react-sidebar";
// import { Sidenav, Nav, Dropdown, Icon, Placeholder, Avatar } from "rsuite";
import "semantic-ui-css/semantic.min.css";
import { Dropdown, Icon, Input, Menu, Accordion } from "semantic-ui-react";
import CustomScroll from "react-custom-scroll";
import "./sidebar.css";
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  useHistory,
  Switch,
  Route,
} from "react-router-dom";
// import "rsuite/dist/styles/dark.css";
import Dashboard from "../MainScreens/Dashboard/Dashboard";
import CreateSeller from "../MainScreens/AuthScreens/CreateSellerContainer";
import ManageQuotation from "../MainScreens/Quotations/ManageQuotation";
import MakeQuotationRequest from "../MainScreens/Quotations/MakeQuotationRequest";
import Ballance from "../MainScreens/Wallet/Ballance";
import FundAccount from "../MainScreens/Wallet/FundAccount";
import CreateProduct from "../MainScreens/Products/CreateProduct";
import ProductList from "../MainScreens/Products/ProductList";
import verifyToken from "../Partials/Authentication";
import "./Style.css";
import SideBarContent from "./SideBarContent";
import fetchUser from "../Partials/Fetch";
import { me } from "../Actions/loginAction";
import { connect } from "react-redux";
const panelStyles = {
  padding: "15px 20px",
  color: "rgb(218, 216, 216)",
};

const linkStyles = {
  color: "#fff",
  padding: "10px",
  textDecoration: "none",
  marginTop: 10,
  borderBottom: "1px" + "solid" + "white",
};
const headerStyles = {
  padding: 20,
  fontSize: 16,
  display: "flex",
  justifyContents: "center",
  color: "rgb(218, 216, 216)",
};

class SidebarNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      seller: null,
      merchant: {}
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  componentDidMount() {
    this.props.me();
  }
 
 static getDerivedStateFromProps(props, state) {
   if (props.merchant.id) {
     return {
       merchant: props.merchant, 
     };
   }
 }


  render() {
    const { path, url } = this.props;
    console.log(path);

    return (
      <Sidebar
        docked
        sidebar={
          <SideBarContent props={this.props} seller={this.state.seller} />
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{
          sidebar: {
            background: "white",
            overflowY: "scroll",
            overflowX: "hidden",
            position: "fixed",
            backgroundColor: " rgb(51, 51, 51)",
          },
        }}
      >
        {/* <Link to={`seller/quotation/manage`}>lol</Link> */}{" "}
        {/* <NavbarComponent /> */}
        <Switch>
          <Route exact path={path}>
            <Dashboard />
          </Route>{" "}
          <Route path={`${path}/quotation/manage`}>
            <ManageQuotation />
          </Route>{" "}
          <Route path={`${path}/quotation/request`}>
            <MakeQuotationRequest />
          </Route>{" "}
          <Route path={`${path}/balance`}>
            <Ballance />
          </Route>{" "}
          <Route path={`${path}/fundAccount`}>
            <FundAccount />
          </Route>{" "}
          <Route path={`${path}/products/create`}>
            <CreateProduct />
          </Route>{" "}
          <Route path={`${path}/products/list`}>
            <ProductList />
          </Route>{" "}
        </Switch>{" "}
      </Sidebar>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  merchant: state.auth.merchant,
});

const mapDispatchToProps = {
  me,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavigation);
