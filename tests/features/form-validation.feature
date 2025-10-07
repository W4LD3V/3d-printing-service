Feature: Form Validation and Submission
  As a user
  I want to test form validation and submission
  So that I can ensure the app handles user input correctly

  Scenario: User sees error when trying to register existing user
    Given I am on the signup page
    When I fill in the signup form with:
      | Name            | Email                | Password | Confirm Password |
      | Test User       | user@example.com     | user123  | user123          |
           And I click the "Create account" button
    Then I should see an error message

  Scenario: User sees validation error for empty signup form
    Given I am on the signup page
           When I click the "Create account" button
    Then the form should show HTML5 validation

  Scenario: User sees validation error for mismatched passwords
    Given I am on the signup page
    When I fill in the signup form with:
      | Name            | Email                | Password | Confirm Password |
      | Test User       | user@example.com     | user123  | different123     |
           And I click the "Create account" button
    Then I should see a validation error for password mismatch

  Scenario: User can successfully sign in with valid credentials
    Given I am on the signin page
    When I fill in the signin form with:
      | Email           | Password |
      | user@example.com | user123 |
           And I click the "Sign in" button
    Then I should be redirected to the home page
    And I should see the navigation menu

  Scenario: User sees validation error for empty signin form
    Given I am on the signin page
           When I click the "Sign in" button
    Then the form should show HTML5 validation
