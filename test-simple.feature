Feature: Simple test
  Scenario: Navigate to signup page
    Given I am on the homepage
    When I click the Get Started button
    Then I should be redirected to the signup page
