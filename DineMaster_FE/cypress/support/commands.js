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

// cypress/support/commands.js

import {
  mockLogin,
  mockGetProfile,
  mockGetAppetizersForCustomerMenu,
} from "./mocks";
Cypress.Commands.add("adminLogin", () => {
  mockLogin(true);
  mockGetProfile();
  mockGetAppetizersForCustomerMenu();
  cy.visit("/login");

  cy.get('[data-cy="username-input"]').type("admin@admine.com").blur();
  cy.get('[data-cy="password-input"]').type("Tester1234$").blur();

  cy.get('[data-cy="login-button"]').click();

  cy.url().should("not.include", "/login");
  cy.url().should("include", "/admin/menu");
});

Cypress.Commands.add("customerLogin", () => {
  mockLogin();
  mockGetProfile();
  mockGetAppetizersForCustomerMenu();

  cy.visit("/logIn");
  cy.get('[data-cy="username-input"]').type("endToEnd@test.com").blur();
  cy.get('[data-cy="password-input"]').type("Tester1234$").blur();
  cy.get('[data-cy="login-button"]').click();

  cy.url().should("not.include", "/login");
  cy.url().should("include", "/menu");
});
