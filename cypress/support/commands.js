import '@testing-library/cypress/add-commands';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('goToSignUpPage', () => {
  cy.visit('/');

  cy.findByText('Create account', { timeout: 100000 }).click();
  cy.contains('Create your Google Account', { timeout: 100000 }).should(
    'be.visible'
  );
});

Cypress.Commands.add('selectCountryCode', (countryWithCode) => {
  cy.get('#countryList').click();
  cy.findAllByRole('listbox')
    .eq(0)
    .within(() => {
      cy.contains(countryWithCode).eq(0).click({ force: true });
    });
});

Cypress.Commands.add(
  'fillSignUpForm',
  (firstName, lastName, username, password, confirmPassword) => {
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#username').type(username);
    cy.get('[name="Passwd"').type(password);
    cy.get('[name="ConfirmPasswd"').type(confirmPassword);
  }
);
