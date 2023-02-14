const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const packageJson = require('../package.json');

const network = 'private';

/**
 * Generate a `subgraph.yaml` file from `datasource.yaml` fragments in
 * `mappings` directory `mappings.json` and `migration.json`
 */
async function generateSubgraph(opts = {}) {
  const addressesFile = path.resolve(`${__dirname}/../networks.json`);
  const subgraphLocation = path.resolve(`${__dirname}/../subgraph.yaml`);
  const addresses = JSON.parse(fs.readFileSync(addressesFile, 'utf-8'));

  const mappingsPath = path.resolve(`${__dirname}/../src/mappings`);
  const contractNames = fs
    .readdirSync(mappingsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const datasourceNames = contractNames.filter(contractName => {
    const contractPath = path.join(mappingsPath, contractName);
    const datasourceFilePath = path.join(contractPath, `datasource.yaml`);
    return fs.existsSync(datasourceFilePath);
  });

  const templateNames = contractNames.filter(contractName => {
    const contractPath = path.join(mappingsPath, contractName);
    const datasourceFilePath = path.join(contractPath, `template.yaml`);
    return fs.existsSync(datasourceFilePath);
  });

  const datasources = datasourceNames.map(datasource =>
    combineFragments(addresses, datasource, false)
  );
  const templates = templateNames.map(template =>
    combineFragments(addresses, template, true)
  );

  const subgraph = {
    specVersion: '0.0.4',
    description: packageJson.description,
    repository: packageJson.repository?.url,
    schema: { file: './schema.graphql' },
    features: ['ipfsOnEthereumContracts'],
  };
  if (datasources.length > 0) subgraph.dataSources = datasources;
  if (templates.length > 0) subgraph.templates = templates;

  fs.writeFileSync(
    subgraphLocation,
    yaml.dump(subgraph, { noRefs: true }),
    'utf-8'
  );
}

function combineFragments(addresses, contractName, isTemplate) {
  const mappingsPath = path.resolve(`${__dirname}/../src/mappings`);
  const contractPath = path.join(mappingsPath, contractName);

  const datasourceFilePath = path.join(contractPath, `datasource.yaml`);
  const templateFilePath = path.join(contractPath, `template.yaml`);
  const filePath = isTemplate ? templateFilePath : datasourceFilePath;
  const fragmentFile = yaml.load(fs.readFileSync(filePath, 'utf-8'));

  const mappingFile = path.join(contractPath, `mapping.ts`);
  const eventHandlers = fragmentFile.eventHandlers;
  const entities = fragmentFile.entities;

  const usedContracts = [
    ...new Set(
      fragmentFile.abis ? [contractName, ...fragmentFile.abis] : [contractName]
    ),
  ];
  const abis = usedContracts.map(contractName => {
    return {
      name: contractName,
      file: path.relative('.', `${__dirname}/../abis/${contractName}.json`),
    };
  });
  const abi = contractName;

  let contractAddress;
  let startBlock;
  if (isTemplate === false) {
    contractAddress = addresses?.[network]?.[contractName]?.address;
    startBlock = addresses?.[network]?.[contractName]?.startBlock || 0;

    if (!contractAddress) {
      throw new Error(
        `No contract address found for ${contractName} on ${network} in networks.json`
      );
    }
  }

  const source = isTemplate
    ? {
        abi,
      }
    : {
        address: contractAddress,
        abi,
        startBlock,
      };

  var result = {
    kind: 'ethereum/contract',
    name: contractName,
    network: network,
    source,
    mapping: {
      kind: 'ethereum/events',
      apiVersion: '0.0.6',
      language: 'wasm/assemblyscript',
      entities: entities ? entities : ['nothing'],
      abis,
      eventHandlers,
      file: path.relative('.', path.resolve(mappingFile)),
    },
  };

  return result;
}

if (require.main === module) {
  generateSubgraph().catch(err => {
    console.log(err);
    process.exit(1);
  });
} else {
  module.exports = generateSubgraph;
}

