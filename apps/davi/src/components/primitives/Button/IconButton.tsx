import styled from 'styled-components';
import { Button } from '.';

type IconButtonProps = {
  iconLeft?: boolean;
  iconRight?: boolean;
  backgroundColor?: string;
  outline?: string;
  padding?: string;
  marginTop?: string;
};

export const IconButton = styled(Button)<IconButtonProps>`
  svg,
  img {
    ${props => props.iconLeft && `margin-right: .4rem; `}
    ${props => props.iconRight && `margin-left: .2rem;`}
  },
  button {
    ${props =>
      props.iconLeft &&
      `padding: .25rem 0.6rem; 
    `};
    ${props =>
      `background-color: ${props.backgroundColor ?? props.theme.colors.bg1};
      color: ${props.theme.colors.white}
      `}
      `;

export const ButtonIcon = styled.img`
  height: 1.6rem;
  width: 1.6rem;
`;
