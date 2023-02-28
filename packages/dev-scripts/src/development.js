const hre = require("hardhat");

/**
 * This script is intended to add custom actions to deployed contracts in
 * localhost required in develop env before building dapps
 */

async function main() {
  console.log("Executing develoment scripts");
  // Build develop-related actions here using hre.deployments
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
