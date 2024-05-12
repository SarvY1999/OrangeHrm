import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { navigate } from "../Commands/Navigate";
import { saveRecord } from "../Commands/SaveRecord";
import { setText } from "../Commands/SetText";

const randNum = Math.floor((Math.random() * 100) + 1);

function getWorkingDay(date) {

    const dayOfWeek = date.getDay();
    // skip to Monday if it is Saturday
    if (dayOfWeek === 6) {
        date.setDate(date.getDate() + 2);
    }

    // skip to Monday if it is Sunday
    if (dayOfWeek === 0) {
        date.setDate(date.getDate() + 1);
    }

    return date;
}

Given("the user is logged in to the OrangeHRM application", () => {
    cy.login('Admin', 'admin123');
})

When("they navigate to the Leave module", () => {
    navigate('Leave');
})

And("click on the Apply button", () => {
    cy.get("a.oxd-topbar-body-nav-tab-item").contains("Apply").click();
})

And("select the type of leave", () => {
    cy.get('div.oxd-select-wrapper i.bi-caret-down-fill').click();
    cy.get("div[role='listbox'] div[role='option']").contains("CAN - FMLA").click();
})

And("enter the start and end dates for the leave", () => {

    // Getting Leave Start Date
    const currentDate = new Date();
    let startDate = getWorkingDay(currentDate);
    startDate = startDate.getDate();

    // Getting Leave End Date
    const nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + 1);
    let endDate = getWorkingDay(nextDate);
    endDate = endDate.getDate();

    cy.get('div:nth-child(1) > div > div:nth-child(2) > div > div > input').click();
    cy.get('div.oxd-calendar-date').contains(startDate).click();
    cy.wait(2000);
    cy.get('div:nth-child(2) > div > div:nth-child(2) > div > div > input').click();
    cy.get('div.oxd-calendar-date').contains(endDate).click();

})

And("provide any additional information or comments", () => {
    setText('textarea.oxd-textarea', `Going out of station due to personal work ${randNum}`)
})

And("submit the leave request", () => {
    saveRecord();
})

Then("they should see the leave request successfully submitted and displayed in the leave calendar or list", () => {
    cy.get("span.oxd-topbar-body-nav-tab-item").contains("More ").click();
    cy.get("a.oxd-topbar-body-nav-tab-link ").contains("Leave List").click();

    // Getting Leave Start Date
    const currentDate = new Date();
    let startDate = getWorkingDay(currentDate);
    startDate = startDate.getDate();

    // Getting Leave End Date
    const nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + 1);
    let endDate = getWorkingDay(nextDate);
    endDate = endDate.getDate();

    cy.get('div:nth-child(1) > div > div:nth-child(1) > div > div:nth-child(2) > div > div > input').click();
    cy.get('div.oxd-calendar-date').contains(startDate).click();
    cy.wait(2000);
    cy.get('div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > input').click();
    cy.get('div.oxd-calendar-date').contains(endDate).click();

    cy.get('div:nth-child(4) > div > div:nth-child(2) > div > div > div.oxd-select-text--after > i').click();
    cy.get("div[role='listbox'] div[role='option']").contains("CAN - FMLA").click();

    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    cy.get('div.oxd-table').find('div.oxd-table-card > div.oxd-table-row').its('length').then(($row) => {
        cy.get(`div.oxd-table-body > div.oxd-table-card:nth-child(${$row}) > div > div.oxd-table-cell > div`).contains(`Going out of station due to personal work ${randNum}`);
    });
})