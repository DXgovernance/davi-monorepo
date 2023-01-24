import { GuildConfigProps } from 'stores/modules/common/fetchers/useGuildConfig';
import { Proposal } from 'types/types.guilds.d';

export interface ProposalInfoCardProps {
  proposal: Proposal;
  guildConfig: GuildConfigProps;
  quorum: any;
}
