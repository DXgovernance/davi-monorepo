import { useState } from 'react';
import {
  InfoDetail,
  InfoDetailMuted,
  ProposalHistoryIcon,
} from './ProposalInfoCard.styled';
import { SidebarCard, SidebarCardContent } from 'components/SidebarCard';
import { Loading } from 'components/primitives/Loading';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { duration } from 'moment';
import { ProposalInfoCardProps } from './types';
import { ProposalHistory } from './ProposalHistory';
import { useTranslation } from 'react-i18next';

const ProposalInfoCard: React.FC<ProposalInfoCardProps> = ({
  proposal,
  guildConfig,
  quorum,
}) => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <SidebarCard header={t('information')}>
      <SidebarCardContent>
        <InfoDetail>
          <span>{t('proposalInfoCard.consensusSystem')}</span>
          <InfoDetailMuted>{t('guilds.guild')}</InfoDetailMuted>
        </InfoDetail>
        <InfoDetail>
          <span>{t('proposalInfoCard.proposalDuration')}</span>
          <InfoDetailMuted>
            {guildConfig?.proposalTime ? (
              duration(
                guildConfig?.proposalTime?.toNumber(),
                'seconds'
              ).humanize()
            ) : (
              <Loading loading text skeletonProps={{ width: '50px' }} />
            )}
          </InfoDetailMuted>
        </InfoDetail>
        <InfoDetail>
          <span>{t('quorum')}</span>
          <InfoDetailMuted>
            {quorum != null ? (
              `${quorum}%`
            ) : (
              <Loading loading text skeletonProps={{ width: '50px' }} />
            )}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('proposalInfoCard.proposalHistory')}</span>
          <ProposalHistoryIcon
            active={isHistoryExpanded}
            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          >
            {isHistoryExpanded ? (
              <FiChevronUp height={16} />
            ) : (
              <FiChevronDown height={16} />
            )}
          </ProposalHistoryIcon>
        </InfoDetail>
      </SidebarCardContent>
      {isHistoryExpanded && <ProposalHistory proposal={proposal} />}
    </SidebarCard>
  );
};

export default ProposalInfoCard;
