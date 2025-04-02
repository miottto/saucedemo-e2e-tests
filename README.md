# SauceDemo E2E Tests 🚀

This repository contains automated end-to-end tests using **Cypress** to validate functionalities of the [SauceDemo](https://www.saucedemo.com/) website, an e-commerce environment designed for software testing. The project aims to cover the main flows of a shopping journey, ensuring that essential functionalities remain operational. 

## About SauceDemo 🔍

*SauceDemo* is a fictional e-commerce platform specifically created to assess the robustness of automated testing. It simulates a real online shopping experience, allowing validation of processes such as:

🔑 User login and authentication, including different profiles and common errors. 
🛒 Adding and removing products from the cart, ensuring consistency in the user experience. 
🔎 Applying and validating search filters to facilitate product navigation. 
✅ Complete checkout process, including data entry and purchase completion. 
🔄 Persistence of cart items across navigation and page reloads. 

This platform is ideal for practicing test automation in web applications, replicating challenges found in real-world e-commerce systems. 

## Implemented Tests 📝

The project covers a wide range of scenarios to ensure application reliability:

- **login.js**: Tests successful login, failures with invalid credentials, and blocked user scenarios.
- **product_filters.js**: Validates sorting filter functionality, such as sorting by price and name.
- **shopping_cart.js**: Tests adding, removing, and persisting products in the cart throughout the session.
- **checkout.js**: Verifies the standard checkout flow up to purchase completion, including correctly filling required fields.
- **checkout_edge_cases.js**: Explores edge cases like empty fields, invalid values, and attempts to complete a purchase with an empty cart.

### Tests That Are Not Passing ⚠️

Since SauceDemo simulates a real testing environment, not all tests pass. This is expected behavior, revealing potential bugs or issues:

- ❌ **Should prevent checkout with an invalid ZIP Code**
- ❌ **Should prevent checkout with an empty cart**

These failing tests from this project highlight areas where the system may not be handling edge cases correctly. 🛠️🚦

## Local Setup and Execution 🔧

### Requirements:

- Node.js 18+
- Cypress installed via npm

### Steps:

1. Clone the repository: 
   ```bash
   git clone https://github.com/your-username/saucedemo-e2e-tests.git
   cd saucedemo-e2e-tests
   ```
2. Install dependencies: 
   ```bash
   npm ci
   ```
3. Run the tests in headless mode: 
   ```bash
   npm run cypress:run
   ```
4. To open the Cypress UI and manually debug tests: 
   ```bash
   npx cypress open
   ```

## CI/CD Integration (GitHub Actions) 🔄

The tests run automatically on every *push* and *pull request* to the `main` branch, ensuring continuous quality in development. 

### GitHub Actions Pipeline: 🛠️

1. **Checkout the code** to fetch the latest version of the repository. 
2. **Set up Node.js** with dependency caching to optimize installation. 
3. **Install dependencies** using `npm ci`, ensuring a clean environment. 
4. **Run Cypress tests** to validate key functionalities. 
5. **Upload test screenshots and videos** for debugging and analysis in case of failures. 

After the test execution, artifacts (screenshots and videos) are automatically stored in GitHub Actions, allowing a detailed review of what happened during the run. 

---

This project serves as a demonstration of best practices in test automation, ensuring stability and reliability for web applications. Contributions are welcome! If you have suggestions or improvements, feel free to open an *issue* or submit a *pull request*. 🤝

