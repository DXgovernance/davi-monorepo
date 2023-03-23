require("dotenv").config();
const baseConfig = require("./hardhat.config.base");
// const baseConfig = require("@dx-gov-test/dxdao-contracts/hardhat.config");

// Modify default config to work with develoment env by extending dxdao-contracts hardhat.config
function getConfig(config) {
  config.networks.hardhat.chainId = 1337;
  config.networks.hardhat.loggingEnabled = false;

  config.ethernal = {
    email: process.env.ETHERNAL_EMAIL,
    password: process.env.ETHERNAL_PASSWORD,
    disableSync: false, // If set to true, plugin will not sync blocks & txs
    disableTrace: false, // If set to true, plugin won't trace transaction
    workspace: "localhost", // Set the workspace to use, will default to the default workspace (latest one used in the dashboard). It is also possible to set it through the ETHERNAL_WORKSPACE env variable
    uploadAst: false, // If set to true, plugin will upload AST, and you'll be able to use the storage feature (longer sync time though)
    disabled: !process.env.ETHERNAL_PASSWORD && !process.env.ETHERNAL_EMAIL, // If set to true, the plugin will be disabled, nohting will be synced, ethernal.push won't do anything either
    resetOnStart: "localhost", // Pass a workspace name to reset it automatically when restarting the node, note that if the workspace doesn't exist it won't error
  };

  // config.typechain = null;

  return config;
}

module.exports = getConfig(baseConfig);
