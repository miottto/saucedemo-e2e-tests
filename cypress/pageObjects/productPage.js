class ProductPage {
    addToCartById(productId) {
        cy.get(`[data-test="add-to-cart-${productId}"]`).click();
    }
  
    openCart() {
        cy.get('.shopping_cart_link').click();  
    }
  
    applyFilter(filterOption) {
      cy.get('[data-test="product-sort-container"]').select(filterOption);
    }
  }
  
  export default new ProductPage();
  