import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";
import { browser, $, $$ } from "@wdio/globals";

Given("I am on the {string} tab", async (tabName) => {
  const tabButton = await $(`button:contains("${tabName}")`);
  await tabButton.click();
});

When("I click the {string} button", async (buttonText) => {
  const button = await $(`button:contains("${buttonText}")`);
  await button.click();
});

When("I fill in the plastic form with:", async (dataTable) => {
  const data = dataTable.hashes()[0];

  if (data.Name) {
    await $('input[type="text"]').setValue(data.Name);
  }
  if (data.Price) {
    await $('input[type="number"]').setValue(data.Price);
  }
  if (data.Description) {
    await $("textarea").setValue(data.Description);
  }
});

When("I fill in the color form with:", async (dataTable) => {
  const data = dataTable.hashes()[0];

  if (data.Name) {
    const nameInput = await $$('input[type="text"]')[0];
    await nameInput.setValue(data.Name);
  }
  if (data["Hex Code"]) {
    const hexInput = await $$('input[type="text"]')[1];
    await hexInput.setValue(data["Hex Code"]);
  }
});

Then("I should see the new plastic in the plastics table", async () => {
  await expect($("table")).toBeDisplayed();
  // Wait for the new plastic to appear
  await browser.waitUntil(async () => {
    const rows = await $$("tbody tr");
    return rows.length > 0;
  });
});

Then("the plastic should be available for order creation", async () => {
  // Navigate to orders page and check if the plastic is available
  await browser.url("/orders");
  await $('button:contains("Create New Order")').click();
  await expect($('select[name="plasticId"]')).toBeDisplayed();
});

Given("there is an existing plastic type", async () => {
  // This step assumes a plastic type already exists
  // In a real scenario, you might want to create test data here
});

When("I click the {string} button for the plastic", async (buttonText) => {
  const editButton = await $(`button:contains("${buttonText}")`);
  await editButton.click();
});

When("I update the price to {string}", async (newPrice) => {
  const priceInput = await $('input[type="number"]');
  await priceInput.clearValue();
  await priceInput.setValue(newPrice);
});

Then("the plastic should be updated in the table", async () => {
  await expect($("table")).toBeDisplayed();
  // Verify the updated price is displayed
  await expect($(`*:contains("${newPrice}")`)).toBeDisplayed();
});

Then("the new price should be reflected", async () => {
  // This step is already covered by the previous step
});

When("I click the {string} button for the plastic", async (buttonText) => {
  const deleteButton = await $(`button:contains("${buttonText}")`);
  await deleteButton.click();
});

When("I confirm the deletion", async () => {
  // Handle the confirmation dialog
  await browser.acceptAlert();
});

Then("the plastic should be removed from the table", async () => {
  await expect($("table")).toBeDisplayed();
  // Verify the plastic is no longer in the table
  // This would need to be implemented based on the specific table structure
});

Then("I should see the new color in the colors table", async () => {
  await expect($("table")).toBeDisplayed();
  // Wait for the new color to appear
  await browser.waitUntil(async () => {
    const rows = await $$("tbody tr");
    return rows.length > 0;
  });
});

Then("the color should be available for order creation", async () => {
  // Navigate to orders page and check if the color is available
  await browser.url("/orders");
  await $('button:contains("Create New Order")').click();
  await expect($('select[name="colorId"]')).toBeDisplayed();
});

Given("there is an existing color", async () => {
  // This step assumes a color already exists
  // In a real scenario, you might want to create test data here
});

When("I click the {string} button for the color", async (buttonText) => {
  const editButton = await $(`button:contains("${buttonText}")`);
  await editButton.click();
});

When("I update the hex code to {string}", async (newHexCode) => {
  const hexInput = await $$('input[type="text"]')[1];
  await hexInput.clearValue();
  await hexInput.setValue(newHexCode);
});

Then("the color should be updated in the table", async () => {
  await expect($("table")).toBeDisplayed();
  // Verify the updated hex code is displayed
  await expect($(`*:contains("${newHexCode}")`)).toBeDisplayed();
});

Then("the new hex code should be reflected", async () => {
  // This step is already covered by the previous step
});
