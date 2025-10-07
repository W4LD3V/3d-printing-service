Feature: Basic Order Functionality
  As a logged-in user
  I want to be able to create and view orders
  So that I can use the 3D printing service

  Background:
    Given I am logged in

  Scenario: User can access orders page when logged in
    When I navigate to the orders page
    Then I should see the orders page
    And I should see the "Create New Order" button

  Scenario: User can open order creation modal
    Given I am on the orders page
    When I click the "Create New Order" button
    Then I should see the order creation modal
    And I should see the "Model URL" field
    And I should see the "Plastic Type" dropdown
    And I should see the "Color" dropdown

  Scenario: User can fill order form
    Given I am on the orders page
    And the order creation modal is open
    When I fill in the order form with:
      | Model URL                    | Plastic Type | Color |
      | https://example.com/model.stl | PLA          | Red   |
    Then the form should be filled correctly

  Scenario: User can close order creation modal
    Given I am on the orders page
    And the order creation modal is open
    When I click the "Cancel" button
    Then the order creation modal should be closed
