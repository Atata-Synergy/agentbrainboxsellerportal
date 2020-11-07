import React, { Component } from "react";
import logo from "../../Assets/logo.png";
import { RibbonContainer, RightCornerRibbon } from "react-ribbons";
import {
  Steps,
  ButtonGroup,
  Paragraph,
  Button,
  Panel,
  Container,
  Content,
  FlexboxGrid,
  Form,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
  ButtonToolbar,
  Navbar,
  Nav,
  Icon,
  Dropdown,
  SelectPicker,
  Uploader,
  Schema,
  Input,
  Row,
  Notification,
  Message,
  Modal,
  Loader,
} from "rsuite";
import { registerMerchant } from "../../Actions/registerAction";
import NavBarHeader from "../../Components/NavBarHeader";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

class CreateSellerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      checkTrigger: "blur",
      business_name: "",
      business_email: "",
      business_phone: "",
      business_image: "",
      cityOrTown: "",
      business_address: "",
      TIN: "",
      BusinessRegistration: "",
      VATRegistrationStatus: "",
      wallet_code: "",
      bank_name: "",
      account_holder_name: "",
      account_number: "",
      iban: "",
      bvn: "",
      wallet_code_confirmation: "",
      formError: {},
      formValue: {},
      draftBtnLoading: false,
      showDraftModal: false,
      savedData: "",
      state: "country",
      country: "Nigeria",
      nextBtn: "Next",
      nextIsLoading: false,
      Message: null,
      type: "info",
    };
    // this.saveDraft = this.saveDraft.bind(this);
  }
  // async saveDraft() {
  //   this.setState({ draftBtnLoading: true });
  //   /**
  //    * Save draft saves filled products to AsyncStorage
  //    */

  //   const formData = {
  //     user_id: this.state.user_id,
  //     atataId: this.state.atataId,
  //     Legal_or_business_name: this.state.Legal_or_business_name,
  //     Product_Category: this.state.Product_Category,
  //     AddressLine1: this.state.AddressLine1,
  //     AddressLine2: this.state.AddressLine2,
  //     cityOrTown: this.state.cityOrTown,
  //     State: this.state.State,
  //     Country: this.state.Country,
  //     TIN: this.state.TIN,
  //     BusinessRegistration: this.state.BusinessRegistration,
  //     Bank: this.state.Bank,
  //     Bank_code: this.state.Bank_code,
  //     Account_name: this.state.Account_name,
  //     IBAN: this.state.IBAN,
  //     Account_number: this.state.Account_number,
  //     BVN: this.state.BVN,
  //     PersonInCharge: this.state.PersonInCharge,
  //     Phone_number_PIC: this.state.Phone_number_PIC,
  //     Phone_number: this.state.Phone_number,
  //     email: this.state.email,
  //     website: this.state.website,
  //     pageLoader: false,
  //     pageLoadingMessage: "",
  //   };

  //   if (formData.Legal_or_business_name !== "") {
  //     try {
  //       await localStorage.setItem("saveSellerData", JSON.stringify(formData));
  //       Notification["success"]({
  //         title: "Saved",
  //         description: `${formData.Legal_or_business_name} has been successfully saved. Ensure you do not clean your browser cache `,
  //       });
  //     } catch (error) {
  //       Notification["error"]({
  //         title: "Draft Error",
  //         description: "Could not save data, Try again or contact Tech support",
  //       });
  //       console.log(error);
  //     }
  //   } else {
  //     this.setState({
  //       Legal_or_business_nameError:
  //         "You need to fill the name field before saving to draft",
  //     });
  //     Notification["error"]({
  //       title: "Store Name",
  //       description: "Store name cannot be empty, Please fill in a Store name",
  //     });
  //   }
  //   this.setState({ draftBtnLoading: false });
  // }
  componentDidMount() {
    /**
     * Saved Data from the local storage
     */

    var savedData = JSON.parse(localStorage.getItem("saveSellerData"));

    if (savedData) {
      this.setState({
        savedData: savedData,
        showDraftModal: true,
        dataInLocalStorage: true,
      });
      console.log(this.state.savedData);
    }
  }
  UNSAFE_componentWillReceiveProps(props) {
    props.merchant &&
      props.merchant.id &&
      this.props.history.push("/seller");
  }
  render() {
    const { step } = this.state;
    // const { email, id, name } = this.props.navigation.state.params;
    const onChange = (nextStep) => {
      this.setState(() => {
        return {
          step: nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep,
        };
      });
    };

    const onNext = async () => {
      switch (step) {
        case 0:
          onChange(step + 1);
          break;
        case 1:
          onChange(step + 1);
          break;
        case 2:
          // onChange(step + 1);
          this.props.registerMerchant({ ...this.state });
          break;

        default:
          break;
      }
    };
    const onPrevious = () => onChange(step - 1);
    const { StringType, NumberType } = Schema.Types;
    const stepModel = Schema.Model({
      Legal_or_business_name: StringType().isRequired(
        "This field is required."
      ),
      Product_Category: StringType().isRequired("This field is required."),
      AddressLine1: StringType().isRequired("This field is required."),
      cityOrTown: StringType().isRequired("This field is required."),
    });

    const stepOneField = [
      {
        id: 1,
        name: "business_name",
        label: "Your Shop name",
        type: "text",
        required: true,
        state: this.state.business_name,
        onChange: (text) => this.setState({ business_name: text }),
        errorMessage:
          "Your store name is required, kindly Fill this field before proceeding.",
        helpBlock:
          "Please Enter In Here Your Store Name,This how customer locates you. e.g Fendi Store, Gucci ",
      },
      {
        id: 2,
        name: "business_email",
        label: "Your Shop Email Address",
        type: "email",
        required: true,
        state: this.state.business_email,
        onChange: (text) => this.setState({ business_email: text }),
        errorMessage:
          "Let's know the category your store belongs to,kindly Fill this field before proceeding.",
        helpBlock: "Your contact email address",
      },
      {
        id: 3,
        state: this.state.business_phone,
        onChange: (text) => this.setState({ business_phone: text }),
        name: "business_phone",
        label: "Shop/Business Phone number",
        type: "text",
        required: true,
        errorMessage: "Fill the address field before proceeding.",
      },
      {
        id: 4,
        state: this.state.business_image,
        onChange: (text) => this.setState({ business_image: text }),
        name: "business_image",
        label: "Upload your business logo",
        type: "file",
        helpBlock: "upload a 150 x 150 image with max size of 5mb",
      },

      {
        id: 5,
        state: this.state.business_address,
        onChange: (text) => this.setState({ business_address: text }),
        name: "business_address",
        label: "Street/Block number, street name, closest Landmark ",
        type: "text",
        required: true,
        errorMessage: "Fill this field before proceeding.",
        helpBlock: "e.g 18A Satellite Town. beside AP filling Station",
      },
      {
        id: 6,
        state: this.state.cityOrTown,
        onChange: (text) => this.setState({ cityOrTown: text }),
        name: "cityOrTown",
        label: "City Or Town",
        type: "text",
        required: true,
        errorMessage: "Fill this field before proceeding.",
        helpBlock: "e.g Satellite Town",
      },
    ];

    const stepTwoField = [
      {
        id: 1,
        onChange: (text) => this.setState({ TIN: text }),
        state: this.state.TIN,
        name: "TIN",
        label: "TIN",
        type: "text",
        required: false,
        helpBlock: "Your tax identification number",
      },
      {
        id: 2,
        onChange: (text) => this.setState({ BusinessRegistration: text }),
        name: "BusinessRegistration",
        state: this.state.BusinessRegistration,
        label: "CAC Registration Number",
        type: "text",
        helpBlock: "Your CAC registration number",
      },
    ];

    const stepThreeField = [
      {
        name: "Bank",
        id: 1,
        label: "Bank name",
        type: "text",
        state: this.state.bank_name,
        onChange: (text) => this.setState({ bank_name: text }),
        helpBlock: "Your Bank full name. e.g First Bank Plc, etc",
      },
      {
        name: "Bank_code",
        id: 2,
        label: "Bank Code",
        type: "text",
        state: this.state.Bank_code,
        onChange: (text) => this.setState({ Bank_code: text }),
        helpBlock: "Your Bank code",
      },
      {
        name: "Account_name",
        id: 3,
        label: "Account Holder's Name",
        type: "text",
        state: this.state.account_holder_name,
        onChange: (text) => this.setState({ account_holder_name: text }),
        helpBlock:
          "The registered account holder's name, e.g ATATA resources Plc",
      },
      {
        name: "iban",
        id: 4,
        label: "IBAN",
        type: "text",
        state: this.state.iban,
        onChange: (text) => this.setState({ iban: text }),
        helpBlock: "IBAN",
      },
      {
        name: "account_number",
        id: 5,
        label: "Account Number",
        type: "text",
        state: this.state.account_number,
        onChange: (text) => this.setState({ account_number: text }),
      },
      {
        name: "bvn",
        id: 6,
        label: "BVN",
        type: "text",
        max: 10,
        state: this.state.bvn,
        onChange: (text) => this.setState({ bvn: text }),
        helpBlock: "Your bank verification Number",
      },
    ];

    const { savedData, formValue } = this.state;
    return (
      <Container>
        <NavBarHeader />
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
            You have a saved registration data, Will you like to continue ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.setState({
                  user_id: savedData.user_id,
                  atataId: savedData.atataId,
                  Legal_or_business_name: savedData.Legal_or_business_name,
                  Product_Category: savedData.Product_Category,
                  AddressLine1: savedData.AddressLine1,
                  AddressLine2: savedData.AddressLine2,
                  cityOrTown: savedData.cityOrTown,
                  State: savedData.State,
                  Country: savedData.Country,
                  TIN: savedData.TIN,
                  BusinessRegistration: savedData.BusinessRegistration,
                  VATRegistrationStatus: savedData.VATRegistrationStatus,
                  Bank: savedData.Bank,
                  Bank_code: savedData.Bank_code,
                  Account_name: savedData.Account_name,
                  IBAN: savedData.IBAN,
                  Account_number: savedData.Account_number,
                  BVN: savedData.BVN,
                  PersonInCharge: savedData.PersonInCharge,
                  Phone_number_PIC: savedData.Phone_number_PIC,
                  Phone_number: savedData.Phone_number,
                  email: savedData.email,
                  website: savedData.website,
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
        <div className="row p-4 mx-auto">
          <Form
            ref={(ref) => (this.form = ref)}
            onChange={(formValue) => {
              this.setState({ formValue });
            }}
            onCheck={(formError) => {
              this.setState({ formError });
            }}
            formValue={formValue}
            model={stepModel}
            fluid
          >
            <Panel
              header={`Welcome , Let's set up your store`}
              style={{ width: "100%" }}
            >
              {this.state.Legal_or_business_nameError && (
                <Message
                  showIcon
                  type="error"
                  title="Informational"
                  description={this.state.Legal_or_business_nameError}
                />
              )}
              <Steps current={step}>
                <Steps.Item title="Your store basic profile" />
                <Steps.Item title="Files and documentation" />
                <Steps.Item title="Setup your Wallet" />
              </Steps>
              <hr />
              <Panel
                style={{
                  display: step === 0 ? "block" : "none",
                }}
              >
                {/* <StepOne /> */}
                {stepOneField.map((inputField) => (
                  <FormGroup key={inputField.id}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item
                        colspan={7}
                        style={{ justifyContent: "end" }}
                      >
                        <ControlLabel> {inputField.label} </ControlLabel>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={14}>
                        <Input
                          value={inputField.state}
                          onChange={inputField.onChange}
                          name={inputField.name}
                          type={inputField.type}
                        />
                        <small> {inputField.helpBlock} </small>
                        <HelpBlock>
                          {inputField.required ? "Required" : null}
                        </HelpBlock>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </FormGroup>
                ))}
                <FormGroup>
                  <FlexboxGrid>
                    <FlexboxGrid.Item
                      colspan={7}
                      style={{ justifyContent: "end" }}
                    >
                      <ControlLabel> State </ControlLabel>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={14}>
                      <FlexboxGrid justify="space-around">
                        <FlexboxGrid.Item colspan={7}>
                          <select
                            name="state"
                            id=""
                            className="form-control"
                            onChange={(event) =>
                              this.setState({
                                state: event.target.value,
                              })
                            }
                          >
                            <option value="Lagos"> Lagos </option>
                            <option value="Other"> Other </option>
                          </select>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={7}>
                          <ControlLabel> Country </ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={8}>
                          <select
                            name="country"
                            id=""
                            className="form-control"
                            onChange={(event) =>
                              this.setState({
                                country: event.target.value,
                              })
                            }
                          >
                            <option value="Nigeria"> Nigeria </option>
                            <option value="Other"> Other </option>
                          </select>
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </FormGroup>
              </Panel>

              <Panel
                style={{
                  display: step === 1 ? "block" : "none",
                }}
              >
                {/* <StepThree /> */}
                <Panel
                  header=" Upload your business registration documents, for store verification e.g
            CAC Registration etc "
                >
                  <Uploader
                    multiple
                    accept="jpg, pdf"
                    listType="picture-text"
                    action="//jsonplaceholder.typicode.com/posts/"
                  />
                </Panel>
                {stepTwoField.map((inputField) => (
                  <FormGroup key={inputField.id}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item
                        colspan={7}
                        style={{ justifyContent: "end" }}
                      >
                        <ControlLabel> {inputField.label} </ControlLabel>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={14}>
                        <Input
                          value={inputField.state}
                          onChange={inputField.onChange}
                          name={inputField.name}
                        />
                        <small> {inputField.helpBlock} </small>
                        <HelpBlock>
                          {inputField.required ? "Required" : null}
                        </HelpBlock>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </FormGroup>
                ))}
              </Panel>
              <Panel
                style={{
                  display: step === 2 ? "block" : "none",
                }}
              >
                {/* <StepFour /> */}
                {stepThreeField.map((inputField) => (
                  <FormGroup key={inputField.id}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item
                        colspan={7}
                        style={{ justifyContent: "end" }}
                      >
                        <ControlLabel> {inputField.label} </ControlLabel>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={14}>
                        <Input
                          value={inputField.state}
                          onChange={inputField.onChange}
                          name={inputField.name}
                          maxLength={inputField.max}
                          type={inputField.type}
                        />
                        <small> {inputField.helpBlock} </small>
                        <HelpBlock>
                          {inputField.required ? "Required" : null}
                        </HelpBlock>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </FormGroup>
                ))}
                <FormGroup>
                  <FlexboxGrid>
                    <FlexboxGrid.Item
                      colspan={7}
                      style={{ justifyContent: "end" }}
                    >
                      <ControlLabel> Wallet Code </ControlLabel>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={14}>
                      <NumberFormat
                        format="######"
                        style={{ padding: "10px", border: "1px solid #373737" }}
                        mask="*"
                        renderText={(t) => (
                          <h2 style={{ padding: "15px" }}>{t}</h2>
                        )}
                        type="password"
                        onValueChange={(text) =>
                          this.setState({ wallet_code: text.floatValue })
                        }
                      />

                      <small> Input for digit code to access your code </small>
                      <HelpBlock>{"Required"}</HelpBlock>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </FormGroup>
                <FormGroup>
                  <FlexboxGrid>
                    <FlexboxGrid.Item
                      colspan={7}
                      style={{ justifyContent: "end" }}
                    >
                      <ControlLabel>COnfirm Wallet Code </ControlLabel>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={14}>
                      <NumberFormat
                        format="######"
                        style={{ padding: "10px", border: "1px solid #373737" }}
                        mask="*"
                        type="password"
                        onValueChange={(text) =>
                          this.setState({
                            wallet_code_confirmation: text.floatValue,
                          })
                        }
                      />

                      <small> Input for digit code to access your code </small>
                      <HelpBlock>{"Required"}</HelpBlock>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </FormGroup>
              </Panel>
              <hr />
              <ButtonGroup>
                <Button onClick={onPrevious} disabled={step === 0}>
                  Previous
                </Button>
                <Button
                  appearance="primary"
                  onClick={onNext}
                  loading={this.state.nextIsLoading}
                >
                  {this.state.step === 2 ? "Finish" : "Next"}
                </Button>
                <Button
                  onClick={this.saveDraft}
                  loading={this.state.draftBtnLoading}
                >
                  Save Draft
                </Button>
              </ButtonGroup>
            </Panel>
          </Form>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  creatingMerchant: state.auth.creatingMerchant,
  merchant: state.auth.merchant,
  merchantError: state.auth.merchantError,
});

const mapDispatchToProps = {
  registerMerchant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSellerContainer);
