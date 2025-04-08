/// <reference types="cypress" />
import LoginPage from '../pageObjects/loginPage.js';
import ProductPage from '../pageObjects/productPage.js';
import CartPage from '../pageObjects/cartPage.js';
import CheckOutPage from '../pageObjects/checkoutPage.js';

describe('Saucedemo - Checkout Process Test', () => {
    beforeEach(() => {
      // Visit the SauceDemo site and log in before each test
      LoginPage.visit();
      LoginPage.login('standard_user', 'secret_sauce');
    });
  
    it("Should complete the checkout process successfully", () => {
      // Add a product to the cart
      cy.get(".inventory_item").first().find(".btn_inventory").click();
      ProductPage.openCart();
  
      // Proceed to checkout
       CartPage.proceedToCheckout();
  
      // Fill in shipping details
      CheckOutPage.enterCustomerInfo('kurt', 'Cox' , '12345');
  
      // Verify checkout summary and complete purchase
      cy.get(".summary_total_label").should("be.visible");
      CheckOutPage.finishCheckout();  

      // Verify confirmation message
      CheckOutPage.verifySuccessMessage();

    });
  });
  