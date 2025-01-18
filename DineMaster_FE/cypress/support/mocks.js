// cypress/support/mocks.js

export const mockLogin = (admin = false) => {
  cy.intercept("POST", "/auth/logIn", (req) => {
    if (admin) {
      expect(req.body).to.deep.equal({
        username: "admin@admine.com",
        password: "Tester1234$",
      });
    } else {
      expect(req.body).to.deep.equal({
        username: "endToEnd@test.com",
        password: "Tester1234$",
      });
    }
    if (admin) {
      req.reply({
        statusCode: 200,
        body: {
          accessToken:
            "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnYWRtaW5lLmNvbSIsImlhdCI6MTczNjc1ODE2OCwiZXhwIjozMjUwMzY4MDAwMCwicm9sZXMiOlsiTUFOQUdFUiJdLCJ1c2VySWQiOjk5OTl9.txQpUCEp-6VG39dt3YT_A7b7e_zUl3p_fZdlZZhr_eWX17TiThh5titGjo0Z32ye",
          refreshToken:
            "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbmUuY29tIiwiaWF0IjoxNzM2NzU4MTY4LCJleHAiOjMyNTAzNjgwMDAwLCJ1c2VySWQiOjk5OTl9.LN1Hm5HZbiiFJdXcV-4psa-LTP5cHr4cM--1Q8CmyLunGjvqDZaagSJ0RqByn8Ma",
        },
      });
    } else {
      req.reply({
        statusCode: 200,
        body: {
          accessToken:
            "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJkZW1vQGdtYWlsLmNvbSIsImlhdCI6MTczNjc1ODE2OCwiZXhwIjozMjUwMzY4MDAwMCwicm9sZXMiOlsiQ1VTVE9NRVIiXSwidXNlcklkIjo5OTk5fQ.dyebR0FWOY4rs91CBqrHSaQbD9WlhIKzaghTsDMFhxowGZiXg88F-gqN4gTrb6QW",
          refreshToken:
            "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJkZW1vQGdtYWlsLmNvbSIsImlhdCI6MTczNjc1ODE2OCwiZXhwIjozMjUwMzY4MDAwMCwidXNlcklkIjo5OTk5fQ.W6S8jiZLv_RZ4Z3I5y0ifzuVuTtsNVVewd5SF1esdtzZwrCQM6PNGl6CYghIIx0h",
        },
      });
    }
  }).as("login");
};

export const mockActiveCartCheck = (itemAdded = false) => {
  cy.intercept("GET", "/cart/9999/active", (req) => {
    if (itemAdded) {
      req.reply({
        statusCode: 200,
        body: {
          thereIsActiveCart: true,
          activeCartId: 9999,
        },
      });
    } else {
      req.reply({
        statusCode: 200,
        body: {
          thereIsActiveCart: false,
          activeCartId: 0,
        },
      });
    }
  }).as("checkForActiveCarts");
};

export const mockCreateItem = (category, itemId = 1234) => {
  // Mock the initial API call to create the item
  console.log("IN the mocked api");
  cy.intercept("POST", `/items/appetizer`, (req) => {
    expect(req.body).to.deep.equal({
      image: {},
      itemName: "Test Appetizer endtoend",
      itemPrice: "10.5",
      ingredients: ["test", "appetizer", "ingredients"],
      visibleInMenu: true,
      isVegetarian: false,
    });
    req.reply({
      statusCode: 201,
      body: { itemId: 123 },
    });
  }).as("createItem");
};

export const mockUploadImage = (itemId = 123) => {
  cy.intercept("POST", `/images/${itemId}`, (req) => {
    req.reply({
      statusCode: 201,
      body: { image: "mockedImageURL" },
    });
  }).as("uploadImage");
};

export const mockActiveOrderCheck = () => {
  cy.intercept("GET", "/orders/9999/active", {
    statusCode: 200,
    body: {
      thereAreActiveOrders: false,
      activeOrderId: 0,
    },
  }).as("checkForActiveOrders");
};

export const mockGetProfile = () => {
  cy.intercept("GET", "/users/9999", (req) => {
    req.reply({
      statusCode: 200,
      body: {
        userId: 2,
        staffId: 0,
        username: "endToEnd@test.com",
        firstName: "TestFirstName",
        lastName: "TestLastName",
        userRole: "CUSTOMER",
        phoneNumber: "+31878787864",
        address: {
          street: "Rachelsmolen 1",
          city: "Eindhoven",
          postalCode: "5612MA",
          country: "Netherlands",
        },
      },
    });
  }).as("getProfile");
};

export const mockGetItemById = () => {
  cy.intercept("GET", "/items/99992", (req) => {
    req.reply({
      statusCode: 200,
      body: {
        foundItem: {
          itemId: 99992,
          itemName: "Bruschetta",
          itemImageVersion: "v1733438637",
          itemPrice: 8.5,
          ingredients: [
            "Baguette slices",
            "Fresh tomatoes",
            "Garlic",
            "Basil",
            "Olive oil",
            "Balsamic",
            "Salt",
          ],
          visibleInMenu: true,
          itemCategory: {
            categoryId: 1,
            categoryName: "APPETIZER",
          },
          isVegetarian: false,
        },
      },
    });
  }).as("getItemById");
};

export const mockGetAppetizersForCustomerMenu = () => {
  console.log("IN THE METHOD");
  cy.intercept(
    "GET",
    "/items/categories/appetizer?visibleInMenu=true",
    (req) => {
      req.reply({
        statusCode: 200,
        body: {
          itemsInCategory: [
            {
              itemId: 99991,
              itemName: "food name",
              itemImageVersion: "v1735904015",
              itemPrice: 3,
              ingredients: ["Bread", "garlic butter", "mozzarella cheese"],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: true,
            },
            {
              itemId: 99992,
              itemName: "Bruschetta",
              itemImageVersion: "v1733438637",
              itemPrice: 8.5,
              ingredients: [
                "Baguette slices",
                "Fresh tomatoes",
                "Garlic",
                "Basil",
                "Olive oil",
                "Balsamic",
                "Salt",
              ],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: false,
            },
            {
              itemId: 99993,
              itemName: "Stuffed Mushrooms",
              itemImageVersion: "v1733438719",
              itemPrice: 7,
              ingredients: [
                "Mushrooms",
                "Cream cheese",
                "Garlic",
                "Parmesan cheese",
                "Breadcrumbs",
              ],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: false,
            },
            {
              itemId: 99994,
              itemName: "Spinach Artichoke Dip",
              itemImageVersion: "v1733438952",
              itemPrice: 5,
              ingredients: [
                "Spinach",
                "Artichoke hearts",
                "Cream cheese",
                "Parmesan cheese",
              ],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: false,
            },
            {
              itemId: 99995,
              itemName: "Mozzarella Sticks",
              itemImageVersion: "v1733439016",
              itemPrice: 8,
              ingredients: [
                "Mozzarella cheese sticks",
                "Egg",
                "Flour",
                "Bread crumbs",
                "Parsley",
              ],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: false,
            },
            {
              itemId: 99996,
              itemName: "Chicken Wings",
              itemImageVersion: "v1733439058",
              itemPrice: 8,
              ingredients: [
                "Chicken wings",
                "Olive oil",
                "Garlic powder",
                "Paprika",
                "Salt",
                "Pepper",
                "Hot sauce",
              ],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: false,
            },
            {
              itemId: 99997,
              itemName: "Fried Calamari",
              itemImageVersion: "v1733439095",
              itemPrice: 12,
              ingredients: [
                "Squid",
                "Flour",
                "Cornstarch",
                "Garlic",
                "Lemon",
                "Parsley",
                "Olive oil",
                "Marinara sauce",
              ],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: false,
            },
            {
              itemId: 99998,
              itemName: "Hummus with Pita Bread",
              itemImageVersion: "v1733439129",
              itemPrice: 9,
              ingredients: [
                "Chickpeas",
                "Tahini",
                "Lemon juice",
                "Olive oil",
                "Garlic",
                "Cumin",
                "Salt",
                "Pita bread",
              ],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: false,
            },
          ],
        },
      });
    }
  ).as("getAppetizersForCustomerMenu");
};

export const mockGetAppetizersForAdminMenu = () => {
  console.log("IN THE METHOD");
  cy.intercept("GET", "/items/categories/appetizer", (req) => {
    req.reply({
      statusCode: 200,
      body: {
        itemsInCategory: [
          {
            itemId: 99991,
            itemName: "food name",
            itemImageVersion: "v1735904015",
            itemPrice: 3,
            ingredients: ["Bread", "garlic butter", "mozzarella cheese"],
            visibleInMenu: true,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            isVegetarian: true,
          },
          {
            itemId: 99992,
            itemName: "Bruschetta",
            itemImageVersion: "v1733438637",
            itemPrice: 8.5,
            ingredients: [
              "Baguette slices",
              "Fresh tomatoes",
              "Garlic",
              "Basil",
              "Olive oil",
              "Balsamic",
              "Salt",
            ],
            visibleInMenu: true,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            isVegetarian: false,
          },
          {
            itemId: 99993,
            itemName: "Stuffed Mushrooms",
            itemImageVersion: "v1733438719",
            itemPrice: 7,
            ingredients: [
              "Mushrooms",
              "Cream cheese",
              "Garlic",
              "Parmesan cheese",
              "Breadcrumbs",
            ],
            visibleInMenu: true,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            isVegetarian: false,
          },
          {
            itemId: 99994,
            itemName: "Spinach Artichoke Dip",
            itemImageVersion: "v1733438952",
            itemPrice: 5,
            ingredients: [
              "Spinach",
              "Artichoke hearts",
              "Cream cheese",
              "Parmesan cheese",
            ],
            visibleInMenu: true,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            isVegetarian: false,
          },
          {
            itemId: 99995,
            itemName: "Mozzarella Sticks",
            itemImageVersion: "v1733439016",
            itemPrice: 8,
            ingredients: [
              "Mozzarella cheese sticks",
              "Egg",
              "Flour",
              "Bread crumbs",
              "Parsley",
            ],
            visibleInMenu: true,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            isVegetarian: false,
          },
          {
            itemId: 99996,
            itemName: "Chicken Wings",
            itemImageVersion: "v1733439058",
            itemPrice: 8,
            ingredients: [
              "Chicken wings",
              "Olive oil",
              "Garlic powder",
              "Paprika",
              "Salt",
              "Pepper",
              "Hot sauce",
            ],
            visibleInMenu: true,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            isVegetarian: false,
          },
          {
            itemId: 99997,
            itemName: "Fried Calamari",
            itemImageVersion: "v1733439095",
            itemPrice: 12,
            ingredients: [
              "Squid",
              "Flour",
              "Cornstarch",
              "Garlic",
              "Lemon",
              "Parsley",
              "Olive oil",
              "Marinara sauce",
            ],
            visibleInMenu: true,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            isVegetarian: false,
          },
          {
            itemId: 99998,
            itemName: "Hummus with Pita Bread",
            itemImageVersion: "v1733439129",
            itemPrice: 9,
            ingredients: [
              "Chickpeas",
              "Tahini",
              "Lemon juice",
              "Olive oil",
              "Garlic",
              "Cumin",
              "Salt",
              "Pita bread",
            ],
            visibleInMenu: true,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            isVegetarian: false,
          },
          {
            itemId: 999910,
            itemName: "French Fries",
            itemImageVersion: "v1733438719",
            itemPrice: 7,
            ingredients: ["Fries", "Garlic", "Salt"],
            visibleInMenu: false,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            isVegetarian: false,
          },
        ],
      },
    });
  }).as("getAppetizersForCustomerMenu");
};

export const mockAddItemToCart = (
  quantity,
  itemOfReferenceId,
  selectedItemId
) => {
  cy.intercept("POST", "/carts/item", (req) => {
    expect(req.headers.authorization).to.equal(
      "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJkZW1vQGdtYWlsLmNvbSIsImlhdCI6MTczNjc1ODE2OCwiZXhwIjozMjUwMzY4MDAwMCwicm9sZXMiOlsiQ1VTVE9NRVIiXSwidXNlcklkIjo5OTk5fQ.dyebR0FWOY4rs91CBqrHSaQbD9WlhIKzaghTsDMFhxowGZiXg88F-gqN4gTrb6QW"
    );
    expect(req.body).to.deep.equal({
      customerId: 9999,
      quantity: 2,
      itemOfReferenceId: 99992,
      comment: "",
      selectedItemId: 99992,
    });
    req.reply({
      statusCode: 200,
    });
  }).as("addItemToCart");
};

export const mockGetItemsInActiveCart = (customerId = 9999) => {
  cy.intercept("GET", `/carts-active/${customerId}`, (req) => {
    console.log(`Intercepted API call to /carts-active/${customerId}`);
    console.log("Request URL:", req.url);
    console.log("Request Method:", req.method);
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);

    req.reply({
      cart: {
        cartId: 190,
        customerId: customerId,
        isActive: true,
        price: 17,
        selectedItems: [
          {
            selectedItemId: 245,
            itemOfReference: {
              itemId: 99992,
              itemName: "Bruschetta",
              itemImageVersion: "v1733438637",
              itemPrice: 8.5,
              ingredients: [
                "Baguette slices",
                "Fresh tomatoes",
                "Garlic",
                "Basil",
                "Olive oil",
                "Balsamic",
                "Salt",
              ],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: false,
            },
            amount: 2,
            itemCategory: {
              categoryId: 1,
              categoryName: "APPETIZER",
            },
            comment: "",
            statusOfPreparation: {
              id: 1,
              statusName: "NOT STARTED",
            },
            itemFromMenu: {
              itemId: 10,
              itemName: "Bruschetta",
              itemImageVersion: "v1733438637",
              itemPrice: 8.5,
              ingredients: [
                "Baguette slices",
                "Fresh tomatoes",
                "Garlic",
                "Basil",
                "Olive oil",
                "Balsamic",
                "Salt",
              ],
              visibleInMenu: true,
              itemCategory: {
                categoryId: 1,
                categoryName: "APPETIZER",
              },
              isVegetarian: false,
            },
          },
        ],
      },
    });
  }).as("getItemsInActiveCart");
};
