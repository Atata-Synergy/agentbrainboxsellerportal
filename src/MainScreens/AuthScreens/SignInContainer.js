import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./SignUp.css";
import { connect } from "react-redux";
import {
  FlexboxGrid,
  Container,
  Header,
  Navbar,
  PanelControlLabel,
  FormControl,
  FormGroup,
  Panel,
  Content,
  Footer,
  ControlLabel,
  ButtonToolbar,
  Form,
  Schema,
  Divider,
  Message,
  Nav,
  Dropdown,
  Icon,
} from "rsuite";
import { Button } from "semantic-ui-react";
import { login } from "../../Actions/loginAction";
const formFields = [
  {
    id: "1",
    name: "email",
    label: "Email Address",
    type: "email",
  },
  {
    id: "2",
    name: "password",
    label: "Password",
    type: "password",
  },
];

function TextField(props) {
  const { name, label, accepter, type, ...rest } = props;
  return (
    <>
      <FormGroup>
        <ControlLabel> {label} </ControlLabel>
        <FormControl name={name} accepter={accepter} {...rest} type={type} />
      </FormGroup>
    </>
  );
}

class SignInContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        email: "",
        password: "",
        loading: false,
      },
      formError: {},
      Message: "",
      type: "",
      showTokenError: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    /**
     * Get data from history prop
     */

    if (this.props.history.location.state !== undefined) {
      if (this.props.history.location.state.message) {
        this.setState({
          Message: this.props.history.location.state.message,
          type: this.props.history.location.state.type || "info",
          showTokenError:
            this.props.history.location.state.showTokenError || false,
        });
      }
    }
  }
  UNSAFE_componentWillReceiveProps(props){
    //We determine where we redirect base on the merchant's registration status
    if (props.user.id) {
      props.history.push("/seller");
    }
  }
  async handleSubmit() {
    this.setState({ loading: true });
    const { formValue, errorMessage } = this.state;
    if (!this.form.check()) {
      console.error("Form Error");
      this.setState({
        Message: "Form has errors",
        type: "error",
      });
      return;
    }
    this.props.login(formValue);
  }

  render() {
    const { StringType, NumberType } = Schema.Types;
    const model = Schema.Model({
      email: StringType()
        .isEmail("Please enter a valid email address.")
        .isRequired("This field is required."),
      password: StringType().isRequired("This field is required."),
    });
    const { formError, formValue } = this.state;
    return (
      <Container>
        <div className="show-fake-browser login-page p-4 m-4 container-fluid">
          <div className="container" style={{ marginTop: "2%" }}>
            <div className="row">
              <div className="col-xs-12 col-md-4">
                <h1
                  style={{
                    fontSize: "90px",
                    color: "#fff",
                    margin: 15,
                    alignSelf: "center",
                    lineHeight: "80px",
                  }}
                >
                  Let 's give you <span>Africa</span>
                </h1>
              </div>
              <div className="col-xs-12 col-md-8">
                <Panel
                  header={<h3> Sign In </h3>}
                  bordered
                  style={{
                    display: "inline-block",
                    alignSelf: "bottom",
                    backgroundColor: "#fff",
                  }}
                >
                  {this.props.loginError && (
                    <Message
                      showIcon
                      type="error"
                      description={this.props.loginError}
                    />
                  )}
                  <Form
                    ref={(ref) => (this.form = ref)}
                    onChange={(formValue) => {
                      this.setState({ formValue });
                    }}
                    onCheck={(formError) => {
                      this.setState({ formError });
                    }}
                    formValue={formValue}
                    model={model}
                  >
                    {formFields.map((textField) => (
                      <TextField
                        key={textField.id}
                        name={textField.name}
                        label={textField.label}
                        type={textField.type}
                      />
                    ))}
                    <Button
                      color="google plus"
                      fluid
                      onClick={this.handleSubmit}
                      loading={this.props.isLoggingIn}
                    >
                      <Icon name="lock" /> Sign in
                    </Button>
                    <p className="mt-4 text-center">
                      Don 't have an account?
                      <Link
                        to={{
                          pathname: "/register",
                          state: this.state,
                        }}
                      >
                        Create an account
                      </Link>
                    </p>
                  </Form>
                  <Divider />
                  <div
                    className="mx-auto d-flex"
                    style={{ justifyContent: "center" }}
                  >
                    <Button
                      circular
                      color="facebook"
                      icon="facebook"
                      className="m-1"
                    />
                    <Button
                      circular
                      color="twitter"
                      icon="twitter"
                      className="m-1"
                    />
                    <Button
                      circular
                      color="linkedin"
                      icon="linkedin"
                      className="m-1"
                    />
                    <Button
                      circular
                      color="google plus"
                      icon="google plus"
                      className="m-1"
                    />
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggingIn: state.auth.isLoggingIn,
  user: state.auth.user,
  loginError: state.auth.loginError,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
