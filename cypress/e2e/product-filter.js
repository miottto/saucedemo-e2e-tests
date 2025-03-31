/// <reference types="cypress" />

describe('SauceDemo - Product Filter Tests', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
    });

    it('Should have "Name (A to Z)" as the default filter', () => {
        cy.get('.product_sort_container').should('have.value', 'az');
    });

    it('Should filter products by "Price (low to high)"', () => {
        cy.get('.product_sort_container').select('lohi');
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
            expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
        });
    });

    it('Should filter products by "Price (high to low)"', () => {
        cy.get('.product_sort_container').select('hilo');
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
            expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
        });
    });
})
