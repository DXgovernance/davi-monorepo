import styled from 'styled-components';

export const VotesAmountWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  margin-left: 1rem;
`;

export const VotesAmount = styled.div`
  border-radius: 8px;
  padding: 0px 6px;
  color: ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.darkGreen1};
`;
