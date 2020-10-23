import React from "react";
import { authenticatedRoute as RouteConfig } from "../../Partials/Route";
import {
  BrowserRouter as Router,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import SidebarNavigation from "../../Sidebar/SidebarNavigation";
export default function SellerNavigator() {
  let { path, url } = useRouteMatch();
  const history = useHistory();

  return (
    <div>
      <div className="container-fluid">
        <div className="row no-gutter">
          <SidebarNavigation history={history} path={path} />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
