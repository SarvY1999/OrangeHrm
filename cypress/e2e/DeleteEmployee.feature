Feature: Delete existing employee

  Scenario: As a user i want to delete employee information
    Given Prerequisites Create an Employee
    Given Login to OrangeHRM using Valid credentials
    When Navigate to PIM module
    And Search for existing employee
    And Click On Delete button
    Then Verify if Employee is successfully deleted
