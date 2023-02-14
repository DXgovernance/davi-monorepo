import styled from 'styled-components';
import { Heading } from 'components/primitives/Typography';
import { Box } from 'components/primitives/Layout/Box';

export const ProposalsList = styled(Box)`
  margin-top: 1rem;
`;

export const StyledHeading = styled(Heading)`
  margin-top: 32px;
  margin-bottom: 20px;
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
