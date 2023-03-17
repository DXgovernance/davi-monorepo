import styled, { css } from 'styled-components';

type TextAlignTypes =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'justify-all'
  | 'match-parent';

export const Text = styled.span<{
  bold?: boolean;
  sizeVariant?: 'normal' | 'big' | 'small';
  colorVariant?: 'normal' | 'accentuated' | 'muted';
  color?: string;
  textAlign?: TextAlignTypes;
}>`
  font-size: ${
    ({ sizeVariant, theme }) =>
      sizeVariant === 'normal' || !sizeVariant
        ? theme.fontSizes.body
        : sizeVariant === 'big'
        ? theme.fontSizes.bodyBig
        : sizeVariant === 'small'
        ? theme.fontSizes.label
        : theme.fontSizes.body // default
  };

  font-weight: ${({ bold, theme }) =>
    bold ? theme.fontWeights.bold : theme.fontWeights.regular};

  color: ${
    ({ color, colorVariant, theme }) =>
      color
        ? color
        : colorVariant === 'normal' || !colorVariant
        ? theme.colors.text
        : colorVariant === 'accentuated'
        ? theme.colors.active
        : colorVariant === 'muted'
        ? theme.colors.grey
        : theme.colors.text // default
  };

  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `}
`;
