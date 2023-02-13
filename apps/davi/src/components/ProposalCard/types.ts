import { ProposalStatusProps } from 'components/ProposalStatus/types';
import { Proposal, ENSAvatar } from 'types/types.guilds';

export interface ProposalCardProps {
  proposal?: Proposal;
  ensAvatar?: ENSAvatar;
  href?: string;
  statusProps?: ProposalStatusProps;
  address?: string;
}
