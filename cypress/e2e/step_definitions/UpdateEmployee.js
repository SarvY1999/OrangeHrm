import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";
import { navigate } from "../Commands/Navigate";
import { saveRecord } from "../Commands/SaveRecord";
import { setText } from "../Commands/SetText";

let rand = Math.floor((Math.random() * 100) + 1000);

const Emp = {
    firstName: `UpdateEmp${rand}`,
    lastName: "LastName"
}

before('Pre-requisite: Create Employee', () => {
    cy.login('Admin', 'admin123');
    navigate('PIM');
    cy.get("a.oxd-topbar-body-nav-tab-item").contains("Add Employee").click();
    cy.get("h6.orangehrm-main-title").should('have.text', "Add Employee");
    setText('input[name="firstName"]', Emp.firstName);
    setText('input[name="lastName"]', Emp.lastName);
    saveRecord();
    cy.logout();
});

Given('Login to OrangeHRM using Valid credentials', () => {
    cy.login('Admin', 'admin123');
})

When('Navigate to PIM module', () => {
    navigate('PIM');
})

And('Search for existing employee', () => {
    cy.get("a.oxd-topbar-body-nav-tab-item").contains("Employee List").click();
    cy.get("div.oxd-table-filter-header-title").should('have.text', "Employee Information");
    setText('div.oxd-autocomplete-text-input >  input', Emp.firstName);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.get('div.oxd-table-cell.oxd-padding-cell > div').contains(Emp.firstName).should('be.visible');
})

And('Click On Edit button', () => {
    // cy.get('div.oxd-table-cell.oxd-padding-cell > div').contains(Emp.firstName).find('i.bi-pencil-fill').click()
    // cy.get('div.oxd-table-cell.oxd-padding-cell > div').contains(Emp.firstName).parent('div.oxd-table-card').find('button.oxd-icon-button > i.bi-pencil-fill').click();
    // get the count of result
    cy.get('div.oxd-table.orangehrm-employee-list').find('div.oxd-table-card > div.oxd-table-row').its('length').then(($row) => {
        cy.get(`div.oxd-table-body > div.oxd-table-card:nth-child(${$row}) > div > div.oxd-table-cell > div`).contains(Emp.firstName);
        cy.get(`div.oxd-table-body > div.oxd-table-card:nth-child(${$row}) > div > div.oxd-table-cell >div.oxd-table-cell-actions > button > i.bi-pencil-fill`).click();
    });
    cy.get('div.orangehrm-edit-employee-name').contains(`${Emp.firstName} ${Emp.lastName}`);
})

And('Update the Employee Details', () => {
    cy.log('Update the Employee Details');
    Emp.firstName = `NewUpdateEmp${rand}`;
    setText('input[name="firstName"]', Emp.firstName);
    setText('input[name="lastName"]', Emp.lastName);
})


And('Save employee', () => {
    cy.log('Save employee')
    saveRecord();
})

Then('Verify if Employee details are successfully updated', () => {
    cy.log('Verify if Employee details are successfully updated');
    cy.get("a.oxd-topbar-body-nav-tab-item").contains("Employee List").click();
    cy.get("div.oxd-table-filter-header-title").should('have.text', "Employee Information");
    setText('div.oxd-autocomplete-text-input >  input', Emp.firstName);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.get('div.oxd-table-cell.oxd-padding-cell > div').contains(Emp.firstName).should('be.visible');
})

