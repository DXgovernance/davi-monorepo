import { Button } from 'components/primitives/Button';
import { RadioInput } from 'components/primitives/Forms/RadioInput';
import { ContainerText, Flex } from 'components/primitives/Layout';
import styled from 'styled-components';

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

export const VoteActionButton = styled(Button)`
  height: 2.5rem;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
`;

export const VoteActionButtonContainer = styled.div`
  margin: 1rem;
`;

export const StyledRadioInput = styled(RadioInput)<{
  optionKey?: number;
}>`
  accent-color: ${({ theme, optionKey }) => theme.colors.votes[optionKey]};
  :hover {
    border-color: ${({ theme, optionKey }) => theme.colors.votes[optionKey]};
  }

  :checked {
    background-color: ${({ theme, optionKey }) =>
      theme.colors.votes[optionKey]};
  }
`;

export const OptionContainer = styled(Flex)<{
  optionKey?: number;
}>`
  flex-direction: row;
  justify-content: left;
  border-top: 1px solid ${({ theme }) => theme.colors.darkGreen1};
  border-radius: 0px;
  cursor: pointer;
`;

export const OptionText = styled(ContainerText)<{
  optionKey?: number;
}>`
  color: ${({ theme, optionKey }) => theme.colors.votes[optionKey]};
  padding: 0.7rem;
`;
