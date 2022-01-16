import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    ".+\\.(svg|css|styl|less|sass|scss|png|jpg|jpeg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
};

export default config;
