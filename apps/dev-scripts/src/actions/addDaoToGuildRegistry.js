const path = require("path");
const fs = require("fs");
const hre = require("hardhat");

const addressesFilePath = path.resolve(__dirname, "../../build/addresses.json");

// const wait = (s = 1) =>
//   new Promise((resolve) => setTimeout(() => resolve(), s * 1000));

async function main() {
  console.log(
    "Executing apps/dev-scripts/src/actions/addDaoToGuildRegistry.js"
  );
  if (fs.existsSync(addressesFilePath)) {
    // await wait(10);
    const addresses = require(addressesFilePath);
    const GuildRegistry = await hre.artifacts.require("GuildRegistry");
    //   const daoAvatar = await hre.deployments.get("DAOAvatar");
    //   const guildRegistryDeployed = await hre.deployments.get("GuildRegistry");
    console.log("deployments", await hre.deployments.all());
    const guildRegistry = await GuildRegistry.at(addresses.GuildRegistry);

    await guildRegistry.addGuild(addresses.DAOAvatar);
  } else {
    console.log("No deployments found");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
