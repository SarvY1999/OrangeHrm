import { Given } from 'cypress-cucumber-preprocessor/steps'

Given("Test", () => {
    cy.visit('https://example.cypress.io')
})