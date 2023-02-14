import { log } from '@graphprotocol/graph-ts';
import { OwnershipTransferred } from '../../types/DAOAvatar/DAOAvatar';
import { DAOController as DAOControllerContract } from '../../types/DAOController/DAOController';

import { DAO } from '../../types/schema';

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const daoId = event.address;
  const controllerAddress = event.params.newOwner;

  const controllerContract = DAOControllerContract.bind(controllerAddress);
  const repToken = controllerContract.try_getDaoReputation();

  const dao = new DAO(daoId.toHexString());
  dao.controllerAddress = controllerAddress.toHexString();

  if (repToken.reverted) return;
  else dao.reputationToken = repToken.value.toHexString();

  dao.save();
}

