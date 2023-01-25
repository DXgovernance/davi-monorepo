import { Box } from 'components/primitives/Layout';
import styled from 'styled-components';

export const InfoDetail = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const VoteOptionWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 1rem;
`;

export const VotesAmountWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  margin-left: 1rem;
`;

export const VotesAmount = styled.div`
  border-radius: 8px;
  padding: 0px 6px;
  background-color: ${({ theme }) => theme.colors.darkGreen1};
`;

export const VoteOption = styled.div`
  background-color: ${({ theme }) => theme.colors.darkGreen1};
  border-radius: 8px;
  padding: 2px 6px;
`;

export const Amount = styled.div`
  color: ${({ theme }) => theme.colors.grey};
`;
