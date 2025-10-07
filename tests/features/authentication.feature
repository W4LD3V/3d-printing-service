Feature: User Authentication
  As a user
  I want to be able to sign up, sign in, and sign out
  So that I can access the application securely

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

  Scenario: User can sign up with valid information
    Given I am on the signup page
    When I fill in the signup form with:
      | Name            | Email                | Password | Confirm Password |
      | Test User       | test@example.com     | password123 | password123     |
    And I click the "Sign Up" button
    Then I should be redirected to the home page
    And I should see a success message

  Scenario: User can sign in with valid credentials
    Given I am on the signin page
    When I fill in the signin form with:
      | Email           | Password |
      | test@example.com | password123 |
    And I click the "Sign In" button
    Then I should be redirected to the home page
    And I should see the navigation menu

  Scenario: User sees different buttons when logged in
    Given I am logged in
    When I am on the homepage
    Then I should see the "Create Order" button
    And I should see the "View Orders" button
    And I should not see the "Get Started" button
