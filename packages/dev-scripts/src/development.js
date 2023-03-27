const hre = require('hardhat');

/**
 * This script is intended to add custom actions to deployed contracts in
 * localhost required in develop env before building dapps
 */

async function main() {
  console.log('Executing develoment scripts');
  // Build develop-related actions here using hre.deployments
  await addDAOAvatarPermissions();
  await transferTokens();
}

async function addDAOAvatarPermissions() {
  const DAOAvatar = await hre.deployments.get('DAOAvatar');

  const PermissionRegistry = await hre.artifacts.require('PermissionRegistry');
  const permissionRegistryDeployed = await hre.deployments.get(
    'PermissionRegistry'
  );
  const permissionRegistry = await PermissionRegistry.at(
    permissionRegistryDeployed.address
  );

  await permissionRegistry.setETHPermission(
    DAOAvatar.address,
    '0x0000000000000000000000000000000000000000',
    '0x00000000',
    0,
    true
  );
}

async function transferTokens() {
  const { getNamedAccounts, deployments } = hre;
  const { tokenHolder, tokenHolder2, tokenHolder3 } = await getNamedAccounts();

  // DXDToken contract
  const dxdTokenDeployed = await deployments.get('ERC20Mock');
  const DXDToken = await hre.artifacts.require('ERC20Mock');
  const dxdToken = await DXDToken.at(dxdTokenDeployed.address);

  await dxdToken.transfer(tokenHolder2, hre.web3.utils.toWei('100'), {
    from: tokenHolder,
  });
  await dxdToken.transfer(tokenHolder3, hre.web3.utils.toWei('100'), {
    from: tokenHolder,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
