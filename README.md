# React: Payments Validation

## Environment

- React Version: 18.2.0
- Node Version: 18(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/Jf80TEVtYurbOdUpzvCjHg/43C43A02-B4D2-4AD6-832E-749C5547937C_2_0_a.gif)

## Functionality Requirements

The component should perform the following validations in the form:

- The card number input field should pass the following validations:

  - The field is required.
  - It should be a number consisting of exactly 16 digits.

- The cardholder name input field should pass the following validations:

  - The field is required.
  - The name should contain english alphabetic letters only.

- The expiration month input field should pass the following validations:

  - The field is required.
  - It should be a number consisting of exactly 2 digits with numbers in range of 01 to 12. (Denoting January to December)

- The expiration year input field should pass the following validations:

  - The field is required.
  - It should be an year number consisting of exactly 4 digits, which is greater than or equal to current year and the difference from current year should be maximum 3 years.

- The cvv/cvc input field should pass the following validations:

  - The field is required.
  - It should be a number consisting of exactly 3 digits.

- Initially, the submit button should be disabled. When either field is invalid, the submit button should be disabled.

- When all fields are valid and have been touched, the submit button should be enabled.

The following data-test-id attributes are required in the component for the tests to pass:

- The card number input: 'numberInput'
- The cardholder name input: 'nameInput'
- The expiration month input: 'monthInput'
- The expiration year input: 'yearInput'
- The cvv/cvc input: 'cvvInput'
- The submit button: 'submit-button'

- The p containing the error message for:
  - the card number input: 'numberInputError'
  - the cardholder name input: 'nameInputError'
  - the expiration month input: 'monthInputError'
  - the expiration year input: 'yearInputError'
  - the cvv/cvc input: 'cvvInputError'

Please note that the component has the above data-test-id attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.

## Project Specifications

**Read Only Files**

- src/App.test.js
- src/App.js

**Commands**

- run:

```bash
npm start
```

- install:

```bash
npm install
```

- test:

```bash
npm test
```
