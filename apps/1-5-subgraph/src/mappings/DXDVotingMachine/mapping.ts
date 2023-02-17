import { BigInt } from '@graphprotocol/graph-ts';
import {
  Stake,
  Vote,
  DAO,
  Redeem,
  VoteLog,
  VotingMachineProposalStateLog,
} from '../../types/schema';
import {
  VoteProposal,
  Stake as StakeEvent,
  Redeem as RedeemEvent,
} from '../../types/templates/DXDVotingMachine/DXDVotingMachine';
import { StateChange } from '../../types/templates/Scheme/DXDVotingMachine';

const votingMachineProposalStateArray = [
  'None',
  'Expired',
  'ExecutedInQueue',
  'ExecutedInBoost',
  'Queued',
  'PreBoosted',
  'Boosted',
  'QuietEndingPeriod',
];

export function handleVoteProposal(event: VoteProposal): void {
  const proposalId = event.params._proposalId.toHexString();
  const voterAddress = event.params._voter.toHexString();
  const voteId = `${proposalId}-${voterAddress}`;

  const avatarAddress = event.params._avatar;
  const avatar = DAO.load(avatarAddress.toHexString());
  if (!avatar) return;

  // Handle new vote entity

  let vote = Vote.load(voteId);
  if (!vote) {
    vote = new Vote(voteId);
  }

  vote.proposal = proposalId;
  vote.voterAddress = voterAddress;
  vote.member = `${avatar.reputationToken}-${voterAddress}`;
  vote.vote = event.params._vote;
  vote.reputation = event.params._reputation;
  vote.save();

  // Write vote logs

  let voteLogId = `${voteId}-${event.block.timestamp}`;
  let voteLog = VoteLog.load(voteLogId);
  if (!voteLog) {
    voteLog = new VoteLog(voteLogId);
  }

  voteLog.reputation = event.params._reputation;
  voteLog.timestamp = event.block.timestamp;
  voteLog.txId = event.transaction.hash.toHexString();
  voteLog.vote = voteId;
  voteLog.save();
}

export function handleStake(event: StakeEvent): void {
  const stakeId = `${event.params._proposalId.toHexString()}-${event.params._staker.toHexString()}-${
    event.block.timestamp
  }-stake`;

  // In the most common case, each staking is unique
  // We load to handle the edge case of someone staking twice on the same block
  let stake = Stake.load(stakeId);
  if (!stake) {
    stake = new Stake(stakeId);
    stake.amount = new BigInt(0);
  }

  stake.proposal = event.params._proposalId.toHexString();
  stake.avatar = event.params._avatar.toHexString();
  stake.staker = event.params._staker.toHexString();
  stake.vote = event.params._vote;
  stake.amount = event.params._amount;
  stake.timestamp = event.block.timestamp;
  stake.txId = event.transaction.hash.toHexString();

  stake.save();
}

export function handleRedeem(event: RedeemEvent): void {
  const redeemId = `${
    event.params._proposalId
  }-${event.params._beneficiary.toHexString()}-${event.block.timestamp}-redeem`;

  // In the most common case, each redeem is unique
  // We load to handle the edge case of someone redeeming twice on the same block
  let redeem = Redeem.load(redeemId);
  if (!redeem) {
    redeem = new Redeem(redeemId);
  }

  redeem.proposal = event.params._proposalId.toHexString();
  redeem.avatar = event.params._avatar.toHexString();
  redeem.redeemer = event.params._beneficiary.toHexString();
  redeem.amount = event.params._amount;
  redeem.timestamp = event.block.timestamp;
  redeem.txId = event.transaction.hash.toHexString();

  redeem.save();
}

export function handleStateChange(event: StateChange): void {
  // Proposal state
  const proposalId = event.params._proposalId;
  const votingMachineProposalStateLogId = `${proposalId.toHexString()}-${
    votingMachineProposalStateArray[event.params._proposalState]
  }-${event.block.timestamp}`;
  const votingMachineProposalStateLog = new VotingMachineProposalStateLog(
    votingMachineProposalStateLogId
  );
  votingMachineProposalStateLog.timestamp = event.block.timestamp;
  votingMachineProposalStateLog.txId = event.transaction.hash.toHexString();
  votingMachineProposalStateLog.state =
    votingMachineProposalStateArray[event.params._proposalState];
  votingMachineProposalStateLog.proposal = proposalId.toHexString();
  votingMachineProposalStateLog.save();
}

