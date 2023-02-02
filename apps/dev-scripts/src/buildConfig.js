const path = require("path");
const fs = require("fs");

const deploymentInfo = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../deployment-info.json"))
);

const config = Object.entries(deploymentInfo.contracts).reduce(
  (acc, [contractName, { address }]) => {
    return {
      ...acc,
      [contractName]: address,
    };
  },
  {}
);

fs.writeFileSync(
  path.resolve(__dirname, "deployed-addresses.json"),
  JSON.stringify(config)
);
