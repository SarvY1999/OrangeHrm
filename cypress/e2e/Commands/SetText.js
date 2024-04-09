export function setText(ref, text) {
    cy.get(ref).type(text)
    cy.get(ref).should('contain.value', text)
}