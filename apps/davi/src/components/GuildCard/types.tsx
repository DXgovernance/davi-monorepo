import { CardProps } from 'components/Card';

export interface GuildCardProps extends CardProps {
  isLoading?: boolean;
  isUnmatched?: boolean;
  guildAddress: string;
  numberOfMembers: any;
  t: any;
  numberOfActiveProposals: any;
  ensName: string;
  data: any;
}
