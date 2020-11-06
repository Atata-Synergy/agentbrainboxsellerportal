import React from "react";
import PropTypes from "prop-types";
import { Modal, Notification, Button, SelectPicker } from "rsuite";
import { useState } from "react";
import { useEffect } from "react";
import { updateOrderStatus } from "../../Actions/orderAction";
import { connect } from "react-redux";

function OrderStatusModal({ ...props }) {
  const StatusArray = [
    {
      label: "Preparing Order",
      value: "Preparing Order",
    },
    {
      label: "Packaging And Getting Order Ready",
      value: "Packaging And Getting Order Ready",
    },
    {
      label: "Quality Control",
      value: "Quality Control",
    },
    {
      label: "Order has been dispatched",
      value: "Order has been dispatched",
    },
    {
      label: "Failed to reach contact person for delivery",
      value: "Failed to reach contact person for delivery",
    },
    {
      label: "Awaiting User confirmation",
      value: "Awaiting User confirmation",
    },
    {
      label: "Order returned to Warehouse",
      value: "Order returned to Warehouse",
    },
  ];
  const [orderStatus, setOrderStatus] = useState();
  function open(funcName, message) {
    Notification[funcName]({
      title: funcName,
      description: message,
    });
  }

  useEffect(() => {
    if (props.orderUpdated) {
      open("success", props.orderUpdated);
     setTimeout(props.onHide(), 3000) ;
    }
  }, [props.orderUpdated]);
  return (
    <>
      <Modal
        backdrop="static"
        show={props.open}
        onHide={props.onHide}
        size="xs"
      >
        <Modal.Body>
          <SelectPicker
            data={StatusArray}
            appearance="default"
            size="lg"
            value={orderStatus}
            onChange={(status) => setOrderStatus(status)}
            block
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} appearance="subtle">
            Close
          </Button>
          <Button
            onClick={() => props.updateOrderStatus(props.data.id, orderStatus)}
            color="green"
            loading={props.updatingOrders}
            appearance="primary"
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

OrderStatusModal.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  updatingOrders: state.order.updatingOrders,
  orderUpdated: state.order.orderUpdated,
  orderUpdateErrors: state.order.orderUpdateErrors,
});

const mapDispatchToProps = {
  updateOrderStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatusModal);
