import type { Config } from "@wdio/types";

export const config: Config = {
  runner: "local",
  specs: ["./tests/features/**/*.feature"],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
    },
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "http://localhost:3000",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["selenium-standalone"],
  framework: "cucumber",
  reporters: ["spec"],
  cucumberOpts: {
    require: ["./tests/step-definitions/**/*.ts"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    format: ["pretty"],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
