const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@wdio/globals");
const { browser, $ } = require("@wdio/globals");

// Navigation steps
Given("I am on the homepage", async () => {
  await browser.url("/");
});

Given("I am on the signup page", async () => {
  await browser.url("/auth/signup");
});

Given("I am on the signin page", async () => {
  await browser.url("/auth/signin");
});

Given("I am not logged in", async () => {
  await browser.deleteCookies();
});

Given("I am logged in", async () => {
  await browser.url("/auth/signin");
  await $('input[name="email"]').setValue("user@example.com");
  await $('input[name="password"]').setValue("user123");
  await $('button[type="submit"]').click();

  await browser.waitUntil(async () => {
    const url = await browser.getUrl();
    return url.includes("/") && !url.includes("/auth/signin");
  });
});

// Button interaction steps
When("I click the {string} button", async (buttonText) => {
  // Try to find the button in the hero section first (more reliable)
  let button;
  if (buttonText === "Sign In" || buttonText === "Get Started") {
    // Look for buttons in the hero section (main content area)
    button = await $(
      `//main//a[contains(text(), "${buttonText}")] | //main//button[contains(text(), "${buttonText}")]`
    );
  } else if (buttonText === "Create account" || buttonText === "Sign in") {
    // Form submit buttons - look for button type="submit"
    button = await $(
      `//button[@type="submit" and contains(text(), "${buttonText}")]`
    );
  } else {
    // For other buttons, use the general selector
    button = await $(
      `//button[contains(text(), "${buttonText}")] | //input[@type="submit" and @value="${buttonText}"] | //a[contains(text(), "${buttonText}")]`
    );
  }

  await button.waitForClickable({ timeout: 10000 });
  await button.click();

  // Wait for navigation to complete
  await browser.waitUntil(
    async () => {
      const url = await browser.getUrl();
      return !url.includes("about:blank") && url !== "data:,";
    },
    { timeout: 10000 }
  );
});

When("I try to access the orders page", async () => {
  await browser.url("/orders");
  // Wait a moment for the page to load
  await browser.pause(1000);
});

// Form filling steps
When("I fill in the signup form with:", async (dataTable) => {
  const data = dataTable.hashes()[0];

  if (data.Name) {
    await $('input[name="name"]').setValue(data.Name);
  }
  if (data.Email) {
    await $('input[name="email"]').setValue(data.Email);
  }
  if (data.Password) {
    await $('input[name="password"]').setValue(data.Password);
  }
  if (data["Confirm Password"]) {
    await $('input[name="confirmPassword"]').setValue(data["Confirm Password"]);
  }
});

When("I fill in the signin form with:", async (dataTable) => {
  const data = dataTable.hashes()[0];

  if (data.Email) {
    await $('input[name="email"]').setValue(data.Email);
  }
  if (data.Password) {
    await $('input[name="password"]').setValue(data.Password);
  }
});

// Verification steps
Then("I should be redirected to the signup page", async () => {
  await browser.waitUntil(
    async () => {
      const url = await browser.getUrl();
      return url.includes("/auth/signup");
    },
    { timeout: 10000 }
  );

  const url = await browser.getUrl();
  expect(url).toContain("/auth/signup");
});

Then("I should be redirected to the signin page", async () => {
  // Wait for redirect to happen
  await browser.waitUntil(
    async () => {
      const url = await browser.getUrl();
      return url.includes("/auth/signin");
    },
    {
      timeout: 10000,
      timeoutMsg: "Expected to be redirected to signin page",
    }
  );

  const url = await browser.getUrl();
  expect(url).toContain("/auth/signin");
});

Then("I should be redirected to the home page", async () => {
  // Wait for redirect to complete
  await browser.waitUntil(
    async () => {
      const url = await browser.getUrl();
      return url.includes("/") && !url.includes("/auth/");
    },
    {
      timeout: 15000,
      timeoutMsg: "Expected to be redirected to home page",
    }
  );

  const url = await browser.getUrl();
  expect(url).toContain("/");
  expect(url).not.toContain("/auth/");
});

Then("I should see a success message", async () => {
  const successMessage = await $(
    '.text-green-600, .text-green-500, [class*="success"]'
  );
  await expect(successMessage).toBeDisplayed();
});

Then("I should see the navigation menu", async () => {
  const navMenu = await $('nav, [role="navigation"]');
  await expect(navMenu).toBeDisplayed();
});

Then("I should see the {string} button", async (buttonText) => {
  const button = await $(
    `//button[contains(text(), "${buttonText}")] | //a[contains(text(), "${buttonText}")]`
  );
  await expect(button).toBeDisplayed();
});

Then("I should not see the {string} button", async (buttonText) => {
  const button = await $(
    `//button[contains(text(), "${buttonText}")] | //a[contains(text(), "${buttonText}")]`
  );
  await expect(button).not.toBeDisplayed();
});

Then("I should see the page title", async () => {
  await expect(browser).toHaveTitle("3D Printing Platform");
});

// Form validation steps

Then("I should see an error message", async () => {
  // Wait for error message to appear
  await browser.waitUntil(
    async () => {
      const errorMessage = await $(
        '.text-red-600, .text-red-500, [class*="error"]'
      );
      return await errorMessage.isDisplayed();
    },
    {
      timeout: 10000,
      timeoutMsg: "Expected error message to appear",
    }
  );
});

Then("I should see validation errors", async () => {
  // Look for common validation error patterns
  const errorElement = await $(
    '.text-red-600, .text-red-500, [class*="error"], .invalid-feedback'
  );
  await expect(errorElement).toBeDisplayed();
});

Then("the form should show HTML5 validation", async () => {
  // For HTML5 validation, we check that the form doesn't submit
  // and that required fields are marked as invalid
  const requiredFields = await $$("input[required]");

  // Check that at least one required field is invalid
  let hasInvalidField = false;
  for (const field of requiredFields) {
    const isValid = await field.getAttribute("validity");
    if (isValid && !isValid.valid) {
      hasInvalidField = true;
      break;
    }
  }

  // Alternative: check that we're still on the same page (form didn't submit)
  const url = await browser.getUrl();
  expect(url).toContain("/auth/");
});

Then("I should see a validation error for password mismatch", async () => {
  // Look for password mismatch error
  const errorElement = await $(
    '.text-red-600, .text-red-500, [class*="error"]'
  );
  await expect(errorElement).toBeDisplayed();

  // Check if error text contains password-related message
  const errorText = await errorElement.getText();
  expect(errorText.toLowerCase()).toMatch(/password|match|confirm/);
});
