import React from "react";
import PropTypes from "prop-types";
import { Modal, Icon, Button } from "rsuite";
import { useState } from "react";
import { useEffect } from "react";
function CartModal({ ...props }) {
  return (
    <>
      <Modal
        backdrop="static"
        show={props.open}
        onHide={props.onHide}
        size="xs"
      >
        <Modal.Body>
          <div class="col-md-12 order-details">
            <div class="section-title text-center">
              <h3 class="title">Cart Details</h3>
            </div>
            <div class="order-summary">
              <div class="order-col">
                <div>
                  <strong>PRODUCT</strong>
                </div>
                <div>
                  <strong>Price</strong>
                </div>
              </div>
              <div class="order-products">
                <div class="order-col">
                  <div>
                    {props.data.item_qty}x {props.data.name}
                  </div>
                  <div>₦{props.data.item_price}</div>
                </div>
                <hr className="my-4" />

                <strong className="text-center">
                  Delivery Contact Details
                </strong>
                <div class="order-col">
                  <strong>Contact Person </strong>
                  <p>{props.data.contact_name}</p>
                </div>
                <div class="order-col">
                  <strong>Contact Phone number </strong>
                  <div> {props.data.phone}</div>
                </div>

                <hr className="my-4" />
                <div>
                  <strong>Delivery Address:</strong>
                  <p>{`${props.data.address}, 
                  ${props.data.city}, ${props.data.state}. ${props.data.country}`}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} appearance="subtle">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CartModal.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};
export default CartModal;
