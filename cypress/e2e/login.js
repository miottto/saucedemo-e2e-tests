/// <reference types="cypress" />
import LoginPage from "../pageObjects/loginPage.js"

describe('SauceDemo - Login Tests', () => {
    beforeEach(() => {
        // Visit the SauceDemo site before each test
        LoginPage.visit();
    })

    it('should login with valid credentials', () => {
       cy.fixture('users').then((users) => {
            const { username, password } = users.validUser; 
       LoginPage.login(username, password);
        // Verify the user is redirected to the inventory page
        cy.url().should('include', '/inventory.html')
        });
    });

    it('should not login with invalid credentials', () => {
        cy.fixture('users').then((users) => {
            const { username, password } = users.invalidUser;
        LoginPage.login(username, password);
        // Check for error message
        LoginPage.errorMessage().should('be.visible');
        });
    });
    it('should not login and show error for locked out user', () => {
        cy.fixture('users').then((users) => {
            const { username, password } = users.lockedOutUser;
        LoginPage.login(username, password);
        LoginPage.errorMessage().should('contain.text', 'Sorry, this user has been locked out')
        });
    });
})