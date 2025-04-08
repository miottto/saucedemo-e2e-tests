/// <reference types="cypress" />
import LoginPage from "../pageObjects/loginPage.js"

describe('SauceDemo - Login Tests', () => {
    beforeEach(() => {
        // Visit the SauceDemo site before each test
        LoginPage.visit();
    })

    it('should login with valid credentials', () => {
       LoginPage.login('standard_user', 'secret_sauce');
        // Verify the user is redirected to the inventory page
        cy.url().should('include', '/inventory.html')
    })

    it('should not login with invalid credentials', () => {
        LoginPage.login('invalid_user', 'invalid_password');
        // Check for error message
        cy.get('[data-test="error"]').should('be.visible');
    });
})
