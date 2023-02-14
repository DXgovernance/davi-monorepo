const path = require("path");
const fs = require("fs");
const hre = require("hardhat");

const projects = [
  {
    name: "1-5-subgraph",
    targetABIDir: "../../1-5-subgraph/abis",
    targetContracts: [
      "DAOAvatar",
      "DAOController",
      "DAOReputation",
      "VotingMachine",
      "PermissionRegistry",
      "Scheme",
    ],
  },
  {
    name: "guilds-subgraph",
    targetABIDir: "../../guilds-subgraph/abis",
    targetContracts: [
      "BaseERC20Guild",
      "Create2Deployer",
      "ERC20SnapshotRep",
      "ERC20Token",
      "GuildRegistry",
      "PermissionRegistry",
      "SnapshotERC20Guild",
      "SnapshotRepERC20Guild",
    ],
  },
  {
    name: "davi",
    targetABIDir: "../../davi/src/contracts",
    targetContracts: [
      "BaseERC20Guild",
      "DXDGuild",
      "ERC20",
      "ERC20Guild",
      "ERC20GuildUpgradeable",
      "ERC20GuildWithERC1271",
      "ERC20SnapshotRep",
      "ERC20SnapshotUpgradeable",
      "ERC20Token",
      "ERC20TokenVesting",
      "ERC20VestingFactory",
      "ERC721",
      "GuardedERC20Guild",
      "ERC721Factory",
      "Multicall",
      "PermissionRegistry",
      "SnapshotERC20Guild",
      "SnapshotRepERC20Guild",
      "TokenVesting",
      "AvatarScheme",
      "GuildRegistry",
      "MigratableERC20Guild",
      "ProposalExecuteInterface",
      "Scheme",
      "TokenVault",
      "VotingMachine",
      "WalletScheme",
      "Create2Deployer",
    ],
  },
];

async function createArtifacts() {
  const artifacts = await hre.artifacts.getArtifactPaths();

  for (let artifactPath of artifacts) {
    if (fs.existsSync(artifactPath)) {
      const artifact = require(artifactPath);
      const name = artifact.contractName;

      for (let project of projects) {
        const dir = path.resolve(__dirname, project.targetABIDir);

        if (project.targetContracts.includes(name)) {
          if (!fs.existsSync(dir)) {
            console.log("Creating", dir, "folder");
            fs.mkdirSync(dir);
          }
          const filePath = dir + "/" + name + ".json";
          try {
            console.log(
              `Creating ${name} ABI for ${project.name} project -->> ${filePath}`
            );

            fs.writeFileSync(
              path.join(filePath),
              JSON.stringify(artifact, null, 2),
              { flag: "w" }
            );
          } catch (e) {
            console.log("Error creating", filePath, "\n");
            console.error(e);
          }
        }
      }
    }
  }
}

async function main() {
  await createArtifacts();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
