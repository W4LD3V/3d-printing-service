// Simple test to verify WebDriverIO and Cucumber setup
const { Given, When, Then } = require("cucumber");
const { expect } = require("@wdio/globals");
const { browser, $ } = require("@wdio/globals");

console.log("Step definitions loaded successfully");

module.exports = function () {
  Given(/^I am on the homepage$/, async () => {
    console.log("Given step executed");
    await browser.url("/");
    await expect(browser).toHaveTitle("3D Printing Platform");
  });

  When(/^I click the Get Started button$/, async () => {
    console.log("When step executed");
    const button = await $('a[href="/auth/signup"]');
    await button.click();
  });

  Then(/^I should be redirected to the signup page$/, async () => {
    console.log("Then step executed");
    await expect(browser).toHaveUrlContaining("/auth/signup");
  });
};
