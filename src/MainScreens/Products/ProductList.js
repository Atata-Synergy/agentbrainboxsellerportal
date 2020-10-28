import React from "react";
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
import { connect } from "react-redux";
import { getProducts, deleteProduct } from "../../Actions/productAction";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      show: false,
      toDelete: null,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  componentDidMount() {
    this.props.getProducts();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.products !== state.products) {
      return {
        products: props.products,
      };
    }
    return null;
  }

  render() {
    const Speaker = ({ content, ...props }) => {
      return (
        <Popover title="Title" {...props}>
          <Dropdown.Menu>
            <Dropdown.Item
              onSelect={() =>
                this.props.history.push(`/seller/products/edit/${content}`)
              }
              eventKey={3}
            >
              Edit Product
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() => {
                this.open();
                this.setState({ toDelete: content });
              }}
              eventKey={4}
            >
              Delete Product
            </Dropdown.Item>
            <Dropdown.Item eventKey={5}>Mark Item as Sold</Dropdown.Item>
            <Dropdown.Item eventKey={6}>Update Item Sold</Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      );
    };
    const { Column, HeaderCell, Cell } = Table;
    return (
      <div>
        <Modal
          backdrop="static"
          show={this.state.show}
          onHide={this.close}
          size="xs"
        >
          <Modal.Body>
            <Icon
              icon="exclamation-triangle"
              style={{
                color: "red",
                fontSize: 24,
              }}
            />
            {"  "}
            Do you want to delete this product, and all the attached images and
            promotion? Once deleted, you can not undo this action
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.props.deleteProduct(this.state.toDelete);
                this.close()
                this.props.getProducts()
                }}
              color="red"
              appearance="primary"
            >
              Delete
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Table
          height={400}
          data={this.state.products}
          // onRowClick={(data) => {
          //   console.log(data);
          // }}
        >
          <Column width={70} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={200} fixed>
            <HeaderCell>Product Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={100}>
            <HeaderCell>Product ID</HeaderCell>
            <Cell dataKey="productCode" />
          </Column>

          <Column width={250}>
            <HeaderCell>Product Model / Short Description</HeaderCell>
            <Cell dataKey="model" />
          </Column>
          <Column width={100}>
            <HeaderCell>In Stock </HeaderCell>
            <Cell>0</Cell>
            {/* <Cell dataKey="model" /> */}
          </Column>

          <Column width={100}>
            <HeaderCell> Product Sold </HeaderCell>
            <Cell>0</Cell>
            {/* <Cell dataKey="model" /> */}
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>

            <Cell>
              {(rowData) => {
                return (
                  <Whisper
                    trigger="click"
                    placement={"left"}
                    speaker={<Speaker content={rowData.id} />}
                  >
                    <IconButton
                      appearance="subtle"
                      icon={<Icon icon="more" />}
                    />
                  </Whisper>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.products,
});

const mapDispatchToProps = {
  getProducts,
  deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
