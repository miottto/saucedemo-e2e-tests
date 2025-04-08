class CheckoutPage {
    enterCustomerInfo(firstName, lastName, zipCode) {
      cy.get('[data-test="firstName"]').type(firstName);
      cy.get('[data-test="lastName"]').type(lastName);
      cy.get('[data-test="postalCode"]').type(zipCode);
      cy.get('[data-test="continue"]').click();
    }
  
    finishCheckout() {
      cy.get('[data-test="finish"]').click();
    }
  
    verifySuccessMessage() {
      cy.contains('Thank you for your order!').should('be.visible');
    }
  }
  
  export default new CheckoutPage();
  