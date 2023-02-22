import styled from 'styled-components';
import { Box } from '../Layout';

export const StyledSegmentLink = styled.a`
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-decoration: none;
  overflow-wrap: break-word;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const LinkDetail = styled(Box)`
  overflow-wrap: break-word;
`;
