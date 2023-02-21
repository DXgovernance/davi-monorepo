import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { Guild, Member, Token } from '../../types/schema';
import {
  ERC20SnapshotRep,
  Transfer,
} from '../../types/templates/ERC20SnapshotRep/ERC20SnapshotRep';

export function handleTransfer(event: Transfer): void {
  let tokenAddress = event.address.toHexString();
  let token = Token.load(tokenAddress);

  let tokenContract = ERC20SnapshotRep.bind(event.address);

  const zeroAddress = '0x0000000000000000000000000000000000000000';

  const guild = token!.guildAddress ? Guild.load(token!.guildAddress!) : null;
  if (guild && guild.type != 'SnapshotRepERC20Guild') {
    return;
  }

  const isMint = event.params.from.toHexString() == zeroAddress;

  const memberAddress = isMint
    ? event.params.to.toHexString()
    : event.params.from.toHexString();

  let memberId = token!.guildAddress
    ? `${token!.guildAddress!}-${memberAddress}`
    : `unknown-${memberAddress}`;
  let member = Member.load(memberId);

  if (!member) {
    member = new Member(memberId);
    member.address = event.params.to.toHexString();
    member.tokensLocked = new BigInt(0);
    member.token = tokenAddress;
    if (guild) member.guild = token!.guildAddress!;
  }

  member.tokensLocked = tokenContract.balanceOf(
    Address.fromString(member.address)
  );

  if (member.tokensLocked > new BigInt(0)) {
    member.save();
  } else {
    member.unset(memberId);
  }
}

