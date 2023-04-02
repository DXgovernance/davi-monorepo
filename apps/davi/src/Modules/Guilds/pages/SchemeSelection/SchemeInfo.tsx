import moment from 'moment';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { getAllSchemesQuery } from '.graphclient';
import {
  InfoDetail,
  InfoDetailMuted,
} from 'components/ProposalInfoCard/ProposalInfoCard.styled';
import { CardBody, SchemePropertiesGrid } from './SchemeSelection.styled';
import useTimeDifferenceHumanized from 'hooks/Guilds/time/useTimeDifferenceHumanized';

type Scheme = getAllSchemesQuery['dao']['schemes'][0];

export const SchemeInfo = ({ selectedScheme }: { selectedScheme: Scheme }) => {
  const { t } = useTranslation();

  const formattedQueuedVoteRequiredPercentage = BigNumber.from(
    selectedScheme.votingMachine.queuedVoteRequiredPercentage
  )
    .div(100)
    .toString();

  const formattedBoostedVoteRequiredPercentage = BigNumber.from(
    selectedScheme.votingMachine.boostedVoteRequiredPercentage
  )
    .div(100)
    .toString();

  const formattedQuietEndingPeriod = useTimeDifferenceHumanized(
    moment().add(selectedScheme.votingMachine.quietEndingPeriod, 'seconds')
  );

  const formattedBoostedVotePeriodLimit = useTimeDifferenceHumanized(
    moment().add(selectedScheme.votingMachine.boostedVotePeriodLimit, 'seconds')
  );

  const formattedPreBoostedVotePeriodLimit = useTimeDifferenceHumanized(
    moment().add(
      selectedScheme.votingMachine.preBoostedVotePeriodLimit,
      'seconds'
    )
  );

  return (
    <CardBody>
      <SchemePropertiesGrid>
        <InfoDetail>
          <span>{t('schemes.type')}</span>
          <InfoDetailMuted>{selectedScheme.type}</InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('proposal.quorum')}</span>
          <InfoDetailMuted>
            {formattedQueuedVoteRequiredPercentage}%
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('proposal.boostedQuoroum')}</span>
          <InfoDetailMuted>
            {formattedBoostedVoteRequiredPercentage}%
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.maxProposalTime')}</span>
          <InfoDetailMuted>{formattedQuietEndingPeriod}</InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.proposalTimeInPreBoost')}</span>
          <InfoDetailMuted>
            {formattedPreBoostedVotePeriodLimit}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.proposalTimeInBoost')}</span>
          <InfoDetailMuted>{formattedBoostedVotePeriodLimit}</InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.canMakeAvatarCalls')}</span>
          <InfoDetailMuted>
            {selectedScheme.canMakeAvatarCalls ? 'yes' : 'no'}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.canManageSchemes')}</span>
          <InfoDetailMuted>
            {selectedScheme.canManageSchemes ? 'yes' : 'no'}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.maxRepPercentageChange')}</span>
          <InfoDetailMuted>
            {selectedScheme.maxRepPercentageChange}%
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.daoBounty')}</span>
          <InfoDetailMuted>
            {selectedScheme.votingMachine.daoBounty}
          </InfoDetailMuted>
        </InfoDetail>
      </SchemePropertiesGrid>
    </CardBody>
  );
};
