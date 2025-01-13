import React, { useState } from "react";
import "./App.css";
import "h8k-components";
import PaymentValidation from "./components/PaymentValidation";

const title = "Payment Validation";

const App = () => {
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-row justify-content-center mt-30">
        <PaymentValidation />
      </div>
    </div>
  );
};

export default App;
