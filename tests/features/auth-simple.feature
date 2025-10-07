Feature: Simple Authentication Tests
  As a user
  I want to test basic authentication functionality
  So that I can verify the app works correctly

  Scenario: User can navigate to signup page
    Given I am on the homepage
    When I click the "Get Started" button
    Then I should be redirected to the signup page

  Scenario: User can navigate to signin page
    Given I am on the homepage
    When I click the "Sign In" button
    Then I should be redirected to the signin page

  Scenario: Protected routes redirect to signin when not authenticated
    Given I am not logged in
    When I try to access the orders page
    Then I should be redirected to the signin page
