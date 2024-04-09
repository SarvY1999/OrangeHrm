import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { navigate } from "../Commands/Navigate";
import { saveRecord } from "../Commands/SaveRecord";
import { setText } from "../Commands/SetText";

let rand = Math.floor((Math.random() * 100) + 1000);

const Emp = {
    firstName: `NewEmp${rand}`,
    lastName: "LastName"
}

Given('Launch the OrangeHRM application.', () => {
    cy.login('Admin', 'admin123');
});

Then('Navigate to the "PIM" (Personnel Information Management) module.', () => {
    navigate('PIM');
});

Then('Click on the "Add Employee" option.', () => {
    cy.get("a.oxd-topbar-body-nav-tab-item").contains("Add Employee").click();
    cy.get("h6.orangehrm-main-title").should('have.text', "Add Employee");
});

Then('Fill in the required fields for adding a new employee.', () => {
    setText('input[name="firstName"]', Emp.firstName);
    setText('input[name="lastName"]', Emp.lastName);
});

And('Click on the "Save" button.', () => {
    saveRecord();
});


Then('Verify that the employee has been successfully added.', () => {
    cy.get("a.oxd-topbar-body-nav-tab-item").contains("Employee List").click();
    cy.get("div.oxd-table-filter-header-title").should('have.text', "Employee Information");
    setText('div.oxd-autocomplete-text-input >  input', Emp.firstName);
});