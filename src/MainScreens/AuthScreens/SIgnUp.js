import React from "react";
import { useHistory } from "react-router-dom";
import SignUpContainer from "./SignUpContainer";
import HomeNav from "../HomePage/HomeNav";
import HomeFooter from "../HomePage/HomeFooter";
import "./SignUp.css";
import NavBarHeader from "../../Components/NavBarHeader";
import Footer from "../../Components/Footer";

export default function SignUp() {
  let history = useHistory();

  return (
    <>        <NavBarHeader/>
      <div className="auth-body">
        <SignUpContainer history={history} />
      </div>      <Footer />
    </>
  );
}
