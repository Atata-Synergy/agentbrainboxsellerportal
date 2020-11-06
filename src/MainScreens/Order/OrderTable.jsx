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
import OrderStatusModal from "./OrderStatusModal";
import MapModal from "./MapModal";
function OrderTable(props) {
  useEffect(() => {
    props.getOrders();
  }, []);
  const [ModalData, setModalData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [addressData, setAddressData] = useState();
  const [showCartModal, setModalCartModal] = useState(false);
  const [showStatusModal, setStatusModal] = useState(false);
  const [showMapModal, setMapModal] = useState(false);
  const hide = () => setModalCartModal(false);
  const show = () => setModalCartModal(false);
  const onHideStatusModal = () => setStatusModal(false);
  const onShowStatusModal = () => setStatusModal(true);
  const onHideMapModal = () => setMapModal(false);
  const onShowMapModal = () => setMapModal(true);
  const { Column, HeaderCell, Cell } = Table;
  const [orders, setOrders] = useState([]);

  const Speaker = ({ content, ...props }) => {
    return (
      <Popover {...props}>
        <Dropdown.Menu>
          {/* <Dropdown.Item
            // onSelect={ }
            eventKey={1}
          >
            View User
          </Dropdown.Item> */}
          <Dropdown.Item
            onSelect={() => {
              // const address = `${content.address}, ${content.state},  ${content.country}, `;
              setAddressData(
                `6 baiyewu street, ${content.state},  ${content.city},  ${content.country}. `
              );
              setMapModal(true);
            }}
            eventKey={2}
          >
            View Address
          </Dropdown.Item>
          <Dropdown.Item
            eventKey={4}
            onSelect={() => {
              setOrderData(content);
              setStatusModal(true);
            }}
            eventKey={3}
          >
            Update Order Status
          </Dropdown.Item>

          <Dropdown.Item
            onSelect={() => {
              setModalData(content);
              setModalCartModal(true);
            }}
            eventKey={5}
          >
            View Cart Details
          </Dropdown.Item>
          <Dropdown.Item eventKey={6}>Product not Available</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <>
      <CartModal
        {...props}
        data={ModalData}
        open={showCartModal}
        onHide={hide}
        onShow={show}
      />
      <OrderStatusModal
        data={orderData}
        onHide={onHideStatusModal}
        onShow={onShowStatusModal}
        open={showStatusModal}
      />
      <MapModal
        address={addressData}
        open={showMapModal}
        onHide={onHideMapModal}
      />
      <Table
        height={400}
        data={props.receivedOrders}
        loading={props.gettingOrders}
        wordWrap
        // onRowClick={(data) => {
        //   console.log(data);
        // }}
      >
        <Column width={100} align="center" fixed>
          <HeaderCell>Date</HeaderCell>
          <Cell dataKey="date" />
        </Column>

        <Column width={150} align="center">
          <HeaderCell>ORDER ID</HeaderCell>
          <Cell dataKey="tracking_id" />
        </Column>

        <Column width={200}>
          <HeaderCell>ORDER CURRENT STATUS</HeaderCell>
          <Cell dataKey="order_status" />
        </Column>

        <Column width={150}>
          <HeaderCell>PRODUCT NAME</HeaderCell>
          <Cell dataKey="item">{(rowData) => <p>{rowData.item.name}</p>}</Cell>
        </Column>

        <Column width={50}>
          <HeaderCell> QTY</HeaderCell>
          <Cell dataKey="item_qty" />
        </Column>

        <Column width={100}>
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
