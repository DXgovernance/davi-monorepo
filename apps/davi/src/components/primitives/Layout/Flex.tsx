import styled, { css } from 'styled-components';

export const Flex = styled.div<{
  direction?: string;
  justifyContent?: string;
  alignItems?: string;
  margin?: number | string;
  padding?: number | string;
  gap?: number | string;
  fullWidth?: boolean;
}>`
  display: Flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'center'};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.curved};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  gap: ${({ gap }) => (gap ? gap : '0')};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;
