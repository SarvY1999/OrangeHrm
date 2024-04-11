export function setText(ref, text) {
    cy.get(ref).first().type(text)
    cy.get(ref).first().should('contain.value', text)
}