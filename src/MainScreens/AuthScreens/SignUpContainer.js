import React, { Component } from "react";

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
} from "rsuite";
import { Button } from "semantic-ui-react";

import { registerUser } from "../../Actions/registerAction";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const formFields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
  },
  {
    name: "state",
    label: "State",
    type: "text",
  },
  {
    name: "city",
    label: "city",
    type: "text",
  },
  {
    name: "address",
    label: "Street number, Landmark ",
    type: "text",
  },

  {
    name: "country",
    label: "country",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    type: "password",
  },
];

function TextField(props) {
  const { name, label, accepter, type, ...rest } = props;
  return (
    <FormGroup>
      <ControlLabel> {label} </ControlLabel>
      <FormControl style={{padding: '10px'}}  name={name} accepter={accepter} {...rest} type={type} />
    </FormGroup>
  );
}

class SignUpContainer extends Component {
  constructor() {
    super();
    this.state = {
      formValue: {
        name: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        address: "",
        password: "",
        confirm_password: "",
        loading: false,
      },
      formError: {},
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { formValue } = this.state;
    console.log(formValue);
    if (!this.form.check()) {
      console.error("Form Error");
      return;
    }

    this.props.registerUser(formValue);
  }

  UNSAFE_componentWillReceiveProps(props) {
    props.user &&
      props.user.id &&
      this.props.history.push("/seller/create/Account");
    props.registrationError &&  props.registrationError.errors &&
      this.setState({ errors: { ...props.registrationError.errors } });
  }
  render() {
    const { StringType, NumberType } = Schema.Types;
    const model = Schema.Model({
      name: StringType().isRequired("This field is required."),
      email: StringType()
        .isEmail("Please enter a valid email address.")
        .isRequired("This field is required."),
      phone: StringType().isRequired("This field is required."),
      country: StringType().isRequired("This field is required."),
      state: StringType().isRequired("This field is required."),
      city: StringType().isRequired("This field is required."),
      address: StringType().isRequired("This field is required."),
      password: StringType()
        .minLength(6, "Password must be more than 6 characters")
        .maxLength(50, "Your password should not be more than 50 characters")
        .addRule((value, data) => {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value);
        }, "Password must have an Uppercase character, a lower case character and at least 1 numeric character"),
      confirm_password: StringType().addRule((value, data) => {
        // console.log(data.password);
        if (value !== data.password) {
          return false;
        }
        return true;
      }, "Password doesn't match"),
    });
    const { formError, formValue } = this.state;
    const { errors } = this.state;
    return (
      <div className="p-4 m-4 container-fluid">
        <Container>
          <div className="row">
            <div className="mx-auto">
              <Panel
                header={<h3> Create Account </h3>}
                bordered
                style={{
                  display: "inline-block",
                  width: "600px",
                  alignSelf: "bottom",
                  backgroundColor: "#fff",
                }}
              >
                {errors.email && (
                  <Message
                    type="error"
                    description={errors.email[0]}
                    style={{ margin: 10 }}
                  />
                )}
                {errors.passwordMatchError && (
                  <Message
                    type="error"
                    description={errors.passwordMatchError}
                    style={{ margin: 10 }}
                  />
                )}
                <Form
                  ref={(ref) => (this.form = ref)}
                  onSubmit={this.handleSubmit}
                  onChange={(formValue) => {
                    this.setState({ formValue });
                  }}
                  onCheck={(formError) => {
                    this.setState({ formError });
                  }}
                  formValue={formValue}
                  model={model}
                  fluid
                >
                  {formFields.map((textField) => (
                    <TextField
                    
                      name={textField.name}
                      label={textField.label}
                      type={textField.type}
                    />
                  ))}
                  <ButtonToolbar>
                    <Button
                      color="google plus"
                      type="submit"
                      fluid
                      size="big"
                      loading={this.props.isRegistering}
                    >
                      Submit
                    </Button>
                  </ButtonToolbar>
                  <span className="mt-4 p-2">
                    Do you have an account already?
                    <Link to="/login">Login </Link>
                  </span>
                </Form>
              </Panel>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isRegistering: state.auth.isRegistering,
  registrationError: state.auth.registrationError,
});

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
