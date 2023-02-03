import { Box } from 'components/primitives/Layout';
import styled from 'styled-components';

export const VoteOption = styled.div`
  background-color: ${({ theme }) => theme.colors.darkGreen1};
  border-radius: 8px;
  padding: 2px 6px;
`;

export const VoteOptionWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 1rem;
`;

export const InfoDetail = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const Amount = styled.div`
  color: ${({ theme }) => theme.colors.grey};
`;
