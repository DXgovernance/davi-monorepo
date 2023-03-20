import moment from 'moment';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { getSchemesQuery } from '.graphclient';
import {
  InfoDetail,
  InfoDetailMuted,
} from 'components/ProposalInfoCard/ProposalInfoCard.styled';
import { CardBody, SchemePropertiesGrid } from './SchemeSelection.styled';

type Scheme = getSchemesQuery['dao']['schemes'][0];

const humanizedTime = (time: string) => {
  const timeInSeconds = Number.parseInt(time);
  return moment.duration(timeInSeconds, 'seconds').humanize({ ss: 1 });
};

export const SchemeInfo = ({ selectedScheme }: { selectedScheme: Scheme }) => {
  const { t } = useTranslation();
  const formattedBoostedVoteRequiredPercentage = BigNumber.from(
    selectedScheme.votingMachine.boostedVoteRequiredPercentage
  )
    .div(100)
    .toString();

  const formattedQuietEndingPeriod = humanizedTime(
    selectedScheme.votingMachine.quietEndingPeriod
  );

  const formattedBoostedVotePeriodLimit = humanizedTime(
    selectedScheme.votingMachine.boostedVotePeriodLimit
  );

  const formattedPreBoostedVotePeriodLimit = humanizedTime(
    selectedScheme.votingMachine.preBoostedVotePeriodLimit
  );

  return (
    <CardBody>
      <SchemePropertiesGrid>
        <InfoDetail>
          <span>{t('proposal.quorum')}</span>
          <InfoDetailMuted>
            {formattedBoostedVoteRequiredPercentage}%
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.canManageSchemes')}</span>
          <InfoDetailMuted>
            {selectedScheme.canManageSchemes ? 'yes' : 'no'}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.maxProposalTime')}</span>
          <InfoDetailMuted>{formattedQuietEndingPeriod}</InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.canControlMainTreasury')}</span>
          <InfoDetailMuted>
            {selectedScheme.canMakeAvatarCalls ? 'yes' : 'no'}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.proposalTimeInBoost')}</span>
          <InfoDetailMuted>{formattedBoostedVotePeriodLimit}</InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.canChangeReputation')}</span>
          <InfoDetailMuted>
            {selectedScheme.canChangeReputation ? 'yes' : 'no'}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.proposalTimeInPreBoost')}</span>
          <InfoDetailMuted>
            {formattedPreBoostedVotePeriodLimit}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.maxRepPercentageChange')}</span>
          <InfoDetailMuted>
            {selectedScheme.maxRepPercentageChange}%
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>{t('schemes.type')}</span>
          <InfoDetailMuted>{selectedScheme.type}</InfoDetailMuted>
        </InfoDetail>
      </SchemePropertiesGrid>
    </CardBody>
  );
};
