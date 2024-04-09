
export function saveRecord() {
    cy.get('button[type="submit"]').click();
    cy.get('oxd-toast-content-text').contains('Success').should('be.visible');
}