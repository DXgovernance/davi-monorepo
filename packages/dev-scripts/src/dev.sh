#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

hardhat_running() {
  nc -z localhost 8545
}

start_hardhat_node() {
  hardhat node --hostname 0.0.0.0 --export "build/deployment-info.json" | grep -vE 'eth_getBlockByNumber|eth_getBlockByHash|eth_getTransactionReceipt|Mined empty block|eth_getLogs|eth_call|Transaction|From|To|Value|Gas used|Block|Contract deployment|Contract address|Contract call|eth_chainId|eth_blockNumber|eth_accounts' &
  # We can add --tags LocalhostGuild,PermissionRegistry,etc.. with the deployments we want to trigger for localhost. By default all deployment files in /deploy folder will be trigger
  echo "Waiting for hardhat to launch..."

  while ! hardhat_running; do
    sleep 0.1 # wait for 1/10 of the second before check again
  done

  echo "Harhat node launched!"
}

if hardhat_running; then
  echo "Killing existent hardhat"
  kill $(lsof -t -i:8545) 
fi


start_hardhat_node
node ./src/buildConfig.js
node ./src/updateProjectsConfig.js
pnpm hardhat run ./src/updateAbis.js 
hardhat run ./src/development.js --network localhost
echo "Hardhat node running locally"