import { Link } from 'react-router-dom';
import styled, {
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';

export interface LinkProps {
  customStyles?: string | FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

export const StyledLink = styled(Link)<LinkProps>`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  ${({ customStyles }) => customStyles}
`;
