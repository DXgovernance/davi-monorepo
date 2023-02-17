import { BigInt } from '@graphprotocol/graph-ts';
import { PermissionSet } from '../../types/PermissionRegistry/PermissionRegistry';
import { GuildPermission } from '../../types/schema';

export function handleSetPermission(event: PermissionSet): void {
  const ANY_FUNC_SIGNATURE = '0x00000000';
  const ERC20_TRANSFER_SIGNATURE = '0xa9059cbb';
  const ERC20_APPROVE_SIGNATURE = '0x095ea7b3';

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

  let isToken = false;
  if (
    event.params.functionSignature.toHexString() == ANY_FUNC_SIGNATURE ||
    event.params.functionSignature.toHexString() == ERC20_APPROVE_SIGNATURE ||
    event.params.functionSignature.toHexString() == ERC20_TRANSFER_SIGNATURE
  ) {
    isToken = true;
  }

  permission.from = event.params.from.toHexString();
  permission.to = event.params.to.toHexString();
  permission.functionSignature = event.params.functionSignature;
  permission.isToken = isToken;
  permission.valueAllowed = event.params.value;
  permission.fromTime = event.params.fromTime;
  permission.allowed = !(
    event.params.value.equals(new BigInt(0)) &&
    event.params.fromTime.equals(new BigInt(0))
  );
  permission.guild = event.params.from.toHexString();
  permission.save();
}

