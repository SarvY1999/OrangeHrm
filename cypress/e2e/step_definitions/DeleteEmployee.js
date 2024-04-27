import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { navigate } from "../Commands/Navigate";
import { saveRecord } from "../Commands/SaveRecord";
import { setText } from "../Commands/SetText";

let randNum = Math.floor((Math.random() * 100) + 1000);
let count = 1;
const Emp = {
    firstName: `DeleteEmp${randNum}`,
    lastName: "LastName",
    EmpId: randNum
}

Given('Prerequisites Create an Employee', () => {
    cy.log('Count: ', count++)
    cy.login('Admin', 'admin123');
    navigate('PIM');
    cy.get("a.oxd-topbar-body-nav-tab-item").contains("Add Employee").click();
    cy.get("h6.orangehrm-main-title").should('have.text', "Add Employee");
    setText('input[name="firstName"]', Emp.firstName);
    setText('input[name="lastName"]', Emp.lastName);
    setText('div:nth-child(1) > div.oxd-grid-2.orangehrm-full-width-grid > div > div > div:nth-child(2) > input', Emp.EmpId);
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

And('Click On Delete button', () => {
    cy.get('div.oxd-table.orangehrm-employee-list').find('div.oxd-table-card > div.oxd-table-row').its('length').then(($row) => {
        cy.get(`div.oxd-table-body > div.oxd-table-card:nth-child(${$row}) > div > div.oxd-table-cell > div`).contains(Emp.firstName);
        cy.get(`div.oxd-table-body > div.oxd-table-card:nth-child(${$row}) > div > div.oxd-table-cell >div.oxd-table-cell-actions > button > i.bi-trash`).click();
    });
    cy.get('div[role="document"]').should('be.visible');
    cy.get('div.orangehrm-modal-footer > button > i.bi-trash').click();
});


And('Verify if Employee is successfully deleted', () => {
    setText('div.oxd-autocomplete-text-input >  input', Emp.firstName);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.get('div.oxd-table-cell.oxd-padding-cell > div').should('not.exist');
})


