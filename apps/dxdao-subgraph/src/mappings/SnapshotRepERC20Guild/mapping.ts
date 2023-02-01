import { GuildInitialized, SnapshotRepERC20Guild } from '../../types/templates/SnapshotRepERC20Guild/SnapshotRepERC20Guild';
import { ProposalStateChanged, VoteAdded } from '../../types/templates/BaseERC20Guild/BaseERC20Guild';
import { BaseERC20Guild } from '../../types/templates/BaseERC20Guild/BaseERC20Guild';
import { ERC20 } from '../../types/GuildRegistry/ERC20';
import {   Guild,
  Proposal,
  Vote,
  Option,
  Action,
  ProposalStateLog,  
  Token
} from '../../types/schema';
import { log, json, JSONValueKind, ipfs, BigInt } from '@graphprotocol/graph-ts';

// Handler to upgradable initializer event.
export function handleGuildInitialized(event: GuildInitialized): void {
  const guildAddress = event.address;
  let contract = BaseERC20Guild.bind(guildAddress);

  //   Get token config
  let tokenAddress = contract.getToken();

  let tokenContract = ERC20.bind(tokenAddress);
  let token = Token.load(tokenAddress.toHexString());
  if (!token) {
    token = new Token(tokenAddress.toHexString());
  }
  token.name = tokenContract.name();
  token.type = 'ERC20';
  token.symbol = tokenContract.symbol();
  token.decimals = tokenContract.decimals();
  token.guildAddress = guildAddress.toHexString();
  token.save();

  // Create Guild instance.
  let guild = Guild.load(guildAddress.toHexString());
  if (guild == null) {
    guild = new Guild(guildAddress.toHexString());
  }

  // Save Guild config
  guild.name = contract.getName();
  guild.permissionRegistry = contract.getPermissionRegistry().toHexString();
  guild.proposalTime = contract.getProposalTime();
  guild.lockTime = contract.getLockTime();
  guild.timeForExecution = contract.getTimeForExecution();
  guild.votingPowerForProposalCreation =
    contract.getVotingPowerForProposalCreation();
  guild.votingPowerForProposalExecution =
    contract.getVotingPowerForProposalExecution();
  guild.voteGas = contract.getVoteGas();
  guild.maxGasPrice = contract.getMaxGasPrice();
  guild.maxActiveProposals = contract.getMaxActiveProposals();
  guild.minimumMembersForProposalCreation =
    contract.getMinimumMembersForProposalCreation();
  guild.minimumTokensLockedForProposalCreation =
    contract.getMinimumTokensLockedForProposalCreation();
  guild.token = token.id;

  guild.save();
}

export function handleProposalStateChange(
  event: ProposalStateChanged,
): void {
  let address = event.address;
  let contract = SnapshotRepERC20Guild.bind(address);

  const proposalId = event.params.proposalId.toHexString();
  log.info('---------------------------', []);
  log.info('Proposal state changed: {}', [proposalId]);
  log.info('---------------------------', []);

  let proposal = Proposal.load(proposalId);

  const proposalData = contract.getProposal(event.params.proposalId);

  if (!proposal) {
    const to = proposalData.to.map<string>(d => d.toHexString());
    const data = proposalData.data.map<string>(d => d.toHexString());
    proposal = new Proposal(proposalId);
    proposal.guildId = address.toHexString();
    proposal.creator = proposalData.creator.toHexString();
    proposal.startTime = proposalData.startTime;
    proposal.endTime = proposalData.endTime;
    proposal.to = to;
    proposal.data = data;
    proposal.value = proposalData.value;
    proposal.title = proposalData.title;
    proposal.contentHash = proposalData.contentHash;
    proposal.totalVotes = proposalData.totalVotes;
    proposal.votes = [];
    proposal.options = [];
    proposal.statesLog = [];

    let voteOptionsLabel: string[] = [];

    if (proposal.contentHash && isIPFS(proposal.contentHash)) {
      let metadata = ipfs.cat(
        proposal.contentHash.substring(7, proposal.contentHash.length + 1)
      );

      if (metadata) {
        const stringMetadata = metadata.toString();
        proposal.metadata = stringMetadata;

        const parsedJson = json.fromString(stringMetadata);
        const parsedObject = parsedJson.toObject();
        const description = parsedObject.get('description');
        const voteOptions = parsedObject.get('voteOptions');

        if (description && description.kind == JSONValueKind.STRING) {
          proposal.description = description.toString();
        }

        if (voteOptions && voteOptions.kind == JSONValueKind.ARRAY) {
          let newVoteOptions = voteOptions.toArray();

          for (let k = 0; k < newVoteOptions.length; k++) {
            let voteOptionsLabelCopy = voteOptionsLabel;
            voteOptionsLabelCopy.push(newVoteOptions[k].toString());
            voteOptionsLabel = voteOptionsLabelCopy;
          }
        }
      }
    }

    const amountOfOptions = proposal.totalVotes!.length;
    // proposal.data does not contain actions for 0 option so we don't count it on the div to get actionsCount
    const actionsPerOption = proposal.data!.length / (amountOfOptions - 1);

    for (let i = 0; i < amountOfOptions; i++) {
      let optionId = `${proposalId}-${i}`;

      let option = new Option(optionId);

      let optionsCopy = proposal.options;
      optionsCopy!.push(optionId);
      proposal.options = optionsCopy;

      if (voteOptionsLabel.length == amountOfOptions) {
        if (i == 0) {
          option.label = 'Against'; // TODO: Should we hardcode this here or send empty string to FE?
        } else {
          option.label = voteOptionsLabel[i];
        }
      }

      option.proposalId = proposalId;
      option.actions = [];
      option.votes = [];
      option.voteAmount = new BigInt(0);

      // Skip Option zero and return actions []
      if (i > 0) {
        for (let j = 0; j < actionsPerOption; j++) {
          let actionId = `${optionId}-${j}`;
          let action = new Action(actionId);
          action.optionId = optionId;
          let actionIndex = actionsPerOption * (i - 1) + j;

          if (option.actions) {
            action.data = data[actionIndex];
            action.from = address.toHexString();
            action.to = to[actionIndex];
            action.value = proposalData.value[actionIndex];
          }
          let actionsCopy = option.actions;
          actionsCopy!.push(actionId);
          option.actions = actionsCopy;
          action.save();
        }
      }

      option.save();
    }

    let guild = Guild.load(address.toHexString());
    if (guild) {
      let proposalsCopy = guild.proposals;
      proposalsCopy!.push(proposalId);
      guild.proposals = proposalsCopy;
      guild.save();
    }
  }

  // executed
  if (event.params.newState.toString() == '3') {
    proposal.executionTransactionHash = event.transaction.hash.toHexString();
  }

  let newState = event.params.newState;
  let timestamp = event.block.timestamp;

  const proposalStateLogId = `${proposalId}-${newState}-${timestamp}`;

  let proposalStateLog = new ProposalStateLog(proposalStateLogId);
  proposalStateLog.state = newState;
  proposalStateLog.timestamp = timestamp;
  proposalStateLog.transactionHash = event.transaction.hash.toHexString();
  proposalStateLog.save();

  let proposalStatesLogCopy = proposal.statesLog;
  proposalStatesLogCopy!.push(proposalStateLogId);
  proposal.statesLog = proposalStatesLogCopy;

  proposal.contractState = newState;
  proposal.save();
}

export function handleVoting(event: VoteAdded): void {
  const proposalId = event.params.proposalId.toHexString();
  const voteId = `${proposalId}-${event.params.voter.toHexString()}`;

  let contract = SnapshotRepERC20Guild.bind(event.address);
  const proposalData = contract.getProposal(event.params.proposalId);

  let vote = Vote.load(voteId);
  let proposal = Proposal.load(proposalId);

  if (!vote) {
    vote = new Vote(voteId);
    vote.proposalId = proposalId;
    vote.voter = event.params.voter.toHexString();
    // TODO: change to event.params.option when merging refactor branch of dxdao-contracts
    vote.option = event.params.action;
    // TODO: check when one voter votes twice
    if (proposal) {
      let votesCopy = proposal.votes;
      votesCopy!.push(voteId);
      proposal.votes = votesCopy;

      const newTotalVotes = proposalData.totalVotes;
      proposal.totalVotes = newTotalVotes;

      let optionId = `${proposalId}-${event.params.action}`;
      let option = Option.load(optionId);
      // update option data on vote event
      if (!!option) {
        let optionVotesCopy = option.votes;
        const newVoteAmount = newTotalVotes[event.params.action.toI32()];
        optionVotesCopy.push(voteId);

        option.voteAmount = newVoteAmount;
        option.votes = optionVotesCopy;
        option.save();
      }

      proposal.save();
    }
  }
  // TODO: if vote exists update option.voteAmount and push new vote(?)
  vote.votingPower = event.params.votingPower;
  vote.transactionHash = event.transaction.hash.toHexString();

  vote.save();
}


function isIPFS(contentHash: string): boolean {
  return contentHash.substring(0, 7) == 'ipfs://';
}
