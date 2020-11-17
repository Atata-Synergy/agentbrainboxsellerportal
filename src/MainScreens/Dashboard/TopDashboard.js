import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class TopDashboard extends Component {
  render() {
    return (
      <Fragment>
        <div className="row mt-4">
          <div className="col-xl-3 col-md-6">
            <div className="card card-stats">
              {/* <!-- Card body --> */}
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">
                      Uploaded Product(s)
                    </h5>
                    <span className="h2 font-weight-bold mb-0 text-dark">
                      {this.props.products.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card card-stats">
              {/* <!-- Card body --> */}
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">
                      Wallet Ballance
                    </h5>
                    <span className="h2 font-weight-bold mb-0 text-dark">
                      <small>₦</small>  0.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card card-stats">
              {/* <!-- Card body --> */}
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">
                      Orders
                    </h5>
                    <span className="h2 font-weight-bold mb-0 text-dark">
                      0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card card-stats">
              {/* <!-- Card body --> */}
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">
                      Active Adverts
                    </h5>
                    <span className="h2 font-weight-bold mb-0 text-dark">
                      0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.products,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TopDashboard);
