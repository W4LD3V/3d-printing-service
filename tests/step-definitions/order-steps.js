const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@wdio/globals");
const { browser, $, $$ } = require("@wdio/globals");

// Navigation steps
Given("I am on the orders page", async () => {
  await browser.url("/orders");
});

When("I navigate to the orders page", async () => {
  await browser.url("/orders");
});

// Modal interaction steps

Given("the order creation modal is open", async () => {
  // Click the create order button to open modal
  const createButton = await $(
    '//button[contains(text(), "Create New Order")]'
  );
  await createButton.click();

  // Wait for modal to appear
  await browser.waitUntil(async () => {
    const modal = await $(".fixed.inset-0");
    return await modal.isDisplayed();
  });
});

// Form filling steps
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
  if (data["Color"]) {
    await $('select[name="colorId"]').selectByVisibleText(data["Color"]);
  }
});

// Verification steps
Then("I should see the orders page", async () => {
  const url = await browser.getUrl();
  expect(url).toContain("/orders");

  // Check for orders page content
  const pageTitle = await $("h1, h2");
  await expect(pageTitle).toBeDisplayed();
});

Then("I should see the order creation modal", async () => {
  const modal = await $(".fixed.inset-0");
  await expect(modal).toBeDisplayed();
});

Then("I should see the {string} field", async (fieldName) => {
  let selector = "";
  switch (fieldName) {
    case "Model URL":
      selector = 'input[name="modelUrl"]';
      break;
    case "Plastic Type":
      selector = 'select[name="plasticId"]';
      break;
    case "Color":
      selector = 'select[name="colorId"]';
      break;
    default:
      selector = `input[name="${fieldName.toLowerCase().replace(" ", "")}"]`;
  }

  const field = await $(selector);
  await expect(field).toBeDisplayed();
});

Then("I should see the {string} dropdown", async (dropdownName) => {
  let selector = "";
  switch (dropdownName) {
    case "Plastic Type":
      selector = 'select[name="plasticId"]';
      break;
    case "Color":
      selector = 'select[name="colorId"]';
      break;
    default:
      selector = `select[name="${dropdownName
        .toLowerCase()
        .replace(" ", "")}"]`;
  }

  const dropdown = await $(selector);
  await expect(dropdown).toBeDisplayed();
});

Then("the form should be filled correctly", async () => {
  // Verify the form fields have the expected values
  const modelUrlField = await $('input[name="modelUrl"]');
  const modelUrlValue = await modelUrlField.getValue();
  expect(modelUrlValue).toContain("example.com/model.stl");

  const plasticSelect = await $('select[name="plasticId"]');
  const plasticValue = await plasticSelect.getValue();
  expect(plasticValue).toBeTruthy();

  const colorSelect = await $('select[name="colorId"]');
  const colorValue = await colorSelect.getValue();
  expect(colorValue).toBeTruthy();
});

Then("the order creation modal should be closed", async () => {
  const modal = await $(".fixed.inset-0");
  await expect(modal).not.toBeDisplayed();
});
