import styled from 'styled-components';
import { Divider } from 'components/Divider';
import { Button } from 'components/primitives/Button';
import { Box } from 'components/primitives/Layout';
import { Heading } from 'components/primitives/Typography';

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

export const SchemePropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 67px;
`;

export const NextButton = styled(Button)`
  height: 2.5rem;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.bg4};

  :hover {
    background-color: ${({ theme }) => theme.colors.darkGreen1};
    border: 1px solid ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.yellow};
    opacity: 1;
  }
`;

export const RadioInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
