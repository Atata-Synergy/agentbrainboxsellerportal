import React from "react";
import logo from "./logo.svg";
import "./Styles/custom.css";
import "./Styles/bootstrap.min.css";
import AppNavigator from "./MainScreens/EntryPoint.js/AppNavigator";
import "rsuite/dist/styles/rsuite-default.css";
import { Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { Provider } from "react-redux";
import store from "./Helpers/Store";
import "./Assets/css/bootstrap.min.css"
import "./Assets/css/slick.css"
import "./Assets/css/slick-theme.css"
import "./Assets/css/nouislider.min.css"
import "./Assets/css/font-awesome.min.css"
import "./Assets/css/style.css"
import NavBarHeader from "./Components/NavBarHeader";
import Footer from "./Components/Footer";
// const Routes = {
//   Home: Index,
//   login: SignIn,
//   SignUpUser: SignUp,
//   SignUpSeller: CreateSeller,
//   dashboard: Home,
// };
// const MyNavigator = createSwitchNavigator(Routes);

// const MainPage = createBrowserApp(MyNavigator);

function App() {
  return (
    <>
    <Provider store={store}>
      <div className=" h-100">
        {/* <Widget title="Chat with Support" /> */}
        <AppNavigator />
      </div>
    </Provider>
      </>
  );
}

export default App;
