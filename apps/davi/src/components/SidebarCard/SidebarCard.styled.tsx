import styled, { css } from 'styled-components';
import { Heading } from 'components/primitives/Typography';
import { Box } from 'components/primitives/Layout/Box';

export const SidebarCardHeader = styled(Heading)`
  font-weight: 600;
  margin: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const SidebarCardHeaderSpaced = styled(SidebarCardHeader)`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.yellow};
`;

export const SidebarCardContent = styled(Box)`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const cardWrapperStyles = css`
  margin-bottom: 1rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.colors.bg1};
`;

export const SidebarCardContentWrapper = styled(Box)`
  overflow: auto;
  max-height: 10rem;
  margin-bottom: 1rem;
  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.yellow};
    border-radius: 10px;
    border: 3px solid ${({ theme }) => theme.colors.bg3};
  }
  * {
    scrollbar-width: 12px;
    scrollbar-color: ${({ theme }) => theme.colors.border1} transparent;
  }
`;
