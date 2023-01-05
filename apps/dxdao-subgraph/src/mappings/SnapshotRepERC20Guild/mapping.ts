import { GuildInitialized } from '../../types/templates/SnapshotRepERC20Guild/SnapshotRepERC20Guild';
import { BaseERC20Guild } from '../../types/templates/BaseERC20Guild/BaseERC20Guild';
import { ERC20 } from '../../types/GuildRegistry/ERC20';
import { Guild, Token } from '../../types/schema';

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

