Feature: Add New Employee Feature

  Scenario: Test if User can add new Employee or not
    Given Launch the OrangeHRM application and Login to the application using valid credentials
    Then Navigate to the "PIM" module
    Then Click on the "Add Employee" option
    Then Fill in the required fields for adding a new employee
    And Click on the "Save" button
    Then Verify that the employee has been successfully added
