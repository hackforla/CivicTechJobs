// Or async function
module.exports = async () => {
  return {
    verbose: true,
    moduleFileExtensions: ["js", "jsx"],
    moduleDirectories: ["node_modules", "frontend/src"],
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.js",
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/tests/__mocks__/fileMock.js",
      "\\.(svg)(\\?url)$": "<rootDir>/tests/__mocks__/fileMock.js",
    },
    testEnvironment: "jsdom",
  };
};
