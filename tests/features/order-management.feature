Feature: Order Management
  As a logged-in user
  I want to create and view orders
  So that I can get my 3D models printed

  Background:
    Given the application is running
    And I am logged in as "user@example.com" with password "user123"

  Scenario: Create a new order
    Given I am on the orders page
    When I click the "Create New Order" button
    And I fill in the order form with:
      | Field | Value |
      | Model URL | https://example.com/model.stl |
      | Plastic Type | PLA |
      | Color | White |
    And I click the "Create Order" button
    Then I should see the new order in the order list
    And the order should have status "PENDING"

  Scenario: View order history
    Given I have existing orders
    When I navigate to the orders page
    Then I should see a list of my orders
    And each order should display:
      | Field |
      | Order ID |
      | Model URL |
      | Plastic Type |
      | Color |
      | Status |
      | Total Price |
      | Created Date |

  Scenario: View order details
    Given I have an existing order
    When I view the order details
    Then I should see all order information
    And I should see the plastic type and color details
