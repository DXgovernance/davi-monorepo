import { Divider } from 'components/Divider';
import { Box } from 'components/primitives/Layout';
import styled from 'styled-components';

export const MainContainer = styled(Box)`
  border-radius: ${({ theme }) => theme.radii.curved};
  background-color: ${({ theme }) => theme.colors.bg4};
  margin-top: 20px;
  padding: 1px 24px 8px 24px;
`;

export const StyledDivider = styled(Divider)`
  margin: 0;
  margin-left: -24px;
  width: calc(100% + 48px);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableRow = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.darkGreen1};
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGreen1};
`;

export const TableHeader = styled.th<{
  alignment?: 'left' | 'center' | 'right';
}>`
  padding-bottom: 12px;
  font-weight: 400;
  text-align: ${({ alignment }) => (alignment ? alignment : 'center')};
  font-size: ${({ theme }) => theme.fontSizes.label};
  color: ${({ theme }) => theme.colors.grey};
`;

export const TableCell = styled.td<{
  width: string;
  alignment?: 'left' | 'center' | 'right';
}>`
  height: 24px;
  padding: 12px 0px;
  font-weight: 400;
  text-align: ${({ alignment }) => (alignment ? alignment : 'center')};
  width: ${({ width }) => width};
`;
