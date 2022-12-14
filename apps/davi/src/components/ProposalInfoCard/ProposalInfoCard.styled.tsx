import { Box } from 'components/primitives/Layout/Box';
import styled, { css } from 'styled-components';

export const InfoDetail = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const InfoDetailMuted = styled.span`
  color: ${({ theme }) => theme.colors.grey};
`;

export const ProposalHistoryIcon = styled.span<{ active?: boolean }>`
  cursor: pointer;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: ${({ theme }) => theme.colors.border3};
  }
  ${({ active }) =>
    active &&
    css`
      border-color: ${({ theme }) => theme.colors.border3};
    `}
`;
