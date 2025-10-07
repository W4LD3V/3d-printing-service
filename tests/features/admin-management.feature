Feature: Admin Management
  As an admin user
  I want to manage plastic types and colors
  So that users can select from available options

  Background:
    Given the application is running
    And I am logged in as "admin@example.com" with password "admin123"

  Scenario: Add new plastic type
    Given I am on the admin page
    And I am on the "Manage Plastics" tab
    When I click the "Add New Plastic" button
    And I fill in the plastic form with:
      | Field | Value |
      | Name | Nylon |
      | Price | 40.00 |
      | Description | Strong and flexible material |
    And I click the "Create" button
    Then I should see the new plastic in the plastics table
    And the plastic should be available for order creation

  Scenario: Edit existing plastic type
    Given I am on the admin page
    And I am on the "Manage Plastics" tab
    And there is an existing plastic type
    When I click the "Edit" button for the plastic
    And I update the price to "50.00"
    And I click the "Update" button
    Then the plastic should be updated in the table
    And the new price should be reflected

  Scenario: Delete plastic type
    Given I am on the admin page
    And I am on the "Manage Plastics" tab
    And there is an existing plastic type
    When I click the "Delete" button for the plastic
    And I confirm the deletion
    Then the plastic should be removed from the table

  Scenario: Add new color
    Given I am on the admin page
    And I am on the "Manage Colors" tab
    When I click the "Add New Color" button
    And I fill in the color form with:
      | Field | Value |
      | Name | Purple |
      | Hex Code | #800080 |
    And I click the "Create" button
    Then I should see the new color in the colors table
    And the color should be available for order creation

  Scenario: Edit existing color
    Given I am on the admin page
    And I am on the "Manage Colors" tab
    And there is an existing color
    When I click the "Edit" button for the color
    And I update the hex code to "#FF00FF"
    And I click the "Update" button
    Then the color should be updated in the table
    And the new hex code should be reflected
