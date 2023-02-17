const fs = require("fs");
const path = require("path");

/**
 * This script pull the latest deployment info and feed both davi, guild subgraph and 1.5 subgraph with necesary
 * development bytecodes and addresses created by the latest hardhat deployment
 */

console.log("Executing apps/dev-scripts/src/updateProjectsConfig.js");

const bytecodesFilePath = path.resolve(__dirname, "../build/bytecodes.json");
const addressesFilePath = path.resolve(__dirname, "../build/addresses.json");

if (fs.existsSync(bytecodesFilePath)) {
  const bytecodes = require(bytecodesFilePath);
  const stringBytecodes = JSON.stringify(bytecodes, null, 2);

  // Write bytecodes to davi
  console.log("Writing davi local bytecodes");
  fs.writeFileSync(
    path.resolve(__dirname, "../../../apps/davi/src/bytecodes/local.json"),
    JSON.stringify(bytecodes, null, 2)
  );

  // Write bytecodes to subgraph
  console.log("Writing subgraph local bytecodes");
  fs.writeFileSync(
    path.resolve(
      __dirname,
      "../../../apps/guilds-subgraph/src/mappings/Create2Deployer/local.ts"
    ),
    `export const local = ${JSON.stringify(stringBytecodes)};`
  );
} else {
  console.error(
    "Error:: Missing file: dev-scripts/build/bytecodes.json. Do you forget to run compile script from dev-scripts?. Try with `pnpm run dev --force`"
  );
  process.exit(1);
}

if (fs.existsSync(addressesFilePath)) {
  const addresses = require(addressesFilePath);
  console.log("Using deployed addresses:", addresses);

  // Write addresses to guild subgraph
  console.log("Writing guild subgraph local networks.json");
  fs.writeFileSync(
    path.resolve(__dirname, "../../../apps/guilds-subgraph/networks.json"),
    JSON.stringify(
      {
        private: {
          GuildRegistry: {
            address: addresses.GuildRegistry,
            startBlock: 1,
          },
          PermissionRegistry: {
            address: addresses.PermissionRegistry,
            startBlock: 1,
          },
          Create2Deployer: {
            address: addresses.Create2Deployer,
            startBlock: 1,
          },
        },
      },
      null,
      2
    )
  );

  // Write addresses to 1.5 subgraph
  console.log("Writing 1.5 subgraph local networks.json");
  fs.writeFileSync(
    path.resolve(__dirname, "../../../apps/1-5-subgraph/networks.json"),
    JSON.stringify(
      {
        private: {
          PermissionRegistry: {
            address: addresses.PermissionRegistry,
            startBlock: 1,
          },
          DAOController: {
            address: addresses.DAOController,
            startBlock: 1,
          },
          DAOAvatar: {
            address: addresses.DAOAvatar,
            startBlock: 1,
          },
          DAOReputation: {
            address: addresses.DAOReputation,
            startBlock: 1,
          },
        },
      },
      null,
      2
    )
  );

  // Write addresses to davi
  console.log("Writing davi localhost config.json");
  fs.writeFileSync(
    path.resolve(
      __dirname,
      "../../../apps/davi/src/configs/localhost/config.json"
    ),
    JSON.stringify(
      {
        contracts: {
          utils: {
            guildRegistry: addresses.GuildRegistry,
          },
          votingMachines: {},
        },
      },
      null,
      2
    )
  );
}
