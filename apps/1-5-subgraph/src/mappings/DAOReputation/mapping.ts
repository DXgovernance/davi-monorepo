import {
  Burn,
  DAOReputation,
  Mint,
} from '../../types/DAOReputation/DAOReputation';
import { Member } from '../../types/schema';
import { BigInt, store } from '@graphprotocol/graph-ts';

export function handleMint(event: Mint): void {
  const tokenAddress = event.address;
  const repContract = DAOReputation.bind(tokenAddress);

  const memberId = `${tokenAddress.toHexString()}-${event.params._to.toHexString()}`;
  let member = Member.load(memberId);

  if (!member) {
    member = new Member(memberId);
    member.address = event.params._to.toHexString();
  }
  const reputation = repContract.balanceOf(event.params._to);
  member.reputation = reputation;

  member.save();
}

export function handleBurn(event: Burn): void {
  const tokenAddress = event.address;
  const repContract = DAOReputation.bind(tokenAddress);

  const memberId = `${tokenAddress}-${event.params._from}`;
  let member = Member.load(memberId);

  if (!member) return;

  const reputation = repContract.balanceOf(event.params._from);
  member.reputation = reputation;

  member.save();
}

