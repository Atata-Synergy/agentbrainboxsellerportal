import React, { Component, useState } from "react";
import Sidebar from "react-sidebar";
// import { Sidenav, Nav, Dropdown, Icon, Placeholder, Avatar } from "rsuite";
import "semantic-ui-css/semantic.min.css";
import {
  Dropdown,
  Icon,
  Input,
  Menu,
  Accordion,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import CustomScroll from "react-custom-scroll";
import "./sidebar.css";
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  useHistory,
  Switch,
  Route,
  Redirect,
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
import RecentOrder from "../MainScreens/Order/RecentOrder";
import Transaction from "../MainScreens/Transaction";
const mql = window.matchMedia(`(min-width: 800px)`);

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
      sidebarOpen: false,
      seller: null,
      merchant: {},
      sidebarDocked: mql.matches,
    };
    props.me();
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    mql.addListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }
  componentDidUpdate(props) {
    if (props.user.id && !props.merchant) {
      return props.history.push("/seller/create/Account");
    }
    // if (props.isLoggingIn === false && !props.user.id)
    //   return this.props.history.push("/");
  }
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
  static getDerivedStateFromProps(props, state) {
    if (props.merchant && props.merchant.id) {
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
        docked={this.state.sidebarDocked}
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
        <Dimmer active={this.props.isLoggingIn}>
          <Loader>{this.props.isLoggingIn && "Authenticating"}</Loader>
        </Dimmer>
        <Switch>
          <Route exact path={path}>
            <Dashboard />
          </Route>
          <Route path={`${path}/quotation/manage`}>
            <ManageQuotation />
          </Route>
          <Route path={`${path}/quotation/request`}>
            <MakeQuotationRequest />
          </Route>
          <Route path={`${path}/balance`}>
            <Ballance />
          </Route>
          <Route path={`${path}/fundAccount`}>
            <FundAccount />
          </Route>
          <Route path={`${path}/products/create`}>
            <CreateProduct />
          </Route>
          <Route
            path={`${path}/products/edit/:id`}
            component={(props) => <CreateProduct {...props} />}
          />
          <Route
            path={`${path}/products/list`}
            component={(props) => <ProductList {...props} />}
          />
          <Route
            path={`${path}/received-orders`}
            component={(props) => <RecentOrder {...props} />}
          />
          <Route
            path={`${path}/transaction`}
            component={(props) => <Transaction {...props} />}
          />
        </Switch>
      </Sidebar>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoggingIn: state.auth.isLoggingIn,
  authenticating: state.auth.authenticating,
  merchant: state.auth.merchant,
});

const mapDispatchToProps = {
  me,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavigation);
