import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'

class TopDashboard extends Component {
  render() {
    return (
      <Fragment>
        <div className="tile_count row">
          <div className="col-md-3 col-xs-12 tile_stats_count">
            <span className="count_top">
              <i className="fa fa-user"> </i> Successful Orders
            </span>
            <div className="count"> 2500 </div>
            <span className="count_bottom">
              <i className="green"> 4 % </i> From last Week
            </span>
          </div>
          <div className="col-md-3 col-xs-12 tile_stats_count">
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
          <div className="col-md-3 col-xs-12 tile_stats_count">
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
          <div className="col-md-3 col-xs-12 tile_stats_count">
            <span className="count_top">
              <i className="fa fa-user"> </i> Total Products
            </span>
            <div className="count"> {this.props.products && this.props.products.length} </div>
            <span className="count_bottom">
              <i className="green">
                <i className="fa fa-sort-asc"> </i>0
              </i>
             sold
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.products
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TopDashboard);