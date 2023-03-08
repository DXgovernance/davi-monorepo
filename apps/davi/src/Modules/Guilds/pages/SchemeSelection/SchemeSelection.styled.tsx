import { Divider } from 'components/Divider';
import { Box } from 'components/primitives/Layout';
import { Heading } from 'components/primitives/Typography';
import styled from 'styled-components';

export const CardContainer = styled(Box)`
  border-radius: ${({ theme }) => theme.radii.curved};
  background-color: ${({ theme }) => theme.colors.bg4};
  padding: 24px;
  padding-top: 1px;
`;

export const CardTitle = styled(Heading)`
  color: ${({ theme }) => theme.colors.yellow};
`;

export const CardBody = styled(Box)`
  padding-top: 24px;
`;

export const StyledDivider = styled(Divider)`
  margin: 0;
  margin-left: -24px;
  width: calc(100% + 48px);
`;
