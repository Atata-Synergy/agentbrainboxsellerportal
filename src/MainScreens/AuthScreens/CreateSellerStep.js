import React, { useState, useEffect } from "react";
import HomeFooter from "../HomePage/HomeFooter";
import HomeNav from "../HomePage/HomeNav";
import {
  Step,
  Form,
  Input,
  Dropdown,
  Flag,
  Label,
  Button,
  Icon,
  Transition,
} from "semantic-ui-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CreateSeller from "./CreateSeller";
import "./CreateSellerStep.css";
import { useHistory } from "react-router-dom";
import SellerNotificationColThree from "../GeneralNotification/SellerNotificationColThree";
import { Message } from "rsuite";

export default function CreateSellerStep(props) {
  const history = useHistory();
  const [phone, setPhone] = useState();
  const [visible, setVisible] = useState(true);
  const [animation, setAnimation] = useState("drop");
  const [duration, setDuration] = useState(800);
  const [verifyPhone, setVerifyPhone] = useState(true);
  const [verifyPhoneCompleted, setVerifyPhoneCompleted] = useState(false);
  const [createStore, setCreateStore] = useState(false);
  const [createStoreCompleted, setCreateStoreCompleted] = useState(false);
  console.log(history);
  console.log(props);

  const steps = [
    {
      key: "UserAccount",
      icon: "user",
      title: "Create User Account",
      description: "Create User Account",
      completed: true,
    },
    {
      key: "VerifyPhone",
      active: verifyPhone,
      completed: verifyPhoneCompleted,
      icon: "phone",
      title: "Confirm Phone number",
      description: "Verify your Phone number",
    },
    {
      key: "CreateStore",
      icon: "warehouse",
      title: "Create Atata Store",
      active: createStore,
      completed: createStoreCompleted,
      description: "Create your online Atata Store",
    },
  ];
  const options = [
    { key: "+234", text: "+234", value: "+234" },
    { key: "+232", text: "+232", value: "+232" },
    { key: "+44", text: "+44", value: "+44" },
  ];

  // useEffect(() => {
  //   if (history.location.state.user === undefined) {
  //     history.push("/login");
  //   }
  // }, [history]);
  //   if (user) {
  //     const { user } = history.location.state;
  //   }
  return (
    <div className="container-fluid bg-light">
      {console.log(history)}
      <HomeNav />
      <div className="row mb-4">
        <div className="mx-auto mt-4" style={{ justifyContent: "center" }}>
          <Step.Group items={steps} />
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="mb-4 col-xs-12 col-sm-12 col-md-9 bg-white">
            {/* <p className="lead p-4">
              {history.location.state && (
                <h1>
                  {" "}
                  hi {history.location.state.user.name} welcome to Atata57
                </h1>
              )}
            </p> */}
            <div
              className="row"
              //   style={{ justifyContent: "center", margin: "50px 0" }}
            >
              <Transition.Group animation={animation} duration={duration}>
                {visible ? (
                  <Form
                    className=" h-100 mx-auto  center"
                    style={{ justifyContent: "center", margin: "50px 0" }}
                  >
                    <Form.Field>
                      {history.location.state
                        ? history.location.state.message && (
                            <Message
                              description={history.location.state.message}
                              type="info"
                            />
                          )
                        : null}
                      <label className="mt-4 mb-4">
                        Kindly Verify your phone number, input your phone number
                        <br />
                        <small>
                          {" "}
                          <Icon name="info circle" className="text-info" />{" "}
                          Ensure your phone number can receive text messages
                        </small>
                      </label>
                      <Button as="div" labelPosition="left">
                        <Label as="div" basic>
                          <PhoneInput
                            disabled
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={setPhone}
                          />
                        </Label>
                        <Button
                          primary
                          onClick={() => {
                            setVisible(false);
                            setVerifyPhone(false);
                            setCreateStore(true);
                            setVerifyPhoneCompleted(true);
                          }}
                        >
                          Verify
                        </Button>
                      </Button>
                    </Form.Field>
                  </Form>
                ) : (
                  <CreateSeller />
                )}
              </Transition.Group>
            </div>
          </div>
          <div className="col-md-3">
            <SellerNotificationColThree />
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

// const VerifyNumber = () => {
//   const [phone, setPhone] = useState();

//   return (
//     <Form
//       className=" h-100 mx-auto  center"
//       style={{ justifyContent: "center" }}
//     >
//       <Form.Field>
//         <label className="mt-4 mb-4">
//           Kindly Verify your phone number, input your phone number
//           <br />
//           <small>
//             {" "}
//             <Icon name="info circle" className="text-info" /> Ensure your phone
//             number can receive text messages
//           </small>
//         </label>
//         <Button as="div" labelPosition="left">
//           <Label as="div" basic>
//             <PhoneInput
//               placeholder="Enter phone number"
//               value={phone}
//               onChange={setPhone}
//             />
//           </Label>
//           <Button primary>Verify</Button>
//         </Button>
//       </Form.Field>
//     </Form>
//   );
//   {
//     /* <CreateSeller /> */
//   }
// };
