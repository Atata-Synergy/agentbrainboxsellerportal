import React, { Component, Fragment } from "react";

export default class TopDashboard extends Component {
  render() {
    return (
      <Fragment>
        <div className='tile_count'>
          <div className="col-md-2 col-sm-4 tile_stats_count">
            <span className="count_top">
              <i className="fa fa-user"> </i> Successful Orders
            </span>
            <div className="count"> 2500 </div>
            <span className="count_bottom">
              <i className="green"> 4 % </i> From last Week
            </span>
          </div>
          <div className="col-md-2 col-sm-4 tile_stats_count">
            <span className="count_top">
              <i className="fa fa-clock-o"> </i> Quotations Received
            </span>
            <div className="count"> 50 </div>
            <span className="count_bottom">
              <i className="red">
                <i className="fa fa-sort-asc"> </i>-3%
              </i>{" "}
              From last Week
            </span>
          </div>
          <div className="col-md-2 col-sm-4 tile_stats_count">
            <span className="count_top">
              <i className="fa fa-user"> </i> Products In Stock
            </span>
            <div className="count green"> 2, 500 </div>
            <span className="count_bottom">
              <i className="red">
                <i className="fa fa-sort-asc"> </i>750
              </i>{" "}
              in Trash
            </span>
          </div>
          <div className="col-md-2 col-sm-4 tile_stats_count">
            <span className="count_top">
              <i className="fa fa-user"> </i> Pending Payment
            </span>
            <div className="count"> ₦ 4, 567 </div>
            <a href="" className="count_bottom">
              <i className="blue">
                <i className="fa fa-sort-desc"> </i>Spool Invoice
              </i>
            </a>
          </div>
          <div className="col-md-2 col-sm-4 tile_stats_count">
            <span className="count_top">
              <i className="fa fa-user"> </i> Total Collections
            </span>
            <div className="count"> 2, 315 </div>
            <span className="count_bottom">
              <i className="green">
                <i className="fa fa-sort-asc"> </i>34%
              </i>
              From last Week
            </span>
          </div>
          <div className="col-md-2 col-sm-4 tile_stats_count">
            <span className="count_top">
              <i className="fa fa-user"> </i> Top Selling Product
            </span>
            <div className="count"> Product Name </div>
            <span className="count_bottom">
              <i className="green">
                <i className="fa fa-sort-asc"> </i>2,000
              </i>{" "}
              Sold
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}
