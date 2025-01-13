import React, { useState } from "react";
import "./PaymentValidation.css";

const PaymentValidation = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const currentYear = new Date().getFullYear();
    const newErrors = {};
    
    if (!cardNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be exactly 16 digits.";
    }

    if (!cardHolderName) {
      newErrors.cardHolderName = "Cardholder name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(cardHolderName)) {
      newErrors.cardHolderName = "Cardholder name must contain only letters.";
    }

    if (!expiryMonth) {
      newErrors.expiryMonth = "Expiry month is required.";
    } else if (!/^(0[1-9]|1[0-2])$/.test(expiryMonth)) {
      newErrors.expiryMonth = "Expiry month must be between 01 and 12.";
    }

    if (!expiryYear) {
      newErrors.expiryYear = "Expiry year is required.";
    } else if (!/^\d{4}$/.test(expiryYear) || expiryYear < currentYear || expiryYear > currentYear + 3) {
      newErrors.expiryYear = "Expiry year must be a valid year.";
    }


    if (!cvv) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle successful submission
      console.log("Form submitted successfully!");
    }
  };

  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">XXXXXXXXXXXXXXXX</p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">HOLDER NAME</span>
              <span className="debit-card-date">MM/YYYY</span>
              <span className="debit-card-cvv">CVV</span>
            </p>
          </div>
        </div>
        <section>
          <div className="pa-50">
            <form onSubmit={handleSubmit}>
              <div className="layout-column mb-15">
                <input
                  placeholder="Card Number"
                  data-testid="numberInput"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <p className="invalid-text" data-testid="numberInputError">
                  {errors.cardNumber}
                </p>
              </div>
              <div className="layout-column mb-15">
                <input
                  placeholder="Name On Card"
                  data-testid="nameInput"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                />
                <p className="invalid-text" data-testid="nameInputError">
                  {errors.cardHolderName}
                </p>
              </div>
              <div className="flex justify-content-around align-items-center">
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Month"
                    data-testid="monthInput"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                  />
                  <p className="invalid-text" data-testid="monthInputError">
                    {errors.expiryMonth}
                  </p>
                </div>
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Year"
                    data-testid="yearInput"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                  />
                  <p className="invalid-text" data-testid="yearInputError">
                    {errors.expiryYear}
                  </p>
                </div>
                <div className="layout-column mb-30">
                  <input
                    placeholder="CVV"
                    data-testid="cvvInput"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                  <p className="invalid-text" data-testid="cvvInputError">
                    {errors.cvv}
                  </p>
                </div>
              </div>
              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={Object.keys(errors).length > 0}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentValidation;
