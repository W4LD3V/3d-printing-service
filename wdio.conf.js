import type { Options } from "@wdio/types";

export const config: Options.Testrunner = {
  bail: 0,
  connectionRetryCount: 3,
  connectionRetryTimeout: 120_000,
  framework: "cucumber",
  logLevel: "error",
  maxInstances: 1,
  reporters: ["spec"],
  runner: "local",
  specs: ["./tests/features/**/*.feature"],
  waitforTimeout: 10_000,
  baseUrl: "http://localhost:3000",
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--headless",
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
      },
    },
  ],
  cucumberOpts: {
    backtrace: false,
    dryRun: false,
    failFast: false,
    ignoreUndefinedDefinitions: false,
    require: ["./tests/step-definitions/*.ts"],
    requireModule: ["ts-node/register"],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 60_000,
  },
};
