import Dashboard from "../MainScreens/Dashboard/Dashboard";
import RecentOrder from "../MainScreens/Order/RecentOrder";
import ManageQuotation from "../MainScreens/Quotations/ManageQuotation";
import MakeQuotationRequest from "../MainScreens/Quotations/MakeQuotationRequest";
import Ballance from "../MainScreens/Wallet/Ballance";
import FundAccount from "../MainScreens/Wallet/FundAccount";
import CreateProduct from "../MainScreens/Products/CreateProduct";
import ProductList from "../MainScreens/Products/ProductList";
import SignIn from "../MainScreens/AuthScreens/SignIn";
import SidebarNavigation from "../Sidebar/SidebarNavigation";
import Index from "../MainScreens/HomePage/Index";
import SignUp from "../MainScreens/AuthScreens/SIgnUp";
import React from "react";
import SellerNavigator from "../MainScreens/EntryPoint.js/SellerNavigator";
import CreateSeller from "../MainScreens/AuthScreens/CreateSeller";
import CreateSellerStep from "../MainScreens/AuthScreens/CreateSellerStep";
export const Routes = [{
        path: "/",
        exact: true,
        main: Index,
    },
    {
        path: "/login",
        main: SignIn,
    },
    {
        path: "/register",
        main: SignUp,
    },
    {
        path: "/seller/create/Account",
        main: CreateSeller,
    },
    {
        path: "/seller/create/verify",
        main: CreateSellerStep,
    },

    {
        path: "/seller",
        main: SellerNavigator,
    },
];

export const authenticatedRoute = [{
        path: "/dashboard",
        sidebar: SidebarNavigation,
        main: Dashboard,
    },
    {
        path: "/quotation/manage",
        sidebar: SidebarNavigation,
        main: ManageQuotation,
    },
    {
        path: "/quotation/request",
        sidebar: SidebarNavigation,
        main: MakeQuotationRequest,
    },
    {
        path: "/wallet/ballance",
        sidebar: SidebarNavigation,
        main: Ballance,
    },
    {
        path: "/wallet/fund",
        sidebar: SidebarNavigation,
        main: FundAccount,
    },
    {
        path: "/products/create",
        sidebar: SidebarNavigation,
        main: CreateProduct,
    },
    {
        path: "/products/list",
        sidebar: SidebarNavigation,
        main: ProductList,
    },
];