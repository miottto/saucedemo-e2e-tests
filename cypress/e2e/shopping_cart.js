/// <reference types='cypress' />
import LoginPage from '../pageObjects/loginPage.js';
import ProductPage from '../pageObjects/productPage.js';
import CartPage from '../pageObjects/cartPage.js';

describe('Shopping Cart Functionality', () => {
    beforeEach(() => {
        // Visit the SauceDemo site and log in before each test
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
    });

    it('Should add an item to the cart', () => {
        // Click 'Add to Cart' on the product 
        ProductPage.addToCartById('sauce-labs-backpack');
         
        // Verify cart count updates
        cy.get('.shopping_cart_badge').should('contain', '1');

        // Navigate to the cart and check if the item is present
        ProductPage.openCart();
        cy.get('.cart_item').should('have.length', 1);
        cy.contains('Sauce Labs Backpack').should('be.visible');
    });

    it('Should remove an item from the cart', () => {
        // Add an item to the cart
        ProductPage.addToCartById('sauce-labs-bike-light');
        cy.get('.shopping_cart_badge').should('contain', '1');

        // Remove the item
        CartPage.removeItemById('sauce-labs-bike-light');

        // Verify cart count disappears
        cy.get('.shopping_cart_badge').should('not.exist');

        // Go to cart page and check if the item is removed
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_item').should('not.exist');
    });

    it('Should add a random product to the cart', () => {
        // Add a random item to the cart
        cy.get('.inventory_item')
          .then((items) => {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            cy.wrap(randomItem).find('.btn_inventory').click();
          });
        // Navigate to the cart and check if the item is present  
        ProductPage.openCart();
        cy.get('.cart_item').should('have.length', 1);
    });

    it('Should persist cart items across navigation', () => {
        // Add an item to the cart
        ProductPage.addToCartById('sauce-labs-backpack');
        cy.get('.shopping_cart_badge').should('contain', '1');

         // Navigate to cart and verify if the item is present
         ProductPage.openCart();
         cy.get('.cart_item').should('have.length', 1);

        // Navigate back to the app
        cy.go('back'); 

        // Ensure cart still has 1 item
        cy.get('.shopping_cart_badge').should('contain', '1');

        // Navigate to cart and verify item is still there
        ProductPage.openCart();
        cy.get('.cart_item').should('have.length', 1);
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
    });

    it('Should persist cart items after page reload', () => {
        // Add two items to the cart
        ProductPage.addToCartById('sauce-labs-backpack');
        ProductPage.addToCartById('sauce-labs-bike-light');
        cy.get('.shopping_cart_badge').should('contain', '2');

        // Reload the page
        cy.reload();

        // Ensure cart still has 2 items
        cy.get('.shopping_cart_badge').should('contain', '2');

        // Navigate to cart and verify both items are present
        ProductPage.openCart();
        cy.get('.cart_item').should('have.length', 2);
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Bike Light');
    });
});

