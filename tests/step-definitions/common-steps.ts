import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";
import { browser, $ } from "@wdio/globals";

Given("the application is running", async () => {
  await browser.url("/");
  await expect(browser).toHaveTitle("3D Printing Platform");
});

Given("I am on the signup page", async () => {
  await browser.url("/auth/signup");
  await expect($("h2")).toHaveText("Create your account");
});

Given("I am on the signin page", async () => {
  await browser.url("/auth/signin");
  await expect($("h2")).toHaveText("Sign in to your account");
});

Given("I am on the orders page", async () => {
  await browser.url("/orders");
  await expect($("h1")).toHaveText("My Orders");
});

Given("I am on the admin page", async () => {
  await browser.url("/admin");
  await expect($("h1")).toHaveText("Admin Dashboard");
});

When("I fill in the registration form with:", async (dataTable) => {
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

When("I fill in the login form with:", async (dataTable) => {
  const data = dataTable.hashes()[0];

  if (data.Email) {
    await $('input[name="email"]').setValue(data.Email);
  }
  if (data.Password) {
    await $('input[name="password"]').setValue(data.Password);
  }
});

When("I click the {string} button", async (buttonText) => {
  const button = await $(`button:contains("${buttonText}")`);
  await button.click();
});

Then("I should be redirected to the signin page", async () => {
  await expect(browser).toHaveUrlContaining("/auth/signin");
});

Then("I should be redirected to the home page", async () => {
  await expect(browser).toHaveUrlContaining("/");
});

Then("I should see the navigation menu", async () => {
  await expect($("nav")).toBeDisplayed();
});

Then("I should see an error message", async () => {
  await expect($(".text-red-600")).toBeDisplayed();
});

Then("I should remain on the signin page", async () => {
  await expect(browser).toHaveUrlContaining("/auth/signin");
});
