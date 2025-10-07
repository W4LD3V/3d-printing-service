Feature: User Authentication
  As a user
  I want to be able to register and login
  So that I can access the 3D printing platform

  Background:
    Given the application is running

  Scenario: User registration
    Given I am on the signup page
    When I fill in the registration form with:
      | Field | Value |
      | Name | Test User |
      | Email | test@example.com |
      | Password | password123 |
      | Confirm Password | password123 |
    And I click the "Create account" button
    Then I should be redirected to the signin page
    And I should see a success message

  Scenario: User login
    Given I am on the signin page
    When I fill in the login form with:
      | Field | Value |
      | Email | user@example.com |
      | Password | user123 |
    And I click the "Sign in" button
    Then I should be redirected to the home page
    And I should see the navigation menu

  Scenario: Invalid login credentials
    Given I am on the signin page
    When I fill in the login form with:
      | Field | Value |
      | Email | invalid@example.com |
      | Password | wrongpassword |
    And I click the "Sign in" button
    Then I should see an error message
    And I should remain on the signin page
