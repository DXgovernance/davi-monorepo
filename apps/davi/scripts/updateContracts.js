const path = require('path');
const fs = require('fs');

const CONTRACTS = {
  BaseERC20Guild: 'BaseERC20Guild',
  ERC20GuildUpgradeable: 'ERC20GuildUpgradeable',
  SnapshotERC20Guild: 'SnapshotERC20Guild',
  SnapshotRepERC20Guild: 'SnapshotRepERC20Guild',
  DXDGuild: 'DXDGuild',
  DAOAvatar: 'DAOAvatar',
  DAOController: 'DAOController',
  VotingMachine: 'VotingMachine',
  DAOReputation: 'DAOReputation',
};

const artifactsPath = {
  [CONTRACTS.BaseERC20Guild]:
    'dxdao-contracts/artifacts/contracts/erc20guild/BaseERC20Guild.sol/BaseERC20Guild.json',
  [CONTRACTS.ERC20GuildUpgradeable]:
    'dxdao-contracts/artifacts/contracts/erc20guild/ERC20GuildUpgradeable.sol/ERC20GuildUpgradeable.json',
  [CONTRACTS.SnapshotERC20Guild]:
    'dxdao-contracts/artifacts/contracts/erc20guild/implementations/SnapshotERC20Guild.sol/SnapshotERC20Guild.json',
  [CONTRACTS.SnapshotRepERC20Guild]:
    'dxdao-contracts/artifacts/contracts/erc20guild/implementations/SnapshotRepERC20Guild.sol/SnapshotRepERC20Guild.json',
  [CONTRACTS.DXDGuild]:
    'dxdao-contracts/artifacts/contracts/erc20guild/implementations/DXDGuild.sol/DXDGuild.json',
  [CONTRACTS.DAOAvatar]:
    'dxdao-contracts/artifacts/contracts/dao/DAOAvatar.sol/DAOAvatar.json',
  [CONTRACTS.DAOController]:
    'dxdao-contracts/artifacts/contracts/dao/DAOController.sol/DAOController.json',
  [CONTRACTS.VotingMachine]:
    'dxdao-contracts/artifacts/contracts/dao/votingMachine/VotingMachine.sol/VotingMachine.json',
  [CONTRACTS.DAOReputation]:
    'dxdao-contracts/artifacts/contracts/dao/DAOReputation.sol/DAOReputation.json',
};

const contractsPath = {
  [CONTRACTS.BaseERC20Guild]: '../src/contracts/BaseERC20Guild.json',
  [CONTRACTS.ERC20GuildUpgradeable]:
    '../src/contracts/ERC20GuildUpgradeable.json',
  [CONTRACTS.SnapshotERC20Guild]: '../src/contracts/SnapshotERC20Guild.json',
  [CONTRACTS.SnapshotRepERC20Guild]:
    '../src/contracts/SnapshotRepERC20Guild.json',
  [CONTRACTS.DXDGuild]: '../src/contracts/DXDGuild.json',
  [CONTRACTS.DAOAvatar]: '../src/contracts/DAOAvatar.json',
  [CONTRACTS.DAOController]: '../src/contracts/DAOController.json',
  [CONTRACTS.VotingMachine]: '../src/contracts/VotingMachine.json',
  [CONTRACTS.DAOReputation]: '../src/contracts/DAOReputation.json',
};

(function () {
  Object.values(CONTRACTS).forEach(contractName => {
    console.log('Updating src/contracts/', contractName);
    try {
      const json = require(artifactsPath[contractName]);
      const contractPath = contractsPath[contractName];

      fs.writeFileSync(
        path.resolve(__dirname, contractPath),
        JSON.stringify(json, null, 2)
      );
    } catch (e) {
      console.log(e);
      console.log(contractName);
    }
  });
})();
