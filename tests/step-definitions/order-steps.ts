import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";
import { browser, $ } from "@wdio/globals";

Given(
  "I am logged in as {string} with password {string}",
  async (email, password) => {
    await browser.url("/auth/signin");
    await $('input[name="email"]').setValue(email);
    await $('input[name="password"]').setValue(password);
    await $('button[type="submit"]').click();
    await browser.waitUntil(async () => {
      return (
        (await browser.getUrl().includes("/")) &&
        !(await browser.getUrl().includes("/auth/signin"))
      );
    });
  }
);

When("I click the {string} button", async (buttonText) => {
  const button = await $(`button:contains("${buttonText}")`);
  await button.click();
});

When("I fill in the order form with:", async (dataTable) => {
  const data = dataTable.hashes()[0];

  if (data["Model URL"]) {
    await $('input[name="modelUrl"]').setValue(data["Model URL"]);
  }
  if (data["Plastic Type"]) {
    await $('select[name="plasticId"]').selectByVisibleText(
      data["Plastic Type"]
    );
  }
  if (data.Color) {
    await $('select[name="colorId"]').selectByVisibleText(data.Color);
  }
});

Then("I should see the new order in the order list", async () => {
  await expect($(".grid")).toBeDisplayed();
  // Wait for the order to appear
  await browser.waitUntil(async () => {
    const orders = await $$(".grid > div");
    return orders.length > 0;
  });
});

Then("the order should have status {string}", async (status) => {
  const statusElement = await $(`.bg-${status.toLowerCase()}-100`);
  await expect(statusElement).toBeDisplayed();
});

Given("I have existing orders", async () => {
  // This step assumes orders already exist from previous test runs
  // In a real scenario, you might want to create test data here
});

When("I navigate to the orders page", async () => {
  await browser.url("/orders");
});

Then("I should see a list of my orders", async () => {
  await expect($(".grid")).toBeDisplayed();
});

Then("each order should display:", async (dataTable) => {
  const fields = dataTable.hashes().map((row) => row.Field);

  for (const field of fields) {
    // Check that the field is displayed in the order cards
    const fieldElement = await $(`*:contains("${field}")`);
    await expect(fieldElement).toBeDisplayed();
  }
});

Given("I have an existing order", async () => {
  // This step assumes an order already exists
  // In a real scenario, you might want to create test data here
});

When("I view the order details", async () => {
  // Click on the first order to view details
  const firstOrder = await $(".grid > div:first-child");
  await firstOrder.click();
});

Then("I should see all order information", async () => {
  // Verify that order details are displayed
  await expect($("h3")).toBeDisplayed();
});

Then("I should see the plastic type and color details", async () => {
  // Verify that plastic and color information is displayed
  await expect($('*:contains("Plastic:")')).toBeDisplayed();
  await expect($('*:contains("Color:")')).toBeDisplayed();
});
