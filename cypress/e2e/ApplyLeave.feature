Feature: Apply for Feature

  Scenario: Apply for Feature
    Given the user is logged in to the OrangeHRM application
    When they navigate to the Leave module
    And click on the Apply button
    And select the type of leave
    And enter the start and end dates for the leave
    And provide any additional information or comments
    And submit the leave request
    Then they should see the leave request successfully submitted and displayed in the leave calendar or list
