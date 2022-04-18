# Cypress Gmail E2E Tests

Herein lies a few test cases for the main functionality of Gmail - Login and Sign Up.

## Installation

Clone the project.

Then run the command below from the project root directory.

```bash
npm install
```

## Run Tests

To run the tests, update the data.json file with a valid Gmail username in the JSON field "usernameExist" and a valid Gmail password in the JSON field "password".

Then run the tests via Cypress Studio using:

```bash
npx cypress open
```

or run via terminal using:

```bash
npm run cypress:test
```

## Issues

You may encounter the error "verification timed out after 30000 milliseconds" when running the tests for the first time. Navigate to node_modules\cypress\lib\tasks\verify.js, search for VERIFY_TEST_RUNNER_TIMEOUT_MS and change it from 30000 (default) to 100000. Then rerun the project using "npx cypress open"
