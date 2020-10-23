import React from "react";
import { Steps } from "rsuite";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateProductContainer from "./CreateProductContainer";

export default function CreateProduct() {
  return (
    <>
     <CreateProductContainer />
    </>
  );
}