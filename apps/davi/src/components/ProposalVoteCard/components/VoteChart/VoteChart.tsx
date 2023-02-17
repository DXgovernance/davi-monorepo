import { useTheme } from 'styled-components';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { Loading } from 'components/primitives/Loading';
import { BigNumber } from 'ethers';
import {
  VotesChartContainer,
  VotesChartRow,
  ChartBar,
  VoteQuorumContainer,
  VoteQuorumMarker,
  VoteQuorumLabel,
  PaddedFlagCheckered,
  VoteChartRowsContainer,
  VoteResult,
} from './VoteChart.styled';
import { VoteChartProps } from '../../types';
import { formatUnits } from 'ethers/lib/utils';

//TODO: rewrite css dynamics types
const VotesChart: React.FC<VoteChartProps> = ({ isPercent, voteData }) => {
  const theme = useTheme();

  const nQuorum = useBigNumberToNumber(
    voteData?.quorum,
    voteData?.token?.decimals
  );
  const flagCheckered = useVotingPowerPercent(
    voteData?.quorum,
    voteData?.totalLocked
  );

  const voteOptionswithVotingPower = Object.entries(voteData.options).filter(
    ([idx, item]) => !BigNumber.from(item).isZero()
  ).length;

  return (
    <VotesChartContainer>
      {voteData?.options ? (
        <>
          {Object.entries(voteData.options).map(([idx, item]) => {
            const percentBN = BigNumber.from(
              voteData?.totalLocked || 0
            ).isZero()
              ? BigNumber.from(0)
              : item.mul(100).mul(Math.pow(10, 2)).div(voteData?.totalLocked);
            const percent = Math.round(percentBN.toNumber()) / Math.pow(10, 2);

            return percent > 0 ? (
              <VoteChartRowsContainer>
                <VotesChartRow>
                  <ChartBar
                    key={idx}
                    percent={percent}
                    color={theme?.colors?.votes?.[idx]}
                  />
                </VotesChartRow>
                <VoteResult>
                  {isPercent
                    ? `${percent}%`
                    : `${formatUnits(voteData?.options?.[idx] || 0)} ${
                        voteData?.token?.symbol
                      }`}
                </VoteResult>
              </VoteChartRowsContainer>
            ) : (
              <></>
            );
          })}
        </>
      ) : (
        <Loading loading text skeletonProps={{ height: 24, count: 2 }} />
      )}
      {voteOptionswithVotingPower === 0 && (
        <VoteChartRowsContainer>
          <VotesChartRow>
            <ChartBar />
          </VotesChartRow>
        </VoteChartRowsContainer>
      )}
      {voteData && (
        <VoteQuorumContainer quorum={flagCheckered}>
          <VoteQuorumMarker
            optionsAmount={
              voteOptionswithVotingPower === 0 ? 1 : voteOptionswithVotingPower
            }
          />
          <VoteQuorumLabel quorum={flagCheckered}>
            <PaddedFlagCheckered />
            <span>{isPercent ? flagCheckered : nQuorum}</span>
            <span>{isPercent ? '%' : voteData?.token?.symbol}</span>
          </VoteQuorumLabel>
        </VoteQuorumContainer>
      )}
    </VotesChartContainer>
  );
};

export default VotesChart;
