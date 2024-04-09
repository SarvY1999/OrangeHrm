/// <reference types = "Cypress" /> ///

export function navigate(name) {
    cy.get('span.oxd-main-menu-item--name').contains(name).click();
    cy.get('span.oxd-topbar-header-breadcrumb > h6').should('contain.text', name)
}