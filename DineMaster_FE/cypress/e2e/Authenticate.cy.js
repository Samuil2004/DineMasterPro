import {
  mockActiveCartCheck,
  mockActiveOrderCheck,
  mockGetAppetizersForCustomerMenu,
} from "../support/mocks";

describe("Customer Login Flow - Success", () => {
  beforeEach(() => {
    mockGetAppetizersForCustomerMenu();
    mockActiveCartCheck();
    mockActiveOrderCheck();
  });
  it("should log in the user successfully", () => {
    cy.customerLogin();
    cy.url().should("not.include", "/login");
    cy.url().should("include", "/menu");
  });
});

describe("Login Page - Invalid Credentials", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display an error message when logging in with wrong credentials", () => {
    cy.get("input[name='usernameInput']").type("wrong@gmail.com").blur();
    cy.get("input[name='passwordInput']").type("Invalid1234$").blur();

    cy.get('[data-cy="login-button"]').click();
    cy.url().should("include", "/login");
  });
});

describe("Login Page - Provided credentials have incorrect format", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display an error message when logging in with wrong credentials", () => {
    cy.get("input[name='usernameInput']").type("nonRealEmail").blur();
    cy.get("input[name='passwordInput']").type("Invalid1234$").blur();

    cy.get('[data-cy="username-input-error"]').should(
      "have.text",
      "Invalid email format"
    );
  });
});

describe("Admin Login Flow - Success", () => {
  it("should log in the user successfully", () => {
    cy.adminLogin();
    cy.url().should("not.include", "/login");
    cy.url().should("include", "/admin/menu");
  });
});
