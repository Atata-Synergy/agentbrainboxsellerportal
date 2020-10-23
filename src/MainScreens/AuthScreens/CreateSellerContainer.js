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
import { registerSeller } from "../../Partials/Authentication";

export default class CreateSellerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      checkTrigger: "blur",
      formValue: {},
      formError: {},
      user_id: this.props.history.location.state.user.id ,
      Legal_or_business_name: "", 
      Product_Category: "",
      AddressLine1: "",
      AddressLine2: "",
      cityOrTown: "",
      State: "Lagos",
      Country: "Nigeria",
      TIN: "",
      BusinessRegistration: "",
      VATRegistrationStatus: "",
      Bank: "",
      Bank_code: "",
      Account_name: "",
      IBAN: "",
      Account_number: "",
      BVN: "",
      draftBtnLoading: false,
      showDraftModal: false,
      Legal_or_business_nameError: "",
      savedData: "",
      PersonInCharge: "",
      Phone_number_PIC: "",
      Phone_number: "",
      email: "",
      website: "",
      nextBtn: "Next",
      nextIsLoading: false,
      Message: null,
      type: "info",
    };
    this.saveDraft = this.saveDraft.bind(this);
  }
  async saveDraft() {
    this.setState({ draftBtnLoading: true });
    /**
     * Save draft saves filled products to AsyncStorage
     */

    const formData = {
      user_id: this.state.user_id,
      atataId: this.state.atataId,
      Legal_or_business_name: this.state.Legal_or_business_name,
      Product_Category: this.state.Product_Category,
      AddressLine1: this.state.AddressLine1,
      AddressLine2: this.state.AddressLine2,
      cityOrTown: this.state.cityOrTown,
      State: this.state.State,
      Country: this.state.Country,
      TIN: this.state.TIN,
      BusinessRegistration: this.state.BusinessRegistration,
      VATRegistrationStatus: this.state.VATRegistrationStatus,
      Bank: this.state.Bank,
      Bank_code: this.state.Bank_code,
      Account_name: this.state.Account_name,
      IBAN: this.state.IBAN,
      Account_number: this.state.Account_number,
      BVN: this.state.BVN,
      PersonInCharge: this.state.PersonInCharge,
      Phone_number_PIC: this.state.Phone_number_PIC,
      Phone_number: this.state.Phone_number,
      email: this.state.email,
      website: this.state.website,
      pageLoader: false,
      pageLoadingMessage: "",
    };

    if (formData.Legal_or_business_name !== "") {
      try {
        await localStorage.setItem("saveSellerData", JSON.stringify(formData));
        Notification["success"]({
          title: "Saved",
          description: `${formData.Legal_or_business_name} has been successfully saved. Ensure you do not clean your browser cache `,
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
        Legal_or_business_nameError:
          "You need to fill the name field before saving to draft",
      });
      Notification["error"]({
        title: "Store Name",
        description: "Store name cannot be empty, Please fill in a Store name",
      });
    }
    this.setState({ draftBtnLoading: false });
  }
  async componentDidMount() {
    /**
     * Saved Data from the local storage
     */
    console.log(this.props);
    const { state } = this.props.history.location;
    if (state !== undefined) {
      this.setState({ Message: state.message });
    }
    var savedData = await JSON.parse(localStorage.getItem("saveSellerData"));

    if (savedData) {
      this.setState({
        savedData: savedData,
        showDraftModal: true,
        dataInLocalStorage: true,
      });
      console.log(this.state.savedData);
    }
  }
  render() {
    const { step, seller } = this.state;
    // const { email, id, name } = this.props.navigation.state.params;
    const onChange = (nextStep) => {
      this.setState(() => {
        return {
          step: nextStep < 0 ? 0 : nextStep > 4 ? 4 : nextStep,
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
          onChange(step + 1);
          break;
        case 3:
          onChange(step + 1);
          this.setState({ nextBtn: "Finish" });
          break;
        case 4:
          this.setState({ nextIsLoading: true });
          /**
           * Format required data in to an object
           */
          const formData = {
            seller_user_data: 0,
          };
          await registerSeller(formData)
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                localStorage.removeItem("token");
                // localStorage.removeItem("saveSellerData");
                this.props.history.push({
                  pathname: "/login",
                  state: {
                    message:
                      "Your store has been created successfully, Please login to start selling on ATATA57",
                    type: "info",
                  },
                });
              } else {
                this.setState({
                  message:
                    "could not create your store, Please check your network or try again later",
                  type: "error",
                });
                console.log("error");
              }
            })
            .catch((err) => {
              console.log(err);
              this.setState({
                nextIsLoading: false,
                Message: "Server error",
                type: "error",
              });
            });
          this.setState({ nextIsLoading: false });
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
        name: "Legal_or_business_name",
        label: "Your Shop name",
        type: "text",
        required: true,
        state: this.state.Legal_or_business_name,
        onChange: (text) => this.setState({ Legal_or_business_name: text }),
        errorMessage:
          "Your store name is required, kindly Fill this field before proceeding.",
        helpBlock:
          "Please Enter In Here Your Store Name,This how customer locates you. e.g Fendi Store, Gucci ",
      },
      {
        id: 2,
        name: "Product_Category",
        label: "Your Shop Category",
        type: "text",
        required: true,
        state: this.state.Product_Category,
        onChange: (text) => this.setState({ Product_Category: text }),
        errorMessage:
          "Let's know the category your store belongs to,kindly Fill this field before proceeding.",
        helpBlock:
          "What category will you  classify your store. e.g Agriculture, Medicine etc",
      },
      {
        id: 3,
        state: this.state.AddressLine1,
        onChange: (text) => this.setState({ AddressLine1: text }),
        name: "AddressLine1",
        label: "Shop Address",
        type: "text",
        required: true,
        errorMessage: "Fill the address field before proceeding.",
        helpBlock:
          "Your physical store address, block or house number, street name, nearest street",
      },
      {
        id: 4,
        state: this.state.AddressLine2,
        onChange: (text) => this.setState({ AddressLine2: text }),
        name: "AddressLine2",
        label: "closest landmark, P.O box",
        type: "text",
        helpBlock: "e.g beside Landmark A, P.O box 1234A",
      },
      {
        id: 5,
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
      {
        id: 3,
        onChange: (text) => this.setState({ VATRegistrationStatus: text }),
        name: "VATRegistrationStatus",
        state: this.state.VATRegistrationStatus,
        label: "VAT registration status",
        type: "text",
        helpBlock:
          "Chose registered if you have completed the VAT registration",
      },
    ];

    const stepThreeField = [
      {
        name: "Bank",
        id: 1,
        label: "Bank name",
        type: "text",
        state: this.state.Bank,
        onChange: (text) => this.setState({ Bank: text }),
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
        state: this.state.Account_name,
        onChange: (text) => this.setState({ Account_name: text }),
        helpBlock:
          "The registered account holder's name, e.g ATATA resources Plc",
      },
      {
        name: "IBAN",
        id: 4,
        label: "IBAN",
        type: "text",
        state: this.state.IBAN,
        onChange: (text) => this.setState({ IBAN: text }),
        helpBlock: "IBAN",
      },
      {
        name: "Account_number",
        id: 5,
        label: "Account Number",
        type: "text",
        state: this.state.Account_number,
        onChange: (text) => this.setState({ Account_number: text }),
      },
      {
        name: "BVN",
        id: 6,
        label: "BVN",
        type: "text",
        state: this.state.BVN,
        onChange: (text) => this.setState({ BVN: text }),
        helpBlock: "Your bank verification Number",
      },
    ];

    const contactField = [
      {
        id: 1,
        onChange: (text) => this.setState({ PersonInCharge: text }),
        name: "PersonInCharge",
        state: this.state.PersonInCharge,
        label: "Person in Charge",
        type: "text",
        helpBlock:
          "The name of contact person handling the account will handle the ATATA account",
      },
      {
        id: 2,
        onChange: (text) => this.setState({ Phone_number_PIC: text }),
        name: "Phone_number_PIC",
        state: this.state.Phone_number_PIC,
        label: "P.I.C Phone number",
        type: "text",
        helpBlock: "Person in charge phone number",
      },
      {
        id: 3,
        onChange: (text) => this.setState({ Phone_number: text }),
        name: "Phone_number",
        state: this.state.Phone_number,
        label: "Store phone number",
        type: "text",
        required: true,
        helpBlock:
          "The official phone number of the store, which buyers can reach when trying to make order",
      },
      {
        id: 4,
        onChange: (text) => this.setState({ email: text }),
        name: "email",
        state: this.state.email,
        label: "Store's email address",
        type: "text",
        helpBlock:
          "Store's official email address, Will be visible to all visitors",
      },
      {
        id: 5,
        onChange: (text) => this.setState({ website: text }),
        name: "website",
        state: this.state.website,
        label: "Website",
        type: "text",
        helpBlock: "Store's website",
      },
    ];
    const { savedData } = this.state;
    return (
      <>
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
        <div className="row p-4">
          <Form fluid>
            <Message type={this.state.type} description={this.state.Message} />
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
                <Steps.Item title="Contact Details" />
                <Steps.Item title="Registration and verification" />
                <Steps.Item title="Files and documentation" />
                <Steps.Item title="Bank account and wallet setup" />
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
                        <ControlLabel>{inputField.label}</ControlLabel>
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
                                State: event.target.value,
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
                                Country: event.target.value,
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
                {/* <StepOne /> */}
                {contactField.map((inputField) => (
                  <FormGroup key={inputField.id}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item
                        colspan={7}
                        style={{ justifyContent: "end" }}
                      >
                        <ControlLabel>{inputField.label}</ControlLabel>
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
                {/* <StepTwo /> */}
                {stepTwoField.map((inputField) => (
                  <FormGroup key={inputField.id}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item
                        colspan={7}
                        style={{ justifyContent: "end" }}
                      >
                        <ControlLabel>{inputField.label}</ControlLabel>
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
                  display: step === 3 ? "block" : "none",
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
              </Panel>
              <Panel
                style={{
                  display: step === 4 ? "block" : "none",
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
                        <ControlLabel>{inputField.label}</ControlLabel>
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
                  {this.state.nextBtn}
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
      </>
    );
  }
}
