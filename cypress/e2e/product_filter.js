/// <reference types="cypress" />

describe('SauceDemo - Product Filter Tests', () => {
    // Runs before each test to login to the application
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/'); 
        cy.get('[data-test="username"]').type('standard_user'); 
        cy.get('[data-test="password"]').type('secret_sauce'); 
        cy.get('[data-test="login-button"]').click(); 
        // Verify the user is redirected to the inventory page
        cy.url().should('include', '/inventory.html'); 
    });

    it('Should have "Name (A to Z)" as the default filter', () => {
        // Check the default filter value
        cy.get('.product_sort_container').should('have.value', 'az'); 
    });

    it('Should filter products by "Price (low to high)"', () => {
        // Select the "Price (low to high)" filter
        cy.get('.product_sort_container').select('lohi'); 
        cy.get('.inventory_item_price').then(($prices) => {
            // Extract prices from the DOM and convert them to numbers
            const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
            // Assert that the prices are sorted in ascending order
            expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
        });
    });

    it('Should filter products by "Price (high to low)"', () => {
        // Select the "Price (high to low)" filter
        cy.get('.product_sort_container').select('hilo'); 
        cy.get('.inventory_item_price').then(($prices) => {
            // Extract prices from the DOM and convert them to numbers
            const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
            // Assert that the prices are sorted in descending order
            expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
        });
    });
});
