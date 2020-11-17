import React from "react";
import { Tag, Icon } from "rsuite";
import "../Order/order.css";
import { connect } from "react-redux";
import { getOrders } from "../../Actions/orderAction";
import { useEffect } from "react";
import { Header, Item } from "semantic-ui-react";

function OrderStatistic(props) {
  useEffect(() => {
    props.getOrders();
  }, []);
  return (
    <div className="card">
      <div className="card-header bg-transparent">
        <div className="row align-items-center">
          <div className="col">
            <h6 className="text-uppercase text-muted ls-1 mb-1">
              Recent Order
            </h6>
          </div>
        </div>
      </div>
      <div className="card-body">
        {props.receivedOrders.map((order) => (
          <div className="text-dark">
            <Item
              className="p-2"
              description={
                <>
                  <Tag color="red" className="float-right">New</Tag>
                  <div className="d-flex p-2">
                    <Icon
                      icon="circle"
                      color="red"
                      className="warning-order p-2"
                    />
                    <div>
                      {order.item.name} <br />
                      {order.tracking_id}
                      <br />
                      {order.item_price}
                    </div>
                    <hr className="my-4" />
                  </div>
                </>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  gettingOrders: state.order.gettingOrders,
  receivedOrders: state.order.receivedOrders,
  orderErrors: state.order.orderErrors,
});

const mapDispatchToProps = { getOrders };

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatistic);
