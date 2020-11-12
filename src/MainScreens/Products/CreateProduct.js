import React from "react";
import { Steps } from "rsuite";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import CreateProductContainer from "./CreateProductContainer";
import { useEffect } from "react";
import {getProduct} from "../../Actions/productAction"
import { connect } from 'react-redux'

 function CreateProduct(props) {
  const {id} = useParams()
  const history = useHistory()
  useEffect(() => {
 id && props.getProduct(id)
  }, []);
  return (
    <>
      <CreateProductContainer history={history} {...props} />
    </>
  );
}

const mapStateToProps = (state) => ({
  product: state.product.product,
});

const mapDispatchToProps = {
  getProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);