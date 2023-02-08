const path = require("path");
const fs = require("fs");
const Web3 = require("web3");

console.log("Executing apps/dev-scripts/src/buildConfig.js");
const deploymentInfo = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../build/deployment-info.json"))
);

const config = Object.entries(deploymentInfo.contracts).reduce(
  (acc, [contractName, { address, abi }]) => {
    return {
      ...acc,
      addresses: {
        ...acc.addresses,
        [contractName]: address,
      },
      abis: {
        ...acc.abis,
        [contractName]: abi,
      },
    };
  },
  {}
);

const GUILD_TYPES = {
  SnapshotRepERC20Guild: "SnapshotRepERC20Guild",
  SnapshotERC20Guild: "SnapshotERC20Guild",
  ERC20Guild: "ERC20Guild",
  DXDGuild: "DXDGuild",
};

const FEATURES = {
  reputation: "REP",
  snapshot: "SNAPSHOT",
};

const paths = {
  [GUILD_TYPES.ERC20Guild]:
    "../artifacts/contracts/erc20guild/ERC20Guild.sol/ERC20Guild.json",
  [GUILD_TYPES.SnapshotRepERC20Guild]:
    "../artifacts/contracts/erc20guild/implementations/SnapshotRepERC20Guild.sol/SnapshotRepERC20Guild.json",
  [GUILD_TYPES.SnapshotERC20Guild]:
    "../artifacts/contracts/erc20guild/implementations/SnapshotERC20Guild.sol/SnapshotERC20Guild.json",
  [GUILD_TYPES.DXDGuild]:
    "../artifacts/contracts/erc20guild/implementations/DXDGuild.sol/DXDGuild.json",
};

const getGuildFeatures = (guildType) => {
  switch (guildType) {
    case GUILD_TYPES.SnapshotRepERC20Guild:
      return [FEATURES.reputation, FEATURES.snapshot];
    case GUILD_TYPES.SnapshotERC20Guild:
      return [FEATURES.snapshot];
    case GUILD_TYPES.DXDGuild:
    case GUILD_TYPES.ERC20Guild:
      return [];
    default:
      return [];
  }
};

function createBytecodes() {
  const data = Object.entries(paths).reduce((acc, [type, path]) => {
    try {
      const json = require(path);
      return [
        ...acc,
        {
          type,
          bytecodeHash: Web3.utils.keccak256(json.bytecode),
          deployedBytecodeHash: Web3.utils.keccak256(json.deployedBytecode),
          features: getGuildFeatures(type),
        },
      ];
    } catch (e) {
      console.error(
        `[updateDeployedBytecodes.js] File was not found: ${path}. Skipping ${type} \n`,
        e
      );
      return acc;
    }
  }, []);

  fs.writeFileSync(
    path.resolve(__dirname, "../build/bytecodes.json"),
    JSON.stringify(data, null, 2)
  );
}

// create build dir
if (!fs.existsSync(path.resolve(__dirname, "../build"))) {
  fs.mkdirSync(path.resolve(__dirname, "../build"));
}
// Create ./build/addresses.json file
fs.writeFileSync(
  path.resolve(__dirname, "../build/addresses.json"),
  JSON.stringify(config.addresses)
);
// Create ./build/abis.json file
fs.writeFileSync(
  path.resolve(__dirname, "../build/abis.json"),
  JSON.stringify(config.abis)
);

createBytecodes();
