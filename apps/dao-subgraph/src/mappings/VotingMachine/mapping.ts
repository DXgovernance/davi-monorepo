import { BigInt } from '@graphprotocol/graph-ts';
import {
  Stake,
  Vote,
  DAO,
  Redeem,
  VoteLog,
  VotingMachineProposalStateLog,
  Proposal,
} from '../../types/schema';
import {
  VoteProposal,
  Stake as StakeEvent,
  Redeem as RedeemEvent,
} from '../../types/templates/VotingMachine/VotingMachine';
import {
  StateChange,
  VotingMachine as VotingMachineContract,
} from '../../types/templates/Scheme/VotingMachine';

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
  const proposalId = event.params.proposalId.toHexString();
  const voterAddress = event.params.voter.toHexString();
  const voteId = `${proposalId}-${voterAddress}`;

  const votingMachineContract = VotingMachineContract.bind(event.address);

  const avatarAddress = event.params.avatar;
  const avatar = DAO.load(avatarAddress.toHexString());
  if (!avatar) return;

  // Update votes on proposal
  let proposal = Proposal.load(proposalId);
  if (!proposal) return;
  const proposalVotes = votingMachineContract.getProposalStatus(
    event.params.proposalId
  );
  const negativeVotes = proposalVotes.getVotesNo();
  const positiveVotes = proposalVotes.getVotesYes();

  proposal.totalVotes = [negativeVotes, positiveVotes];
  proposal.save();

  // Handle new vote entity

  let vote = Vote.load(voteId);
  if (!vote) {
    vote = new Vote(voteId);
  }

  vote.proposal = proposalId;
  vote.voterAddress = voterAddress;
  vote.member = `${avatar.reputationToken}-${voterAddress}`;
  vote.option = event.params.option;
  vote.reputation = event.params.reputation;
  vote.save();

  // Write vote logs

  let voteLogId = `${voteId}-${event.block.timestamp}`;
  let voteLog = VoteLog.load(voteLogId);
  if (!voteLog) {
    voteLog = new VoteLog(voteLogId);
  }

  voteLog.reputation = event.params.reputation;
  voteLog.timestamp = event.block.timestamp;
  voteLog.txId = event.transaction.hash.toHexString();
  voteLog.vote = voteId;
  voteLog.save();
}

export function handleStake(event: StakeEvent): void {
  const stakeId = `${event.params.proposalId.toHexString()}-${event.params.staker.toHexString()}-${
    event.block.timestamp
  }-stake`;

  // In the most common case, each staking is unique
  // We load to handle the edge case of someone staking twice on the same block
  let stake = Stake.load(stakeId);
  if (!stake) {
    stake = new Stake(stakeId);
    stake.amount = new BigInt(0);
  }

  stake.proposal = event.params.proposalId.toHexString();
  stake.avatar = event.params.avatar.toHexString();
  stake.staker = event.params.staker.toHexString();
  stake.option = event.params.option;
  stake.amount = event.params.amount;
  stake.timestamp = event.block.timestamp;
  stake.txId = event.transaction.hash.toHexString();

  stake.save();
}

export function handleRedeem(event: RedeemEvent): void {
  const redeemId = `${
    event.params.proposalId
  }-${event.params.beneficiary.toHexString()}-${event.block.timestamp}-redeem`;

  // In the most common case, each redeem is unique
  // We load to handle the edge case of someone redeeming twice on the same block
  let redeem = Redeem.load(redeemId);
  if (!redeem) {
    redeem = new Redeem(redeemId);
  }

  redeem.proposal = event.params.proposalId.toHexString();
  redeem.avatar = event.params.avatar.toHexString();
  redeem.redeemer = event.params.beneficiary.toHexString();
  redeem.amount = event.params.amount;
  redeem.timestamp = event.block.timestamp;
  redeem.txId = event.transaction.hash.toHexString();

  redeem.save();
}

export function handleStateChange(event: StateChange): void {
  // Proposal state
  const proposalId = event.params.proposalId;
  const votingMachineProposalStateLogId = `${proposalId.toHexString()}-${
    votingMachineProposalStateArray[event.params.proposalState]
  }-${event.block.timestamp}`;
  const votingMachineProposalStateLog = new VotingMachineProposalStateLog(
    votingMachineProposalStateLogId
  );
  votingMachineProposalStateLog.timestamp = event.block.timestamp;
  votingMachineProposalStateLog.txId = event.transaction.hash.toHexString();
  votingMachineProposalStateLog.state =
    votingMachineProposalStateArray[event.params.proposalState];
  votingMachineProposalStateLog.proposal = proposalId.toHexString();
  votingMachineProposalStateLog.save();
}

