import React from "react";
import {
  Table,
  Dropdown,
  IconButton,
  Icon,
  Whisper,
  Button,
  Popover,
} from "rsuite";
import { connect } from "react-redux";
import { getProducts } from "../../Actions/productAction";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
    };
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
          <Dropdown.Menu onSelect={() => alert('pp')}>
            <Dropdown.Item eventKey={3}>Edit Product</Dropdown.Item>
            <Dropdown.Item eventKey={4}>Delete Product</Dropdown.Item>
            <Dropdown.Item eventKey={5}>Mark Item as Sold</Dropdown.Item>
            <Dropdown.Item eventKey={6}>Update Item Sold</Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      );
    };
    const { Column, HeaderCell, Cell } = Table;
    return (
      <div>
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
            <Cell >0</Cell>
            {/* <Cell dataKey="model" /> */}
          </Column>

          <Column width={100}>
            <HeaderCell> Product Sold </HeaderCell>
            <Cell >0</Cell>
            {/* <Cell dataKey="model" /> */}
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>

            <Cell>
              <Whisper
                trigger="click"
                placement={"left"}
                speaker={<Speaker content={`I am positioned to the right`} />}
              >
                <IconButton
                  appearance="subtle"
                  icon={<Icon icon="more" />}
                />
              </Whisper>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
