import { Bullet } from 'components/primitives/Bullet';
import { Loading } from 'components/primitives/Loading';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { getOptionLabel } from 'components/ProposalVoteCard/utils';
import {
  ResultRowProps,
  VoteResultsProps,
} from 'components/ProposalVoteCard/types';
import {
  VotesRowWrapper,
  VoteOption,
  OptionBullet,
} from './VoteOptions.styled';

const VoteOptionsRow: React.FC<ResultRowProps> = ({
  optionKey,
  proposalMetadata,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const isReady = optionKey !== undefined;

  const label = getOptionLabel({ metadata: proposalMetadata, optionKey, t });
  return (
    <VotesRowWrapper>
      <VoteOption>
        <OptionBullet>
          {isReady ? (
            <Bullet color={theme?.colors?.votes?.[optionKey]} size={8} />
          ) : (
            <Loading
              loading
              text
              skeletonProps={{ circle: true, height: 16, width: 16 }}
            />
          )}
        </OptionBullet>
        {isReady ? label : <Loading loading text />}
      </VoteOption>
    </VotesRowWrapper>
  );
};

const VoteOptions: React.FC<VoteResultsProps> = ({
  // isPercent,
  options,
  proposalMetadata,
}) => {
  const orderedOptions = options && [...Object.keys(options).slice(1), '0'];

  return orderedOptions ? (
    <>
      {orderedOptions.map(key => (
        <VoteOptionsRow
          key={key}
          optionKey={Number(key)}
          // isPercent={isPercent}
          options={options}
          proposalMetadata={proposalMetadata}
        />
      ))}
    </>
  ) : (
    <>
      <VoteOptionsRow
        // isPercent={isPercent}
        options={options}
        proposalMetadata={proposalMetadata}
      />
      <VoteOptionsRow
        // isPercent={isPercent}
        options={options}
        proposalMetadata={proposalMetadata}
      />
    </>
  );
};

export default VoteOptions;
