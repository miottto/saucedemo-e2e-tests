/// <reference types="cypress" />

describe('SauceDemo - Login Tests', () => {
    beforeEach(() => {
        // Visit the SauceDemo site before each test
        cy.visit('https://www.saucedemo.com/')
    })

    it('should login with valid credentials', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        // Verify the user is redirected to the inventory page
        cy.url().should('include', '/inventory.html')
    })

    it('should not login with invalid credentials', () => {
        cy.get('[data-test="username"]').type('invalid_user');
        cy.get('[data-test="password"]').type('invalid_password');
        cy.get('[data-test="login-button"]').click(); 
        // Check for error message
        cy.get('[data-test="error"]').should('be.visible');
    });
})
