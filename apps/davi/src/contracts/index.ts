const PermissionRegistry = require('./PermissionRegistry');
const DAOController = require('./DAOController');
const DAOAvatar = require('./DAOAvatar');
const DAOReputation = require('./DAOReputation');
const VotingMachine = require('./VotingMachine');
const GenesisProtocol = require('./GenesisProtocol');
const ERC20 = require('./ERC20');
const Multicall = require('./Multicall');
const VestingFactory = require('./ERC20VestingFactory');

export const getContracts = async function (
  networkConfig: NetworkContracts,
  web3: any
) {
  const avatar = await new web3.eth.Contract(
    DAOAvatar.abi,
    networkConfig.avatar
  );
  const controller = await new web3.eth.Contract(
    DAOController.abi,
    networkConfig.controller
  );
  const reputation = await new web3.eth.Contract(
    DAOReputation.abi,
    networkConfig.reputation
  );
  const permissionRegistry = await new web3.eth.Contract(
    PermissionRegistry.abi,
    networkConfig.permissionRegistry
  );
  const multicall = await new web3.eth.Contract(
    Multicall.abi,
    networkConfig.utils.multicall
  );
  const vestingFactory =
    networkConfig.utils.dxdVestingFactory &&
    (await new web3.eth.Contract(
      VestingFactory.abi,
      networkConfig.utils.dxdVestingFactory
    ));

  let votingMachines = {};

  for (const votingMachineAddress in networkConfig.votingMachines) {
    if (
      networkConfig.votingMachines[votingMachineAddress].type ===
      'GenesisProtocol'
    )
      votingMachines[votingMachineAddress] = {
        name: 'GenesisProtocol',
        contract: await new web3.eth.Contract(
          GenesisProtocol.abi,
          votingMachineAddress
        ),
        token: await new web3.eth.Contract(
          ERC20.abi,
          networkConfig.votingMachines[votingMachineAddress].token
        ),
      };
    else if (
      networkConfig.votingMachines[votingMachineAddress].type ===
      'VotingMachine'
    )
      votingMachines[votingMachineAddress] = {
        name: 'VotingMachine',
        contract: await new web3.eth.Contract(
          VotingMachine.abi,
          votingMachineAddress
        ),
        token: await new web3.eth.Contract(
          ERC20.abi,
          networkConfig.votingMachines[votingMachineAddress].token
        ),
      };
  }

  return {
    votingMachines,
    avatar,
    controller,
    reputation,
    permissionRegistry,
    multicall,
    vestingFactory,
  };
};
