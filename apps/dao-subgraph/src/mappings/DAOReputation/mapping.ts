import { BigInt } from '@graphprotocol/graph-ts';
import {
  Burn,
  DAOReputation,
  Mint,
} from '../../types/DAOReputation/DAOReputation';
import {
  Member,
  ReputationToken,
  Snapshot,
  VoterSnapshot,
} from '../../types/schema';

export function handleMint(event: Mint): void {
  const tokenAddress = event.address;
  const repContract = DAOReputation.bind(tokenAddress);
  const repTokenId = tokenAddress.toHexString();
  const snapshotId = repContract.getCurrentSnapshotId();

  let reputationToken = ReputationToken.load(repTokenId);
  if (!reputationToken) {
    reputationToken = new ReputationToken(repTokenId);
    reputationToken.address = repTokenId;
    reputationToken.name = repContract.name();
    reputationToken.symbol = repContract.symbol();
    reputationToken.amount = BigInt.fromString('0');
    reputationToken.currentSnapshotId = BigInt.fromString('0');
  }
  reputationToken.amount = reputationToken.amount.plus(event.params.amount);
  reputationToken.currentSnapshotId = snapshotId;

  // Snapshot
  const snapshot = new Snapshot(snapshotId.toHexString());
  snapshot.snapshotId = snapshotId;
  snapshot.value = reputationToken.amount;
  snapshot.reputationTokenSnapshot = repTokenId;
  snapshot.save();

  reputationToken.controllerAddress = repContract.owner().toHexString();

  const memberId = `${event.params.to.toHexString()}-${tokenAddress.toHexString()}`;
  let member = Member.load(memberId);

  if (!member) {
    member = new Member(memberId);
    member.address = event.params.to.toHexString();
    member.reputationToken = repTokenId;
  }
  member.reputationTokenAmount = repContract.balanceOf(event.params.to);

  const voterSnapshot = new VoterSnapshot(
    `${memberId}-${snapshotId.toHexString()}`
  );

  voterSnapshot.snapshotId = snapshotId;
  voterSnapshot.value = member.reputationTokenAmount;
  voterSnapshot.voter = memberId;
  voterSnapshot.save();

  member.save();
  reputationToken.save();
}

export function handleBurn(event: Burn): void {
  const tokenAddress = event.address;
  const repContract = DAOReputation.bind(tokenAddress);

  const repTokenId = tokenAddress.toHexString();
  let reputationToken = ReputationToken.load(repTokenId);
  if (!reputationToken) return;

  const memberId = `${event.params.from}-${tokenAddress}`;
  let member = Member.load(memberId);

  if (!member) return;

  const memberReputationAmount = repContract.balanceOf(event.params.from);

  member.reputationTokenAmount = memberReputationAmount;

  reputationToken.amount = reputationToken.amount.minus(event.params.amount);
  reputationToken.save();

  if (memberReputationAmount == BigInt.fromString('0')) {
    member.unset(memberId);
  }

  member.save();

  // Snapshot
  const snapshotId = repContract.getCurrentSnapshotId();
  const snapshot = new Snapshot(snapshotId.toHexString());
  snapshot.snapshotId = snapshotId;
  snapshot.value = reputationToken.amount;
  snapshot.reputationTokenSnapshot = repTokenId;
  snapshot.save();

  // VoterSnapshot
  const voterSnapshot = new VoterSnapshot(
    `${memberId}-${snapshotId.toHexString()}`
  );

  voterSnapshot.snapshotId = snapshotId;
  voterSnapshot.value = member.reputationTokenAmount;
  voterSnapshot.voter = memberId;
  voterSnapshot.save();
}

