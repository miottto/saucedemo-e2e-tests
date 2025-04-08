class CartPage {
    removeItemById(productId) {
        cy.get(`[data-test="remove-${productId}"]`).click();
    }
  
    proceedToCheckout() {
      cy.get('[data-test="checkout"]').click();
    }
  }
  
  export default new CartPage();
  