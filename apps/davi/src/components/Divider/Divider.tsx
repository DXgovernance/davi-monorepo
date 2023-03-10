import styled from 'styled-components';

export interface DividerProps {
  style: string;
}
export const Divider = styled.div<{
  margin?: number | string;
  padding?: number | string;
}>`
  width: 100%;
  min-width: 200px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border1};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
`;
