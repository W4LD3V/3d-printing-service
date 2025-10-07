// Setup file to ensure proper Cucumber initialization
const { setWorldConstructor } = require("@cucumber/cucumber");

// Custom world constructor
class CustomWorld {
  constructor() {
    // Add any custom properties or methods here
  }
}

setWorldConstructor(CustomWorld);
