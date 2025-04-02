/// <reference types="cypress" />

describe("Shopping Cart Functionality", () => {
    beforeEach(() => {
        // Visit the SauceDemo site and log in before each test
        cy.visit("https://www.saucedemo.com/");
        cy.get('[data-test="username"]').type("standard_user");
        cy.get('[data-test="password"]').type("secret_sauce");
        cy.get('[data-test="login-button"]').click();
    });

    it("Should add an item to the cart", () => {
        // Click "Add to Cart" on the first product
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Verify cart count updates
        cy.get(".shopping_cart_badge").should("contain", "1");

        // Navigate to the cart and check if the item is present
        cy.get(".shopping_cart_link").click();
        cy.get(".cart_item").should("have.length", 1);
        cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
    });

    it("Should remove an item from the cart", () => {
        // Add an item first
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get(".shopping_cart_badge").should("contain", "1");

        // Remove the item
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click();

        // Verify cart count disappears
        cy.get(".shopping_cart_badge").should("not.exist");

        // Go to cart page and check if the item is removed
        cy.get(".shopping_cart_link").click();
        cy.get(".cart_item").should("not.exist");
    });

    it('Should add a random product to the cart', () => {
        // Add a random item
        cy.get('.inventory_item')
          .then((items) => {
            const randomItem = items[Math.floor(Math.random() * items.length)]
            cy.wrap(randomItem).find('.btn_inventory').click()
          })
        // Navigate to the cart and check if the item is present  
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_item').should('have.length', 1)
      })

    it("Should persist cart items across navigation", () => {
        // Add an item to the cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get(".shopping_cart_badge").should("contain", "1");

        // Navigate to another page 
        cy.visit("https://www.google.com/");  // Open external page
        cy.go("back"); // Navigate back to the app

        // Ensure cart still has 1 item
        cy.get(".shopping_cart_badge").should("contain", "1");

        // Navigate to cart and verify item is still there
        cy.get(".shopping_cart_link").click();
        cy.get(".cart_item").should("have.length", 1);
        cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
    });

    it("Should persist cart items after page reload", () => {
        // Add two items to the cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get(".shopping_cart_badge").should("contain", "2");

        // Reload the page
        cy.reload();

        // Ensure cart still has 2 items
        cy.get(".shopping_cart_badge").should("contain", "2");

        // Navigate to cart and verify both items are present
        cy.get(".shopping_cart_link").click();
        cy.get(".cart_item").should("have.length", 2);
        cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
        cy.get(".inventory_item_name").should("contain", "Sauce Labs Bike Light");
    });
});

