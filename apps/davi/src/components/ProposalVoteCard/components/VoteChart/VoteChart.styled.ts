import styled from 'styled-components';
import { FaFlagCheckered } from 'react-icons/fa';

export const VotesChartContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  margin: 10px 0px 40px 0px;
  width: 100%;
`;

export const VotesChartRow = styled.div`
  display: flex;
  flex: 1;
  height: 0.5rem;
  margin-top: 2%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border1};
  border-radius: ${({ theme }) => theme.radii.pill};
`;

export const ChartBar = styled.div<{ percent?: number; color?: string }>`
  width: ${({ percent }) => (percent ? `${percent}%` : '')};
  border-radius: ${({ theme }) => theme.radii.pill};

  background: ${({ color }) => color};
  height: 0.5rem;
  overflow: hidden;
`;

export const VoteResult = styled.span<{}>`
  margin-left: 1rem;
`;

export const VoteQuorumMarker = styled.div<{
  optionsAmount: number;
}>`
  height: ${({ optionsAmount }) => `${1.2 * optionsAmount}rem`};
  margin-top: 5px;
  width: 1px;
  background: ${({ theme }) => theme.colors.bg1};
`;

// todo: change to theme.
export const VoteChartRowsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const VoteQuorumLabel = styled.div<{ quorum: number }>`
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: ${({ quorum, theme }) =>
    quorum < 10
      ? `0px ${theme.radii.pill} ${theme.radii.pill}`
      : quorum > 90
      ? `${theme.radii.pill} 0px ${theme.radii.pill} ${theme.radii.pill}`
      : `${theme.radii.pill}`};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  align-items: center;
  display: flex;

  span {
    margin-left: 2px;
  }
`;

// If quorum <10, we align to left the marker and label, and left position of container is quorum.
// if 10 < quorum < 90, we left position the container at the quorum - the half of the width of the label, centered flex.
// quorum > 90, we align the container at the quorum - the full width of the label, right alignment label and marker.
export const VoteQuorumContainer = styled.div<{ quorum: number }>`
  width: 65px;
  position: absolute;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: ${({ quorum }) =>
    quorum < 10 ? 'flex-start' : quorum > 90 ? 'flex-end' : 'center'};
  left: ${({ quorum }) => `${quorum}px`};
`;

export const PaddedFlagCheckered = styled(FaFlagCheckered)`
  margin-right: 0.4rem;
`;
