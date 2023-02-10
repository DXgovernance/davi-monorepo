import styled from 'styled-components';
import { Box } from 'components/primitives/Layout/Box';

export const ProposalsList = styled(Box)`
  margin-top: 1rem;
`;

export const ActionButtonContainer = styled(Box)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
