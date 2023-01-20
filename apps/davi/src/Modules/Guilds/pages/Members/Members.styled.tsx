import { Box } from 'components/primitives/Layout';
import styled from 'styled-components';

export const MainContainer = styled(Box)`
  border-radius: ${({ theme }) => theme.radii.curved};
`;

export const Table = styled.table`
  width: 100%;
`;

export const TableHeader = styled.th<{
  alignment?: 'left' | 'center' | 'right';
}>`
  text-align: ${({ alignment }) => (alignment ? alignment : 'center')};
`;

export const TableCell = styled.td<{
  alignment?: 'left' | 'center' | 'right';
}>`
  text-align: ${({ alignment }) => (alignment ? alignment : 'center')};
`;
