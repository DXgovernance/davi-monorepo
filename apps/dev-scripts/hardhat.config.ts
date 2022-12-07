import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import moment from "moment";
require('@nomiclabs/hardhat-truffle5');
import "@typechain/hardhat";
import "hardhat-ethernal";
import "hardhat-deploy";

dotenv.config();

const MNEMONIC = process.env.MNEMONIC;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.5.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },      
    ],
  },

  external: {
    contracts: [
      {
        artifacts: "artifacts",
        deploy: "node_modules/dxdao-contracts/deploy"
      }
    ]
  },

  networks: {
    hardhat: {
      accounts: { mnemonic: MNEMONIC },
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      gasPrice: 10000000000,
      initialDate: moment.unix(0).toDate().toString(),
      chainId: 1337,
      mining: {
        auto: true,
        interval: 5000,
      },
    }
  },

  ethernal: {
    email: process.env.ETHERNAL_EMAIL,
    password: process.env.ETHERNAL_PASSWORD,
    disableSync: false, // If set to true, plugin will not sync blocks & txs
    disableTrace: false, // If set to true, plugin won't trace transaction
    workspace: 'localhost', // Set the workspace to use, will default to the default workspace (latest one used in the dashboard). It is also possible to set it through the ETHERNAL_WORKSPACE env variable
    uploadAst: false, // If set to true, plugin will upload AST, and you'll be able to use the storage feature (longer sync time though)
    disabled: !process.env.ETHERNAL_PASSWORD && !process.env.ETHERNAL_EMAIL, // If set to true, the plugin will be disabled, nohting will be synced, ethernal.push won't do anything either
    resetOnStart: 'localhost', // Pass a workspace name to reset it automatically when restarting the node, note that if the workspace doesn't exist it won't error
  },

  namedAccounts: {
    deployer: 0,
    tokenHolder: 1,
  },

  deterministicDeployment: {
    1337: {
      factory: "0x4e59b44847b379578588920ca78fbf26c0b4956c",
      deployer: "0x3fab184622dc19b6109349b94811493bf2a45362",
      funding: "1000000000000000000000",
      signedTx: "0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222",
    }
  }
};

export default config;
