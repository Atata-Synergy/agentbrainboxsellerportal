import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import HomeNav from "../HomePage/HomeNav";
import "./SignUp.css";
import HomeFooter from "../HomePage/HomeFooter";
import SignInContainer from './SignInContainer';
import NavBarHeader from '../../Components/NavBarHeader';
import Footer from '../../Components/Footer';

export const SignIn = () => {
  const history = useHistory()
  return (
    <>        <NavBarHeader />
      <div className="auth-body">
        <SignInContainer history={history} />{" "}
      </div>
      {/* <HomeFooter /> */}      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  
})
export default connect(mapStateToProps, null)(SignIn)
