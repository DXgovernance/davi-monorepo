import { Button } from 'components/primitives/Button';
import styled, { css } from 'styled-components';

interface ToggleLabelProps {
  selected: boolean;
}

export const ButtonsContainer = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 1.5rem;
`;

export const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
`;

export const VoteOptionsLabel = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 0.5rem;
`;

export const VoteActionButton = styled(Button)`
  height: 2.5rem;

  :disabled {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border1};
    color: ${({ theme }) => theme.colors.grey};
    opacity: 1;
  }
`;

export const ToggleLabel = styled.div<ToggleLabelProps>`
  white-space: nowrap;
  margin-left: 1rem;
  font-size: 0.7rem;
  ${({ selected }) =>
    !selected &&
    css`
      color: ${({ theme }) => theme.colors.grey} !important;
    `}
`;

export const VoteOptionButton = styled(VoteActionButton)<{
  active?: boolean;
  selected?: boolean;
  optionKey?: number;
}>`
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.bg1};
  opacity: 0.9;

  border-color: ${({ theme, optionKey }) => theme.colors.votes[optionKey]};
  color: ${({ theme, optionKey }) => theme.colors.votes[optionKey]};
  :hover {
    background-color: ${({ theme, optionKey }) =>
      theme.colors.votes[optionKey]};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme, optionKey }) =>
      `${theme.colors.votes[optionKey]} !important`};
  }

  ${({ active, selected, optionKey }) =>
    (active || selected) &&
    css`
      background-color: ${({ theme }) => theme.colors.votes[optionKey]};
      color: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) => theme.colors.white};
      opacity: 1;
    `}
`;
