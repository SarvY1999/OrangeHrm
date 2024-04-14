Feature: Update existing employee

  Scenario: As a user i want to update employee information
    Given Login to OrangeHRM using Valid credentials
    When Navigate to PIM module
    And Search for existing employee
    And Click On Edit button
    And Update the Employee Details
    And Save employee
    Then Verify if Employee details are successfully updated
