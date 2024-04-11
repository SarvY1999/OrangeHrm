/// < references type = "Cypress" /> ///
export function saveRecord() {
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    //div.oxd-loading-spinner
}