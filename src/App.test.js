import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

const TEST_IDS = {
  cardNumberInput: "cardNumberInput",
  nameInput: "nameInput",
  yearInput: "yearInput",
  monthInput: "monthInput",
  cvvInput: "cvvInput",
  submitButton: "submitButton",
  numberInputError: "numberInputError",
  nameInputError: "nameInputError",
  monthInputError: "monthInputError",
  yearInputError: "yearInputError",
  cvvInputError: "cvvInputError",
};

const generateNumber = (len) => {
  let number = "";
  for (let i = 0; i < len; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
};

describe("Payment Validation", () => {
  let getByTestId;
  let queryByTestId;
  let cardNumberInput;
  let nameInput;
  let yearInput;
  let monthInput;
  let cvvInput;
  let submitButton;
  let numberInputError;
  let nameInputError;
  let monthInputError;
  let yearInputError;
  let cvvInputError;

  beforeEach(() => {
    const app = render(<App />);
    getByTestId = app.getByTestId;
    queryByTestId = app.queryByTestId;
    cardNumberInput = getByTestId(TEST_IDS.cardNumberInput);
    numberInputError = queryByTestId(TEST_IDS.numberInputError);
    nameInput = getByTestId(TEST_IDS.nameInput);
    nameInputError = queryByTestId(TEST_IDS.nameInputError);
    monthInput = getByTestId(TEST_IDS.monthInput);
    monthInputError = queryByTestId(TEST_IDS.monthInputError);
    yearInput = getByTestId(TEST_IDS.yearInput);
    yearInputError = queryByTestId(TEST_IDS.yearInputError);
    cvvInput = getByTestId(TEST_IDS.cvvInput);
    cvvInputError = queryByTestId(TEST_IDS.cvvInputError);
    submitButton = queryByTestId(TEST_IDS.submitButton);
  });

  afterEach(() => {
    cleanup();
  });

  it("Should have the correct input type for all fields", () => {
    cardNumberInput = getByTestId(TEST_IDS.cardNumberInput);
    nameInput = getByTestId(TEST_IDS.nameInput);
    monthInput = getByTestId(TEST_IDS.monthInput);
    yearInput = getByTestId(TEST_IDS.yearInput);
    cvvInput = getByTestId(TEST_IDS.cvvInput);
    expect(cardNumberInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(monthInput).toHaveAttribute("type", "number");
    expect(yearInput).toHaveAttribute("type", "number");
    expect(cvvInput).toHaveAttribute("type", "number");
  });
  it("Should validate the card number correctly", () => {
    let correctCardNumber = generateNumber(16);
    fireEvent.change(cardNumberInput, {
      target: {
        value: correctCardNumber,
      },
    });
    numberInputError = queryByTestId(TEST_IDS.numberInputError);
    expect(numberInputError).toBeNull();
    let wrongCardNumber = correctCardNumber;
    wrongCardNumber.slice(14);
    wrongCardNumber += "Z";
    fireEvent.change(cardNumberInput, {
      target: {
        value: wrongCardNumber,
      },
    });
    numberInputError = queryByTestId(TEST_IDS.numberInputError);
    expect(numberInputError).not.toBeNull();
    wrongCardNumber = wrongCardNumber.slice(14);
    wrongCardNumber += "12345";
    fireEvent.change(cardNumberInput, {
      target: {
        value: wrongCardNumber,
      },
    });
    numberInputError = queryByTestId(TEST_IDS.numberInputError);
    expect(numberInputError).not.toBeNull();
  });

  it("Should validate the name correctly", () => {
    let correctName = "John";
    fireEvent.change(nameInput, {
      target: {
        value: correctName,
      },
    });
    nameInputError = queryByTestId(TEST_IDS.nameInputError);
    expect(nameInputError).toBeNull();
    let wrongName = correctName;
    wrongName += "1#";
    fireEvent.change(nameInput, {
      target: {
        value: wrongName,
      },
    });
    nameInputError = queryByTestId(TEST_IDS.nameInputError);
    expect(nameInputError).not.toBeNull();
    fireEvent.change(nameInput, {
      target: {
        value: "",
      },
    });
    nameInputError = queryByTestId(TEST_IDS.nameInputError);
    expect(nameInputError).not.toBeNull();
  });
  it("Should validate the month correctly", () => {
    let correctMonth = "10";
    fireEvent.change(monthInput, {
      target: {
        value: correctMonth,
      },
    });
    monthInputError = queryByTestId(TEST_IDS.monthInputError);
    expect(monthInputError).toBeNull();
    correctMonth = "07";
    fireEvent.change(monthInput, {
      target: {
        value: correctMonth,
      },
    });
    monthInputError = queryByTestId(TEST_IDS.monthInputError);
    expect(monthInputError).toBeNull();

    let wrongMonth = "123";
    fireEvent.change(monthInput, {
      target: {
        value: wrongMonth,
      },
    });
    monthInputError = queryByTestId(TEST_IDS.monthInputError);
    expect(monthInputError).not.toBeNull();
    fireEvent.change(monthInput, {
      target: {
        value: "",
      },
    });
    monthInputError = queryByTestId(TEST_IDS.monthInputError);
    expect(monthInputError).not.toBeNull();
  });
  it("Should validate the year correctly", () => {
    const d = new Date();
    for (let i = 0; i < 4; i++) {
      let year = d.getFullYear();
      year += Math.floor(Math.random() * 4);
      fireEvent.change(yearInput, {
        target: {
          value: year.toString(),
        },
      });
      yearInputError = queryByTestId(TEST_IDS.yearInputError);
      expect(yearInputError).toBeNull();
    }
    for (let i = 0; i < 4; i++) {
      let year = d.getFullYear();
      year = year - Math.floor(Math.random() * 10) - 1;
      fireEvent.change(yearInput, {
        target: {
          value: year.toString(),
        },
      });
      yearInputError = queryByTestId(TEST_IDS.yearInputError);
      expect(yearInputError).not.toBeNull();
    }

    let wrongYear = "";
    fireEvent.change(yearInput, {
      target: {
        value: wrongYear,
      },
    });
    yearInputError = queryByTestId(TEST_IDS.yearInputError);
    expect(yearInputError).not.toBeNull();
  });
  it("Should validate the CVV correctly", () => {
    let correctCVV = generateNumber(3);
    fireEvent.change(cvvInput, {
      target: {
        value: correctCVV,
      },
    });
    cvvInputError = queryByTestId(TEST_IDS.cvvInputError);
    expect(cvvInputError).toBeNull();
    let CVV = correctCVV + "5";
    fireEvent.change(cvvInput, {
      target: {
        value: CVV,
      },
    });
    cvvInputError = queryByTestId(TEST_IDS.cvvInputError);
    expect(cvvInputError).not.toBeNull();
    fireEvent.change(cvvInput, {
      target: {
        value: "",
      },
    });
    cvvInputError = queryByTestId(TEST_IDS.cvvInputError);
    expect(cvvInputError).not.toBeNull();
  });

  it("Submit button should only be enabled if all validations are complete", () => {
    expect(submitButton).toBeDisabled();
    const data = [
      generateNumber(16),
      "Sherlock",
      "08",
      "2026",
      generateNumber(3),
    ];
    const fields = [
      cardNumberInput,
      nameInput,
      monthInput,
      yearInput,
      cvvInput,
    ];
    for (let i = 0; i < data.length; i++) {
      fireEvent.change(fields[i], {
        target: {
          value: data[i],
        },
      });
      submitButton = queryByTestId(TEST_IDS.submitButton);
      if (i == data.length - 1) {
        expect(submitButton).not.toBeDisabled();
      } else {
        expect(submitButton).toBeDisabled();
      }
    }
  });
});
