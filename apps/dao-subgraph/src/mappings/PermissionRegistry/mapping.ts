import { BigInt } from '@graphprotocol/graph-ts';

import { PermissionSet } from '../../types/PermissionRegistry/PermissionRegistry';
import { Permission } from '../../types/schema';

export function handlePermissionSet(event: PermissionSet): void {
  const permissionId = `${event.params.from.toHexString()}-${event.params.to.toHexString()}-${event.params.functionSignature.toHexString()}`;

  let permission = Permission.load(permissionId);
  if (!permission) {
    permission = new Permission(permissionId);
  }

  permission.from = event.params.from.toHexString();
  permission.to = event.params.to.toHexString();
  permission.functionSignature = event.params.functionSignature.toHexString();
  permission.valueAllowed = event.params.value;
  permission.fromTime = event.params.fromTime;
  permission.allowed = !(
    event.params.value.equals(new BigInt(0)) &&
    event.params.fromTime.equals(new BigInt(0))
  );

  permission.save();
}

// TODO: emit events and handle erc20limits

