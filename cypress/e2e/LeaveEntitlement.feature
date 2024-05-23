Feature: Assign Leave Entitlement

  Scenario: Verify if user can assign leave Entitlement
    Given Prerequisite create a user which will be used to assign leave entitlement
    Then Navigate to Leave section
    Then select Add Entitlement from Entitlement Dropdown
    Then select Individual Employee and fill all required details by using the user created before and save
    Then verify if leave entitlement is assigned successfully or not
    Then Delete the leave Entitlement and User
