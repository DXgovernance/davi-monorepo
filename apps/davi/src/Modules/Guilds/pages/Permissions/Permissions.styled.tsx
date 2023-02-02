import styled from 'styled-components';
import { Box, Flex } from 'components/primitives/Layout';

export const MainContainer = styled(Box)`
  border-bottom-left-radius: ${({ theme }) => theme.radii.curved};
  border-bottom-right-radius: ${({ theme }) => theme.radii.curved};
  background-color: ${({ theme }) => theme.colors.bg4};
  padding: 1px 24px 24px 24px;
`;

export const TabContainer = styled(Flex)`
  flex-direction: row;
  align-items: stretch;
`;

export const TabContent = styled.button<{
  active: boolean;
  position: 'left' | 'right';
}>`
  border: none;
  width: 50%;

  border-top-left-radius: ${({ position, theme }) =>
    position === 'left' ? theme.radii.curved : 0};

  border-top-right-radius: ${({ position, theme }) =>
    position === 'right' ? theme.radii.curved : 0};

  color: ${({ active, theme }) =>
    active ? theme.colors.active : theme.colors.grey};

  background-color: ${({ active, theme }) =>
    active ? theme.colors.bg4 : theme.colors.darkGreen2};

  border-bottom: 1px solid
    ${({ active, theme }) =>
      active ? theme.colors.yellow : theme.colors.darkGreen2};

  &:hover {
    cursor: pointer;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableRow = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.darkGreen1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGreen1};
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
  width?: string;
  alignment?: 'left' | 'center' | 'right';
}>`
  height: 24px;
  padding: 12px 0px;
  font-weight: 400;
  text-align: ${({ alignment }) => alignment ?? 'center'};
  width: ${({ width }) => width ?? 'auto'};
`;

export const TokenNameAndSymbol = styled(Flex)`
  gap: 10px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ToggleContainer = styled(Flex)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 10px;
`;

export const ToggleLabel = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey};
`;
