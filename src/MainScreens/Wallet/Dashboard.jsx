import React from "react";
import "../../Assets/css/argon.min.css";
import { Link } from "react-router-dom";
import { Icon } from "rsuite";
import { connect } from "react-redux";

function Dashboard(props) {
  return (
    <div className="main-content" id="panel">
      <div className="header bg-primary pb-6">
        <div className="container-fluid">
          <div className="header-body">
            {/* <!-- Card stats --> */}
            <div className="row mt-4">
              <div className="col-xl-4 col-md-6 col-xs-12">
                <div className="card card-stats">
                  {/* <!-- Card body --> */}
                  <div className="card-body">
                    <div className="row">
                      <Link to="/">
                        <div className="col p-4">
                          <h5 className="card-title text-uppercase  mb-0">
                            Withdraw From Wallet
                          </h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-xs-12">
                <div className="card card-stats">
                  {/* <!-- Card body --> */}
                  <div className="card-body">
                    <div className="row">
                      <Link to="/">
                        <div className="col p-4">
                          <h5 className="card-title text-uppercase  mb-0">
                            Fund Your Wallet
                          </h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-xs-12">
                <div className="card card-stats">
                  {/* <!-- Card body --> */}
                  <div className="card-body">
                    <div className="row">
                      <Link to="/">
                        <div className="col p-4">
                          <h5 className="card-title text-uppercase  mb-0">
                            Open a ticket
                          </h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col-xl-8">
            <div className="card bg-default">
              <div className="card-header bg-transparent">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="text-light text-uppercase ls-1 mb-1">
                      Wallet Overview
                    </h6>
                    <h5 className="h3 text-white mb-0">Wallet Details</h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col m-2">
                    <h4 className="text-light">
                      Account Ballance: ${props.walletInfo && props.walletInfo.ballance}
                    </h4>
                  </div>
                  <div className="col m-2">
                    <h4 className="text-light">Pending Payment: ${0}</h4>
                  </div>
                  <hr className="my-4" />
                </div>
                <div className="row">
                  <div className="col my-4 mx-2">
                    <h4 className="text-light">Last Transaction: $250, 000</h4>
                  </div>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card">
              <div className="card-header bg-transparent">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="h3 mb-0">Recent Transaction</h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="chart">
                  <canvas id="chart-bars" className="chart-canvas"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authorizing: state.wallet.authorizing,
  walletToken: state.wallet.walletToken,
  walletErrors: state.wallet.walletErrors,
  walletInfo: state.wallet.walletInfo,
});


const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
