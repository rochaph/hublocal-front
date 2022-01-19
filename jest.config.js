module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    ".+\\.(svg|css|styl|less|sass|scss|png|jpg|jpeg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
};
