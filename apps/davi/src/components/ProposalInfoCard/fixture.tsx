import { ProposalInfoCardProps } from './types';
import { proposalMock, guildConfigMock } from 'utils/fixtures';

export const fullParameters: ProposalInfoCardProps = {
  proposal: proposalMock,
  guildConfig: guildConfigMock,
  quorum: '0.3%',
};

export const loadingParameters: ProposalInfoCardProps = {
  proposal: null,
  guildConfig: null,
  quorum: null,
};
