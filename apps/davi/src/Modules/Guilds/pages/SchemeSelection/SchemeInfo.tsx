import { getSchemesQuery } from '.graphclient';
import {
  InfoDetail,
  InfoDetailMuted,
} from 'components/ProposalInfoCard/ProposalInfoCard.styled';
import { BigNumber } from 'ethers';
import moment from 'moment';
import { CardBody, SchemePropertiesGrid } from './SchemeSelection.styled';

type Scheme = getSchemesQuery['dao']['schemes'][0];

const humanizedTime = (time: string) => {
  const timeInSeconds = Number.parseInt(time);
  return moment.duration(timeInSeconds, 'seconds').humanize({ ss: 1 });
};

export const SchemeInfo = ({ selectedScheme }: { selectedScheme: Scheme }) => {
  console.log(selectedScheme.votingMachine.boostedVotePeriodLimit);

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
          <span>Quorum</span>
          <InfoDetailMuted>
            {formattedBoostedVoteRequiredPercentage}%
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>Can manage schemes</span>
          <InfoDetailMuted>
            {selectedScheme.canManageSchemes ? 'yes' : 'no'}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>Proposal time max</span>
          <InfoDetailMuted>{formattedQuietEndingPeriod}</InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>Can control main treasury</span>
          <InfoDetailMuted>
            {selectedScheme.canMakeAvatarCalls ? 'yes' : 'no'}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>Proposal time in boost</span>
          <InfoDetailMuted>{formattedBoostedVotePeriodLimit}</InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>Can change reputation</span>
          <InfoDetailMuted>
            {selectedScheme.canChangeReputation ? 'yes' : 'no'}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>Proposal time in pre boost</span>
          <InfoDetailMuted>
            {formattedPreBoostedVotePeriodLimit}
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>Max rep percentage change</span>
          <InfoDetailMuted>
            {selectedScheme.maxRepPercentageChange}%
          </InfoDetailMuted>
        </InfoDetail>

        <InfoDetail>
          <span>Type</span>
          <InfoDetailMuted>{selectedScheme.type}</InfoDetailMuted>
        </InfoDetail>
      </SchemePropertiesGrid>
    </CardBody>
  );
};
