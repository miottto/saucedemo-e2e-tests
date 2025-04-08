/// <reference types="cypress" />
import LoginPage from '../pageObjects/loginPage.js';
import ProductPage from '../pageObjects/productPage.js';
import CartPage from '../pageObjects/cartPage.js';
import CheckOutPage from '../pageObjects/checkoutPage.js';

describe("Checkout Edge Cases", () => {
    beforeEach(() => {
        // Visit the SauceDemo site and log in before each test
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
    });

    it("Should prevent checkout with an empty cart", () => {
        ProductPage.openCart();
        CartPage.proceedToCheckout();
        cy.get(".error-message-container").should("contain", "Your cart is empty");
    });

    it("Should prevent checkout without name input", () => {
        cy.get(".inventory_item").first().find(".btn_inventory").click();
        ProductPage.openCart();
        CartPage.proceedToCheckout();;
        
        // Proceed leaving all fields blank
        cy.get('[data-test="continue"]').click();
        cy.get(".error-message-container").should("contain", "Error: First Name is required");
    });
    
    it("Should prevent checkout with invalid ZIP Code", () => {
        cy.get(".inventory_item").first().find(".btn_inventory").click();
        ProductPage.openCart();
        CartPage.proceedToCheckout();

        // Entering invalid ZIP code
        CheckOutPage.enterCustomerInfo('Kurt', 'Cox', 'ABC123');
        cy.get(".error-message-container").should("contain", "Error: Postal Code must be numeric");
    });

    it("Should retain cart items after failed checkout attempt", () => {
        cy.get(".inventory_item").first().find(".btn_inventory").click();
        ProductPage.openCart();
        CartPage.proceedToCheckout();
        
        cy.reload(); // Refresh the page
        cy.get(".shopping_cart_badge").should("contain", "1");
    });
});
