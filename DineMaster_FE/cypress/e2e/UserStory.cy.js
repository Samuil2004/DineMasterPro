import {
  mockLogin,
  mockActiveCartCheck,
  mockActiveOrderCheck,
  mockGetProfile,
  mockGetItemById,
  mockGetAppetizersForCustomerMenu,
  mockAddItemToCart,
  mockGetItemsInActiveCart,
  mockCreateItem,
  mockUploadImage,
  mockGetAppetizersForAdminMenu,
} from "../support/mocks";
import "cypress-file-upload";

describe("As a user I should be able to add an item to the basket with updated quantity", () => {
  let itemAdded = false;
  beforeEach(() => {
    mockLogin();
    mockActiveCartCheck(itemAdded);
    mockActiveOrderCheck();
    mockGetProfile();
    mockGetItemById();
    mockGetAppetizersForCustomerMenu();
    mockAddItemToCart(2, 99992, 99992);
    mockGetItemsInActiveCart(9999);
    cy.visit("/logIn");
  });
  it("should allow user to log in, select an item, increase quantity, and add to cart", () => {
    cy.customerLogin();
    cy.url().should("not.include", "/login");
    cy.url().should("include", "/menu");

    cy.get('[data-cy="button-select-1"]').click();

    cy.url().should("not.include", "/menu");
    cy.url().should("include", "/appetizer");

    cy.get('[data-cy="amount-label"]')
      .invoke("text")
      .then((initialAmountText) => {
        const initialAmount = parseInt(initialAmountText, 10);

        cy.wrap(initialAmount).as("initialAmount");
      });

    cy.get('[data-cy="button-increase-amount"]').click();

    cy.get("@initialAmount").then((initialAmount) => {
      cy.get('[data-cy="amount-label"]').should(
        "have.text",
        (initialAmount + 1).toString()
      );
    });

    cy.get('[data-cy="button-add-item-to-cart"]').click();
    itemAdded = true;
    mockActiveCartCheck(itemAdded);
  });
});

describe("As an unauthenticated user, when trying to access the profile page, I should be redirected to the login page", () => {
  beforeEach(() => {
    mockGetAppetizersForCustomerMenu();
    cy.visit("/menu");
  });

  it("should redirect the user to the login page", () => {
    cy.get('[data-cy="account-icon"]').click();
    cy.url().should("include", "/login");
  });
});

describe("As an authenticated user, when trying to access the profile page, I should be able to see all my personal data", () => {
  let itemAdded = false;

  beforeEach(() => {
    mockLogin();
    mockActiveCartCheck(itemAdded);
    mockActiveOrderCheck();
    mockGetProfile();
    mockGetItemById();
    mockGetAppetizersForCustomerMenu();
    mockAddItemToCart(2, 99992, 99992);
    mockGetItemsInActiveCart(9999);

    cy.visit("/logIn");
  });

  it("should be able to see all my personal data in the profile page", () => {
    cy.customerLogin();

    cy.get('[data-cy="account-icon"]').click();

    cy.url().should("include", "/profile");

    cy.get('[data-cy="first-name-input"]').should(
      "have.value",
      "TestFirstName"
    );
    cy.get('[data-cy="last-name-input"]').should("have.value", "TestLastName");
    cy.get('[data-cy="username-input"]').should(
      "have.value",
      "endToEnd@test.com"
    );
    cy.get('[data-cy="phone-number-input"]').should(
      "have.value",
      "+31878787864"
    );
    cy.get('[data-cy="country-input"]').should("have.value", "Netherlands");
    cy.get('[data-cy="city-input"]').should("have.value", "Eindhoven");
    cy.get('[data-cy="postal-code-input"]').should("have.value", "5612MA");
    cy.get('[data-cy="street-input"]').should("have.value", "Rachelsmolen 1");
  });
});

describe("As an admin I should be able to add new items to the menu", () => {
  beforeEach(() => {
    mockCreateItem("appetizer");
    mockUploadImage();
    mockGetAppetizersForAdminMenu();
  });

  it("should be able to add a new appetizer to the menu", () => {
    cy.adminLogin();
    cy.get('[data-cy="button-select-manage-items"]').click();
    cy.get('[data-cy="button-select-add-item"]').click();
    cy.get('[data-cy="item-name-input"]').type("Test Appetizer endtoend");
    cy.get('[data-cy="item-ingredients-input"]').type(
      "test,appetizer,ingredients"
    );

    cy.get('[data-cy="item-price-input"]').type("10.5");
    cy.get('[data-cy="item-image-input"]').attachFile(
      "peperoniPizzaCypress.jpg"
    );

    cy.get('[data-cy="button-create-item"]').click();
  });
});

describe("As a user I can not apply any changes to my profile, unless I have confirmed them with my account password", () => {
  let itemAdded = false;

  beforeEach(() => {
    mockLogin();
    mockActiveCartCheck(itemAdded);
    mockActiveOrderCheck();
    mockGetProfile();
    mockGetItemById();
    mockGetAppetizersForCustomerMenu();
    mockAddItemToCart(2, 99992, 99992);
    mockGetItemsInActiveCart(9999);
    mockGetAppetizersForAdminMenu();

    cy.visit("/logIn");
  });

  it("should be able to see all my personal data in the profile page", () => {
    cy.customerLogin();

    cy.get('[data-cy="account-icon"]').click();

    cy.url().should("include", "/profile");

    cy.get('[data-cy="first-name-input"]').type("Updated Name");

    cy.get('[data-cy="button-click-apply-profile-changes"]').click();

    cy.get('[data-cy="password-input-validation"]').should(
      "have.text",
      "This field is required"
    );
    cy.get('[data-cy="password-confirmation-input-validation"]').should(
      "have.text",
      "This field is required"
    );
  });
});

describe("As an admin I should not be able to add a new item to the menu that has a price less than 0", () => {
  beforeEach(() => {
    mockCreateItem("appetizer");
    mockUploadImage();
    mockGetAppetizersForAdminMenu();
  });

  it("should be able to add a new appetizer to the menu", () => {
    cy.adminLogin();
    cy.get('[data-cy="button-select-manage-items"]').click();
    cy.get('[data-cy="button-select-add-item"]').click();
    cy.get('[data-cy="item-name-input"]').type("Test Appetizer endtoend");
    cy.get('[data-cy="item-ingredients-input"]').type(
      "test,appetizer,ingredients"
    );

    cy.get('[data-cy="item-price-input"]').type("-2.50");

    cy.get('[data-cy="item-price-validation"]').should(
      "have.text",
      "Must be at least 0"
    );
  });
});

describe("As an admin I should not be able to add a new item to the menu that has a name containing different from alphabetical characters", () => {
  beforeEach(() => {
    mockCreateItem("appetizer");
    mockUploadImage();
    mockGetAppetizersForAdminMenu();
  });

  it("should be able to add a new appetizer to the menu", () => {
    cy.adminLogin();
    cy.get('[data-cy="button-select-manage-items"]').click();
    cy.get('[data-cy="button-select-add-item"]').click();
    cy.get('[data-cy="item-name-input"]').type("Test Appetizer 444");

    cy.get('[data-cy="item-name-input-validation"]').should(
      "have.text",
      "Alphabetical characters only"
    );
  });
});
