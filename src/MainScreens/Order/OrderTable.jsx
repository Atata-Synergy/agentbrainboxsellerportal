import React from "react";
import { connect } from "react-redux";
import {
  Table,
  Dropdown,
  IconButton,
  Icon,
  Whisper,
  Button,
  Popover,
  Modal,
} from "rsuite";
import { useState } from "react";
import { getOrders } from "../../Actions/orderAction";
import { useEffect } from "react";
import "./order.css";
import CartModal from "./CartModal";
function OrderTable(props) {
  useEffect(() => {
    props.getOrders();
  }, []);
  const [ModalData, setModalData] = useState([]);
  const [showCartModal, setModalCartModal] = useState(false);
  const hide = () => setModalCartModal(false);
  const show = () => setModalCartModal(false);
  const Speaker = ({ content, ...props }) => {
    return (
      <Popover {...props}>
        <Dropdown.Menu>
          <Dropdown.Item
            // onSelect={ }
            eventKey={3}
          >
            View User
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => {}} eventKey={4}>
            View Address
          </Dropdown.Item>
          <Dropdown.Item
            onSelect={() => {
              setModalData(content);
              setModalCartModal(true);
            }}
            eventKey={5}
          >
            View Cart
          </Dropdown.Item>
          <Dropdown.Item eventKey={6}>Product not Available</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };
  const { Column, HeaderCell, Cell } = Table;
  const [orders, setOrders] = useState([]);

  return (
    <>
      <CartModal
        {...props}
        data={ModalData}
        open={showCartModal}
        onHide={hide}
        onShow={show}
      />
      <Table
        height={400}
        data={props.receivedOrders}
        loading={props.gettingOrders}
        // onRowClick={(data) => {
        //   console.log(data);
        // }}
      >
        <Column width={200} align="center" fixed>
          <HeaderCell>Date</HeaderCell>
          <Cell dataKey="date" />
        </Column>

        <Column width={200} align="center">
          <HeaderCell>ORDER ID</HeaderCell>
          <Cell dataKey="tracking_id" />
        </Column>

        <Column width={150}>
          <HeaderCell>ORDER CURRENT STATUS</HeaderCell>
          <Cell dataKey="order_status" />
        </Column>

        <Column width={100}>
          <HeaderCell>AMOUNT PAID</HeaderCell>
          <Cell dataKey="order_total" />
        </Column>

        <Column width={150}>
          <HeaderCell>Update Order Status</HeaderCell>
          <Cell dataKey="order_status" />
        </Column>
        <Column width={250}>
          <HeaderCell>Expire Time</HeaderCell>
          <Cell>00:00:00</Cell>
        </Column>

        <Column width={100} fixed="right">
          <HeaderCell>Action</HeaderCell>

          <Cell>
            {(rowData) => {
              return (
                <Whisper
                  trigger="click"
                  placement={"left"}
                  speaker={<Speaker content={rowData} />}
                >
                  <IconButton appearance="subtle" icon={<Icon icon="more" />} />
                </Whisper>
              );
            }}
          </Cell>
        </Column>
        <Column width={100} fixed="right">
          <HeaderCell>Status</HeaderCell>
          <Cell>
            <Icon icon="circle" color="red" className="warning-order" />
          </Cell>
        </Column>
      </Table>
    </>
  );
}

const mapStateToProps = (state) => ({
  gettingOrders: state.order.gettingOrders,
  receivedOrders: state.order.receivedOrders,
  orderErrors: state.order.orderErrors,
});

const mapDispatchToProps = {
  getOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable);
