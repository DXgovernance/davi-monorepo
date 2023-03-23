import { Link } from 'react-router-dom';
import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';

export interface LinkProps {
  customStyles?: string | FlattenInterpolation<ThemeProps<DefaultTheme>>;
  variant?: 'fill' | 'outline';
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
  ${({ variant }) =>
    variant === 'outline' &&
    css`
      button {
        background-color: ${({ theme }) => theme.colors.darkGreen1};
        outline: 1px solid ${({ theme }) => theme.colors.grey};
      }
    `}

  ${({ customStyles }) => customStyles}
`;
