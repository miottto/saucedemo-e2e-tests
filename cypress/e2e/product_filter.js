/// <reference types="cypress" />
import LoginPage from '../pageObjects/loginPage.js'
import ProductPage from '../pageObjects/productPage.js'

describe('SauceDemo - Product Filter Tests', () => {
    // Runs before each test to login to the application
    beforeEach(() => {
        // Visit the SauceDemo site and log in before each test
        LoginPage.visit(); 
        LoginPage.login('standard_user', 'secret_sauce');
        // Verify the user is redirected to the inventory page
        cy.url().should('include', '/inventory.html'); 
    });

    it('Should have "Name (A to Z)" as the default filter', () => {
        // Check the default filter value
        cy.get('.product_sort_container').should('have.value', 'az'); 
    });

    it('Should filter products by "Price (low to high)"', () => {
        // Select the "Price (low to high)" filter
        ProductPage.applyFilter("lohi"); 
        cy.get('.inventory_item_price').then(($prices) => {
            // Extract prices from the DOM and convert them to numbers
            const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
            // Assert that the prices are sorted in ascending order
            expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
        });
    });

    it('Should filter products by "Price (high to low)"', () => {
        // Select the "Price (high to low)" filter
        ProductPage.applyFilter("hilo"); 
        cy.get('.inventory_item_price').then(($prices) => {
            // Extract prices from the DOM and convert them to numbers
            const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
            // Assert that the prices are sorted in descending order
            expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
        });
    });
});
