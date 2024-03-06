const { execSync } = require("node:child_process");

module.exports = {
  plugins: [
    [
      "transform-define",
      {
        __MFUNSPLAYER_VERSION__: require("./package.json").version,
        __MFUNSPLAYER_GIT_HASH__: execSync("git rev-parse HEAD").toString().trim().substring(0, 7),
      },
    ],
  ],
};
