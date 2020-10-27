import React, { useState, Component, Fragment } from "react";
import RichTextEditor from "react-rte";
import {
  Steps,
  Button,
  Whisper,
  IconButton,
  Icon,
  Tooltip,
  Input,
  Schema,
  ControlLabel,
  FormControl,
  FormGroup,
  Form,
  FlexboxGrid,
  Notification,
  Modal,
  Row,
  Uploader,
  Message,
  Table,
  Panel,
  Toggle,
  Divider,
} from "rsuite";
import ProductServices from "./ProductServices";
import { baseUrl } from "../../Partials/API";
import { connect } from "react-redux";
import { createProduct, createAd } from "../../Actions/productAction";
import store from "../../Helpers/Store";
import NumberFormat from "react-number-format";
import {
  TO_STEP_0,
  TO_STEP_1,
  TO_STEP_2,
  TO_STEP_3,
  CLEAR_STATUS_MESSAGE,
} from "../../Actions/types";
import { token } from "../../Partials/constant";
import CreatePromotion from "./CreatePromotion";
import { Link } from "react-router-dom";
class CreateProductContainer extends Component {
  constructor() {
    super();
    this.state = {
      stepsCurrent: 0,
      stepsError: null,
      /********FORM*****************/
      category_id: "",
      name: "",
      model: "",
      price: "",
      is_new: "",
      isNegotiable: "",
      /****END**FORM***ENTRY********/
      basicInfoDisplay: "block",
      basicSpecificationDisplay: "none",
      productNameError: null,
      productModelError: null,
      productSKUError: null,
      productPriceError: null,
      ProductSalePriceError: null,
      productColourError: null,
      disabledPreviousButton: true,
      disabledNextButton: false,
      showDraftModal: false,
      savedProduct: "",
      productMediaDisplay: "none",
      productServicesDisplay: "none",
      draftBtnLoading: false,
      nextBtnLoading: false,
      nextBtnText: "Next",
      description: RichTextEditor.createEmptyValue(),
      specification: RichTextEditor.createEmptyValue(),
      other_details: RichTextEditor.createEmptyValue(),
      warranty: RichTextEditor.createEmptyValue(),
      userManual: RichTextEditor.createEmptyValue(),
    };
    this.next = this.next.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
  }

  validateInput(text, errorMessage) {
    if (text === "" || text === undefined || text === null) {
      return errorMessage;
    }
    return null;
  }

  async next() {
    console.log(this.props);

    /**
     * Switch screens
     */

    switch (this.props.stepsCurrent) {
      case 0:
        this.setState({
          disabledPreviousButton: false,
        });
        store.dispatch({ type: TO_STEP_1 });

        break;
      case 1:
        this.setState({
          disabledNextButton: false,
          disabledPreviousButton: true,
        });
        // store.dispatch({ type: TO_STEP_2 });
        /******UPLOAD PRODUCT */
        const productData = {
          category_id: 1,
          name: this.state.name,
          model: this.state.model,
          description: this.state.description.toString("html"),
          specification: this.state.specification.toString("html"),
          price: this.state.price,
          is_new: this.state.is_new,
          isNegotiable: this.state.isNegotiable,
          warranty: this.state.warranty.toString("html"),
          userManual: this.state.userManual.toString("html"),
          other_details: this.state.other_details.toString("html"),
        };
        this.props.createProduct({ productData });
        // store.dispatch({ type: TO_STEP_2 });
        break;
      case 2:
        store.dispatch({ type: TO_STEP_3 });
        this.setState({
          nextBtnText: "Create Promotion",
          disabledNextButton: !this.props.product.id,
          disabledPreviousButton: true,
        });
        break;
      case 3:
        const adData = {
          ElapseDate: this.props.date,
          productId: this.props.product.id,
        };
        this.props.createAd(adData);
        break;
      default:
    }
  }

  previous() {
    switch (this.props.stepsCurrent) {
      case 0:
        this.setState({
          disabledPreviousButton: true,
        });
      case 1:
        this.setState({
          disabledPreviousButton: true,
        });
        store.dispatch({ type: TO_STEP_0 });
        break;
      case 2:
        this.setState({
          disabledNextButton: true,
          disabledPreviousButton: false,
        });
        store.dispatch({ type: TO_STEP_1 });
        break;
      case 3:
        this.setState({
          disabledNextButton: true,
          disabledPreviousButton: false,
        });
        store.dispatch({ type: TO_STEP_2 });
        break;
      default:
        break;
    }
  }

  async saveDraft() {
    this.setState({ draftBtnLoading: true });
    /**
     * Save draft saves filled products to AsyncStorage
     */

    const formData = {
      productName: this.state.productName,
      productModel: this.state.productModel,
      productSKU: this.state.productSKU,
      productPrice: this.state.productPrice,
      ProductSalePrice: this.state.ProductSalePrice,
      productColour: this.state.productColour,
    };

    if (formData.productName !== "") {
      try {
        await localStorage.setItem(
          "savedProductsData",
          JSON.stringify(formData)
        );
        Notification["success"]({
          title: "Saved",
          description: `${formData.productName} has been successfully saved, 
          you can come back later to finish uploading your product. Ensure you do not clean your browser cache `,
        });
      } catch (error) {
        Notification["error"]({
          title: "Draft Error",
          description: "Could not save data, Try again or contact Tech support",
        });
        console.log(error);
      }
    } else {
      this.setState({
        productNameError:
          "You need to fill the name field before saving to draft",
      });
      Notification["error"]({
        title: "Product Name",
        description:
          "Product name cannot be empty, Please fill in a product name",
      });
    }
    this.setState({ draftBtnLoading: false });
  }

  async componentDidMount() {
    /**
     * Saved draft from the localStorage
     */
    var savedProduct = await JSON.parse(
      localStorage.getItem("savedProductsData")
    );
    /**
     * Check if there is saved draft
     */
    if (savedProduct) {
      this.setState({
        showDraftModal: true,
        savedProduct: savedProduct,
      });
    }
  }

  componentDidUpdate(props) {
    if (props.productUpdateStatus) {
      Notification[props.productUpdateStatus ? "success" : "error"]({
        title: [props.productUpdateStatus ? "success" : "error"],
        description:
          props.productUpdateStatus && props.productUpdateStatus.message,
      });
      // CLEAR NOTIFICATION AFTER 5 SECONDS
      setTimeout(function () {
       store.dispatch({type: CLEAR_STATUS_MESSAGE})
      }, 5000);
    }
  }

  render() {
    const userToken = localStorage.getItem(token);
    const tooltip = (
      <Tooltip>
        This is a help <i> tooltip </i> .
      </Tooltip>
    );
    const { StringType, NumberType } = Schema.Types;
    const model = Schema.Model({
      productName: StringType().isRequired("This field is required."),
      productModel: StringType().isRequired("This field is required."),
      productSKU: StringType().isRequired("This field is required."),
      productPrice: StringType().isRequired("This field is required."),
      ProductSalePrice: StringType().isRequired("This field is required."),
      productColour: StringType().isRequired("This field is required."),
    });

    /**
     * List of all input fields
     */

    const inputArray = [
      {
        id: 1,
        label: "Product Name",
        isRequired: true,
        controlName: "name",
        value: this.state.name,
        onChange: (text) => this.setState({ name: text }),
        onBlur: (text) =>
          this.setState({
            productNameError: this.validateInput(text),
          }),
        type: "text",
        errorMessage: this.state.productNameError,
      },
      {
        id: 2,
        label: "Product Model/Short description of the product",
        isRequired: true,
        controlName: "model",
        value: this.state.model,
        onChange: (text) => this.setState({ model: text }),
        onBlur: (text) =>
          this.setState({
            productModelError: this.validateInput(text),
          }),
        type: "text",
        errorMessage: this.state.productModelError,
      },
      {
        id: 4,
        label: "Product Price",
        controlName: "price",
        value: this.state.price,
        onChange: (text) => this.setState({ price: text.floatValue }),
        type: "number",
        errorMessage: this.state.productPriceError,
        inputCurrency: true,
        value: this.state.productPrice,
      },
    ];
    const { savedProduct } = this.state;

    return (
      <div className="container w-100">
        <Modal
          backdrop={true}
          show={this.state.showDraftModal}
          onHide={() => this.setState({ showDraftModal: false })}
          size="xs"
        >
          <Modal.Body>
            <Icon
              icon="info"
              style={{
                color: "#ffb300",
                fontSize: 24,
              }}
            />
            You have a product you saved in draft, will you like to continue
            from where you stopped ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.setState({
                  productName: savedProduct.productName,
                  productModel: savedProduct.productModel,
                  productSKU: savedProduct.productSKU,
                  productPrice: savedProduct.productPrice,
                  ProductSalePrice: savedProduct.ProductSalePrice,
                  productColour: savedProduct.productColour,
                });
                this.setState({ showDraftModal: false });
              }}
              appearance="primary"
            >
              Ok
            </Button>
            <Button
              onClick={() => this.setState({ showDraftModal: false })}
              appearance="subtle"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="m-4">
          <Steps
            current={this.props.stepsCurrent}
            currentStatus={this.state.stepsError}
          >
            <Steps.Item title="Basic product Information" />
            <Steps.Item title="Product Specifications" />
            <Steps.Item title="Upload Product Image" />
            <Steps.Item title="Promote" />
          </Steps>
        </div>
        <hr className="my-4" />
        {/* Basic info Tab   */}
        <div
          className="form-horizontal form-label-left"
          style={{
            display: this.props.basicInfoDisplay,
            justifyContent: "center",
          }}
        >
          <div className="form-group row">
            <Form model={model} layout="inline">
              <FormGroup>
                {inputArray.map((inputField) => (
                  <div
                    key={inputField.key}
                    style={{
                      margin: "1em",
                      marginLeft: 60,
                      width: "100%",
                    }}
                  >
                    {inputField.inputCurrency ? (
                      <>
                        <div className="row">
                          <div className="col-md-4">
                            <ControlLabel> {inputField.label} </ControlLabel>
                          </div>
                          <div className="col-md-8">
                            <div style={{ width: 160 }}>
                              <NumberFormat
                                style={{
                                  border: "1px solid #f1f1f3",
                                  padding: "10px",
                                }}
                                thousandSeparator={true}
                                prefix="₦"
                                onValueChange={inputField.onChange}
                                value={inputField.value}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row" style={{}}>
                          <div className="col-md-4">
                            <ControlLabel> {inputField.label} </ControlLabel>
                          </div>
                          <div className="col-md-6">
                            <Input
                              value={inputField.value}
                              name={inputField.controlName}
                              onChange={inputField.onChange}
                              type={inputField.type}
                              className="w-100"
                              componentClass={inputField.componentClass}
                            />
                            <small className="text-danger">
                              {inputField.errorMessage}
                            </small>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <div
                  className="row"
                  style={{
                    margin: 20,
                    marginLeft: 50,
                    width: "100%",
                    justifyItems: "stretch",
                  }}
                >
                  <div className="col-sm-12 col-md-4">
                    <ControlLabel>Is Product New?</ControlLabel>
                  </div>
                  <div className="col-sm-12 col-md-8">
                    <Toggle
                      size="lg"
                      checked={this.state.is_new}
                      className="ml-2"
                      checkedChildren="New"
                      unCheckedChildren="Fairly Used"
                      onChange={(e) => this.setState({ is_new: e })}
                    />
                  </div>
                  <div className="show-grid mt-4">
                    <div className="col-sm-12 col-md-3">
                      <ControlLabel> Product description </ControlLabel>
                    </div>
                    <div className="col-sm-12 col-md-8">
                      <RichTextEditor
                        value={this.state.description}
                        editorStyle={{ height: 300 }}
                        onChange={(e) => this.setState({ description: e })}
                      />
                    </div>
                  </div>
                </div>
              </FormGroup>
            </Form>
          </div>
        </div>
        {/* End Basic info Tab   */}
        {/* Specification Tab   */}
        <Form
          style={{
            marginLeft: 60,
            margin: 20,
            display: this.props.basicSpecificationDisplay,
          }}
        >
          <div className="show-grid mt-4">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6}>
                <ControlLabel> Product specification </ControlLabel>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={14}>
                <RichTextEditor
                  value={this.state.specification}
                  editorStyle={{ height: 300 }}
                  onChange={(e) => this.setState({ specification: e })}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div className="show-grid mt-4">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6} style={{ paddingRight: 20 }}>
                <ControlLabel> Product Warranty Information </ControlLabel>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={14}>
                <RichTextEditor
                  value={this.state.warranty}
                  editorStyle={{ height: 300 }}
                  onChange={(e) => this.setState({ warranty: e })}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div className="show-grid mt-4">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6} style={{ paddingRight: 20 }}>
                <ControlLabel> User 's Manual </ControlLabel>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={14}>
                <RichTextEditor
                  value={this.state.userManual}
                  editorStyle={{ height: 300 }}
                  onChange={(e) => this.setState({ userManual: e })}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div className="show-grid mt-4">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6} style={{ paddingRight: 20 }}>
                <ControlLabel> Other essential Details </ControlLabel>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={14}>
                <RichTextEditor
                  value={this.state.other_details}
                  editorStyle={{ height: 300 }}
                  onChange={(e) => this.setState({ other_details: e })}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
        </Form>
        {/* End Specification Tab   */}
        {/* Media Tab   */}
        <div
          className="form-horizontal form-label-left"
          style={{
            display: this.props.productMediaDisplay,
            justifyContent: "center",
          }}
        >
          <Message
            type="warning"
            description="Upload product medias, upload maximum of 6 images, and minimum of one. You can upload videos describing your project, maximum file size 15mb"
          />
          <Uploader
            multiple
            fileList={this.state.fileList}
            onUpload={(files) => console.log(files)}
            listType="picture"
            onSuccess={(res) => console.log(res)}
            disabled={!this.props.product.id}
            headers={{ Authorization: `Bearer ${userToken}` }}
            action={`${baseUrl}/merchants/products/upload_media/${
              this.props.product && this.props.product.id
            }`}
          >
            <button>
              <Icon icon="camera-retro" size="lg" />
            </button>
          </Uploader>
          <Message
            description={
              <>
                <a
                  className="btn-link"
                  href="#"
                  onClick={() => store.dispatch({ type: TO_STEP_3 })}
                >
                  Skip
                </a>
                if you want don't want to upload images now but your product
                will not be visible
              </>
            }
            type="info"
          />
        </div>
        {/* End Specification */}
        <div
          className="form-horizontal form-label-left"
          style={{
            display: this.props.productServicesDisplay,
            justifyContent: "center",
          }}
        >
          <CreatePromotion />
        </div>
        <hr className="my-4" />
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div className="m-3">
            <Button
              appearance="primary"
              disabled={this.state.disabledPreviousButton}
              onClick={() => this.previous(this.props.stepsCurrent)}
            >
              Previous
            </Button>
          </div>
          <div className="m-3">
            <Button
              appearance="default"
              color="green"
              disabled={this.state.disabledNextButton}
              loading={this.props.isCreatingProduct}
              onClick={() => this.next(this.state.stepsCurrent)}
            >
              {this.state.nextBtnText}
            </Button>
          </div>
          <div className="m-3">
            {this.props.stepsCurrent !== 2 ? (
              <Button
                loading={this.state.draftBtnLoading}
                appearance="subtle"
                onClick={this.saveDraft}
              >
                Save Draft
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isCreatingProduct: state.product.isCreatingProduct,
  product: state.product.product,
  product_Error: state.product.product_Error,
  basicInfoDisplay: state.product.basicInfoDisplay,
  productMediaDisplay: state.product.productMediaDisplay,
  productServicesDisplay: state.product.productServicesDisplay,
  basicSpecificationDisplay: state.product.basicSpecificationDisplay,
  stepsCurrent: state.product.stepsCurrent,
  disabledPreviousButton: state.product.disabledPreviousButton,
  product: state.product.product,
  date: state.product.date,
  productUpdateStatus: state.product.productUpdateStatus,
});

const mapDispatchToProps = {
  createProduct,
  createAd,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProductContainer);
