import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { navigate } from "../Commands/Navigate";
import { saveRecord } from "../Commands/SaveRecord";
import { setText } from "../Commands/SetText";

let randNum = Math.floor((Math.random() * 100) + 1000);

const Emp = {
    firstName: `Leave-${randNum}`,
    lastName: "Entitlement",
    EmpId: randNum
}

Given('Prerequisite create a user which will be used to assign leave entitlement', () => {
    cy.login('Admin', 'admin123');
    navigate('PIM');
    cy.get("a.oxd-topbar-body-nav-tab-item").contains("Add Employee").click();
    cy.get("h6.orangehrm-main-title").should('have.text', "Add Employee");
    setText('input[name="firstName"]', Emp.firstName);
    setText('input[name="lastName"]', Emp.lastName);
    setText('div:nth-child(1) > div.oxd-grid-2.orangehrm-full-width-grid > div > div > div:nth-child(2) > input', Emp.EmpId);
    saveRecord();
})

Then('Navigate to Leave section', () => {
    navigate('Leave');
})

Then('select Add Entitlement from Entitlement Dropdown', () => {
    cy.get("span.oxd-topbar-body-nav-tab-item").contains("Entitlements").click();
    cy.get("a.oxd-topbar-body-nav-tab-link").contains('Add Entitlements').click();
})

Then('select Individual Employee and fill all required details by using the user created before and save', () => {
    cy.get("input[type='radio']").check("0");
    setText("div.oxd-autocomplete-text-input > input", Emp.firstName);
    cy.wait(3000);
    cy.get('div[role="option"] > span').contains(`${Emp.firstName} ${Emp.lastName}`).click();
    cy.get('div:nth-child(1) > div > div:nth-child(2) > div.oxd-select-wrapper i.bi-caret-down-fill').click();
    cy.get("div[role='listbox'] div[role='option']").contains("CAN - FMLA").click();

    cy.get('div:nth-child(2) > div > div:nth-child(2) > div.oxd-select-wrapper i.bi-caret-down-fill').click();
    cy.get("div.oxd-select-dropdown > div:nth-child(2)").click();

    setText('div > div:nth-child(2) > input', 2);
    saveRecord()

    cy.get('div.orangehrm-text-center-align > p.oxd-text').should('contain.text', 'Existing Entitlement value 0.00 will be updated to 2.00')
    cy.get('button[type="button"]').contains('Confirm').click();

})

Then('verify if leave entitlement is assigned successfully or not', () => {
    cy.get("div.oxd-autocomplete-text-input > input").should('have.text', `${Emp.firstName} ${Emp.lastName}`);
    cy.get('div:nth-child(2) > div > div:nth-child(2) > div > div > div > i.bi-caret-down-fill').click();
    cy.get("div[role='listbox'] div[role='option']").contains("CAN - FMLA").click();
    cy.get('button[type="submit"]').click();
})

Then('Delete the leave Entitlement and User', () => {
    //Delete Entitlement
    cy.get("div[class='oxd-table-body'] span.oxd-checkbox-input").check();
    cy.get('button[type="button"]').contains('Delete Selected').click()
    cy.get('button[type="button"]').contains('Yes, Delete').click();

    // Delete Employee
    navigate('PIM');
    cy.get("a.oxd-topbar-body-nav-tab-item").contains("Employee List").click();
    cy.get("div.oxd-table-filter-header-title").should('have.text', "Employee Information");
    setText('div.oxd-autocomplete-text-input >  input', Emp.firstName);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.get('div.oxd-table-cell.oxd-padding-cell > div').contains(Emp.firstName).should('be.visible');

    cy.get('div.oxd-table.orangehrm-employee-list').find('div.oxd-table-card > div.oxd-table-row').its('length').then(($row) => {
        cy.get(`div.oxd-table-body > div.oxd-table-card:nth-child(${$row}) > div > div.oxd-table-cell > div`).contains(Emp.firstName);
        cy.get(`div.oxd-table-body > div.oxd-table-card:nth-child(${$row}) > div > div.oxd-table-cell >div.oxd-table-cell-actions > button > i.bi-trash`).click();
    });
    cy.get('div[role="document"]').should('be.visible');
    cy.get('div.orangehrm-modal-footer > button > i.bi-trash').click();
})