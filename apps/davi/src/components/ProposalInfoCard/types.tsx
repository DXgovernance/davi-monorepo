import { GuildConfigProps } from 'types/types.guilds.d';
import { Proposal } from 'types/types.guilds.d';

export interface ProposalInfoCardProps {
  proposal: Proposal;
  guildConfig: GuildConfigProps;
  quorum: any;
}
