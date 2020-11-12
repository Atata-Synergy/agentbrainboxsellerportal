import React from "react";
import Dashboard from "../MainScreens/Dashboard/Dashboard";
import RecentOrder from "../MainScreens/Order/RecentOrder";
import CreateProduct from "../MainScreens/Products/CreateProduct";
import ProductList from "../MainScreens/Products/ProductList";
import SignIn from "../MainScreens/AuthScreens/SignIn";
import SidebarNavigation from "../Sidebar/SidebarNavigation";
import Index from "../MainScreens/HomePage/Index";
import SignUp from "../MainScreens/AuthScreens/SIgnUp";
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