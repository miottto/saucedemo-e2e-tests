/// <reference types="cypress" />

describe("Checkout Edge Cases", () => {
    beforeEach(() => {
        // Visit the SauceDemo site and log in before each test
        cy.visit("https://www.saucedemo.com/");
        cy.get('[data-test="username"]').type("standard_user");
        cy.get('[data-test="password"]').type("secret_sauce");
        cy.get('[data-test="login-button"]').click();
    });

    it("Should prevent checkout with an empty cart", () => {
        cy.get(".shopping_cart_link").click();
        cy.get('[data-test="checkout"]').click();
        cy.get(".error-message-container").should("contain", "Your cart is empty");
    });

    it("Should prevent checkout with invalid inputs", () => {
        cy.get(".inventory_item").first().find(".btn_inventory").click();
        cy.get(".shopping_cart_link").click();
        cy.get('[data-test="checkout"]').click();
        
        // Leaving all fields blank
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should("contain", "Error: First Name is required");

        // Entering invalid ZIP code
        cy.get('[data-test="firstName"]').type("Kurt");
        cy.get('[data-test="lastName"]').type("Cox");
        cy.get('[data-test="postalCode"]').type("ABC12");
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should("contain", "Error: Postal Code must be numeric");
    });

    it("Should retain cart items after failed checkout attempt", () => {
        cy.get(".inventory_item").first().find(".btn_inventory").click();
        cy.get(".shopping_cart_link").click();
        cy.get('[data-test="checkout"]').click();
        
        cy.reload(); // Refresh the page
        cy.get(".shopping_cart_badge").should("contain", "1");
    });


});
