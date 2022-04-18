const timeout = 100000;

beforeEach(() => {
  cy.fixture('data').then((data) => {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.usernameNotExist = data.usernameNotExist;
    this.usernameExist = data.usernameExist;
    this.testPassword = data.testPassword;
    this.mismatchPassword = data.mismatchPassword;
    this.lessThanMinimumPassword = data.lessThanMinimumPassword;
    this.password = data.password;
  });
});

/**
 * Why is the Login feature important?
 *
 * It is important that a user has proper authorization in order to access protected data.
 * This impact of unauthorized access to user's data here would be colossal to both the user and the stakeholders
 */

describe('Gmail - Login', () => {
  it('should display valid error message on login with invalid details', () => {
    cy.visit('/');

    cy.get('#Email').type(`${this.usernameExist}@gmail.com`);
    cy.get('#next').click();
    cy.get('#password').type(this.testPassword);
    cy.get('#submit').click();

    cy.contains(
      'Wrong password. Try again or click Forgot password to reset it.'
    ).should('be.visible');
  });

  it('should not display error message on login with valid details', () => {
    cy.visit('/');

    cy.get('#Email').type(`${this.usernameExist}@gmail.com`);
    cy.get('#next').click();
    cy.get('#password').type(this.password);
    cy.get('#submit').click();

    cy.get('#submit', { timeout }).should('not.exist');
  });
});

/**
 * Why is the Create Account feature important?
 *
 * This is the basis for getting access to the features and services offered by Gmail.
 * The basic user data that is requested need follow some basic security policy in order to
 * protect the user and prevent reassigning of single gmail identity to multiple users.
 */

describe('Gmail - Create Account', () => {
  it('should display valid errors on submit form with empty fields', () => {
    cy.goToSignUpPage();

    cy.findByRole('button', { name: 'Next' }).click();

    cy.contains('Enter first name and surname').should('be.visible');
    cy.contains('Choose a Gmail address').should('be.visible');
    cy.contains('Enter a password').should('be.visible');
  });

  it('should display valid error on sign up with username that exists', () => {
    cy.goToSignUpPage();

    cy.get('#username').type(`${this.usernameExist}{enter}`);
    cy.contains('That username is taken. Try another.').should('be.visible');
  });

  it('should display valid error on sign up with less than 8 character passwords', () => {
    cy.goToSignUpPage();

    cy.fillSignUpForm(
      this.firstName,
      this.lastName,
      this.usernameNotExist,
      this.lessThanMinimumPassword,
      this.lessThanMinimumPassword
    );

    cy.findByRole('button', { name: 'Next' }).click();

    cy.contains('Use 8 characters or more for your password').should(
      'be.visible'
    );
  });

  it('should display valid error on use mismatching passwords', () => {
    cy.goToSignUpPage();

    cy.fillSignUpForm(
      this.firstName,
      this.lastName,
      this.usernameNotExist,
      this.testPassword,
      this.mismatchPassword
    );

    cy.findByRole('button', { name: 'Next' }).click();

    cy.contains('Those passwords didn’t match. Try again.').should(
      'be.visible'
    );
  });

  it('should display verify phone number step on enter valid details in first step', () => {
    cy.goToSignUpPage();

    cy.fillSignUpForm(
      this.firstName,
      this.lastName,
      this.usernameNotExist,
      this.testPassword,
      this.testPassword
    );

    cy.findByRole('button', { name: 'Next' }).click();
    cy.contains('Verifying your phone number', { timeout }).should(
      'be.visible'
    );

    cy.selectCountryCode('Nigeria (+234)');
    cy.get('#phoneNumberId').type('08156098');
    cy.findByRole('button', { name: 'Next' }).click();
    cy.contains('This phone number format is not recognised.', {
      timeout,
    }).should('be.visible');
  });
});
