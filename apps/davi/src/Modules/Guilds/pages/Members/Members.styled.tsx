import { Box } from 'components/primitives/Layout';
import styled from 'styled-components';

export const MainContainer = styled(Box)`
  border-radius: ${({ theme }) => theme.radii.curved};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

// TODO: change this color to a reference when the theme is updated
export const TableRow = styled.tr`
  border-bottom: 1px solid #2f3533;
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid #2f3533;
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
