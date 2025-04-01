/// <reference types="cypress" />

describe('Saucedemo - Checkout Process Test', () => {
    beforeEach(() => {
      // Visit the SauceDemo site and log in before each test
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
    });
  
    it("Should complete the checkout process successfully", () => {
      // Add a product to the cart
      cy.get(".inventory_item").first().find(".btn_inventory").click();
      cy.get(".shopping_cart_link").click();
  
      // Proceed to checkout
      cy.get("#checkout").click();
  
      // Fill in shipping details
      cy.get("#first-name").type("John");
      cy.get("#last-name").type("Doe");
      cy.get("#postal-code").type("12345");
      cy.get("#continue").click();
  
      // Verify checkout summary and complete purchase
      cy.get(".summary_total_label").should("be.visible");
      cy.get("#finish").click();
  
      // Verify confirmation message
      cy.get(".complete-header").should("contain", "Thank you for your order!");

    });
  });
  