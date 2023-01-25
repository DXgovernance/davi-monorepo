import styled from 'styled-components';
import { Heading } from 'components/primitives/Typography';
import { Button } from 'components/primitives/Button';
import { Box } from 'components/primitives/Layout/Box';

export const ProposalsList = styled(Box)`
  margin-top: 1rem;
`;

export const StyledHeading = styled(Heading)`
  margin-top: 32px;
  margin-bottom: 20px;
`;

export const StyledButton = styled(Button)`
  white-space: nowrap;
  height: 45px;
  border-color: ${({ theme }) => theme.colors.grey3};
`;
