import { BigInt } from '@graphprotocol/graph-ts';
import { PermissionSet } from '../../types/PermissionRegistry/PermissionRegistry';
import { Guild, GuildPermission } from '../../types/schema';

export function handleSetPermission(event: PermissionSet): void {
  let id =
    event.params.from.toHexString() +
    '-' +
    event.params.to.toHexString() +
    '-' +
    event.params.functionSignature.toHexString();

  let permission = GuildPermission.load(id);
  if (permission == null) {
    permission = new GuildPermission(id);
  }

  permission.from = event.params.from.toHexString();
  permission.to = event.params.to.toHexString();
  permission.functionSignature = event.params.functionSignature;
  permission.valueAllowed = event.params.value;
  permission.fromTime = event.params.fromTime;
  permission.allowed = !(
    event.params.value.equals(new BigInt(0)) &&
    event.params.fromTime.equals(new BigInt(0))
  );
  permission.guild = event.params.from.toHexString();
  permission.save();
}

