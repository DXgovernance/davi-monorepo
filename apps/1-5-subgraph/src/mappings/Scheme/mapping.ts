import { Address, Bytes } from '@graphprotocol/graph-ts';
import { ProposalStateChange } from '../../types/DAOController/Scheme';
import {
  Proposal,
  StateLog,
  VotingMachineProposalStateLog,
} from '../../types/schema';
import { Scheme as SchemeContract } from '../../types/templates/Scheme/Scheme';
import { DXDVotingMachine as DXDVotingMachineContract } from '../../types/templates/Scheme/DXDVotingMachine';

const proposalStateArray = ['None', 'Submitted', 'Rejected', 'Passed'];

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

const votingMachineExecutionStateArray = [
  'None',
  'Failed',
  'QueueBarCrossed',
  'QueueTimeOut',
  'PreBoostedBarCrossed',
  'BoostedTimeOut',
  'BoostedBarCrossed',
];

export function handleProposalStateChange(event: ProposalStateChange): void {
  const proposalId = event.params._proposalId;

  const schemeAddress = event.address;
  const schemeContract = SchemeContract.bind(schemeAddress);

  const votingMachineAddress = schemeContract.votingMachine();
  const votingMachineContract =
    DXDVotingMachineContract.bind(votingMachineAddress);

  const proposalDataFromScheme = schemeContract.getProposal(proposalId);
  const proposalDataFromVotingMachine =
    votingMachineContract.proposals(proposalId);
  const proposalTimes = votingMachineContract.getProposalTimes(proposalId);

  let proposal = Proposal.load(proposalId.toHexString());
  if (!proposal) {
    proposal = new Proposal(proposalId.toHexString());
  }

  // Scheme data

  proposal.to = proposalDataFromScheme.to.map<string>(
    (address: Address): string => {
      return address.toHexString();
    }
  );

  proposal.callData = proposalDataFromScheme.callData.map<string>(
    (data: Bytes): string => {
      return data.toHexString();
    }
  );

  proposal.value = proposalDataFromScheme.value;
  proposal.totalOptions = proposalDataFromScheme.totalOptions;
  proposal.state = proposalStateArray[proposalDataFromScheme.state];
  proposal.title = proposalDataFromScheme.title;
  proposal.descriptionHash = proposalDataFromScheme.descriptionHash;
  proposal.submittedTime = proposalDataFromScheme.submittedTime;

  // VotingMachine data

  proposal.schemeId = proposalDataFromVotingMachine.getSchemeId().toHexString();
  proposal.callbacks = proposalDataFromVotingMachine
    .getCallbacks()
    .toHexString();
  proposal.votingMachineProposalState =
    votingMachineProposalStateArray[proposalDataFromVotingMachine.getState()];
  proposal.votingMachineExecutionState =
    votingMachineExecutionStateArray[
      proposalDataFromVotingMachine.getExecutionState()
    ];
  proposal.winningVote = proposalDataFromVotingMachine.getWinningVote();
  proposal.proposer = proposalDataFromVotingMachine.getProposer().toHexString();
  proposal.currentBoostedVotePeriodLimit =
    proposalDataFromVotingMachine.getCurrentBoostedVotePeriodLimit();
  proposal.paramsHash = proposalDataFromVotingMachine
    .getParamsHash()
    .toHexString();
  proposal.daoBountyRemain = proposalDataFromVotingMachine.getDaoBountyRemain();
  proposal.daoBounty = proposalDataFromVotingMachine.getDaoBounty();
  proposal.totalStakes = proposalDataFromVotingMachine.getTotalStakes();
  proposal.confidenceThreshold =
    proposalDataFromVotingMachine.getConfidenceThreshold();
  proposal.secondsFromTimeOutTillExecuteBoosted =
    proposalDataFromVotingMachine.getSecondsFromTimeOutTillExecuteBoosted();
  proposal.boostedPhaseTime = proposalTimes[1];
  proposal.preBoostedPhaseTime = proposalTimes[2];
  proposal.daoRedeemItsWinnings =
    proposalDataFromVotingMachine.getDaoRedeemItsWinnings();

  proposal.save();

  // State logs

  const stateLogId = `${proposalId.toHexString()}-${
    proposalStateArray[proposalDataFromScheme.state]
  }-${event.block.timestamp}`;
  const stateLog = new StateLog(stateLogId);
  stateLog.timestamp = event.block.timestamp;
  stateLog.txId = event.transaction.hash.toHexString();
  stateLog.state = proposalStateArray[proposalDataFromScheme.state];
  stateLog.proposal = proposalId.toHexString();
  stateLog.save();

  if (proposalStateArray[proposalDataFromScheme.state] === 'Submitted') {
    const votingMachineProposalStateLogId = `${proposalId.toHexString()}-${
      votingMachineProposalStateArray[proposalDataFromVotingMachine.getState()]
    }-${event.block.timestamp}`;
    const votingMachineProposalStateLog = new VotingMachineProposalStateLog(
      votingMachineProposalStateLogId
    );
    votingMachineProposalStateLog.timestamp = event.block.timestamp;
    votingMachineProposalStateLog.txId = event.transaction.hash.toHexString();
    votingMachineProposalStateLog.state =
      votingMachineProposalStateArray[proposalDataFromVotingMachine.getState()];
    votingMachineProposalStateLog.proposal = proposalId.toHexString();
    votingMachineProposalStateLog.save();
  }
}

