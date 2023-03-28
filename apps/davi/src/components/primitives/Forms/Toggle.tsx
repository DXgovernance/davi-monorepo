import styled, { useTheme } from 'styled-components';
import Switch, { ReactSwitchProps } from 'react-switch';
import { FormElementProps } from 'components/primitives/Forms/types';
import { Flex } from '../Layout';

const StyledSwitch = styled(Switch)<ReactSwitchProps>`
  border: 1px solid ${({ theme }) => theme.colors.border1};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.text};
  }

  .react-switch-bg {
    box-sizing: border-box;
  }
`;

interface ToggleContainerProps {
  width?: string;
  marginTop?: string;
  marginRight?: string;
}

interface IToggle extends FormElementProps<boolean> {
  small?: boolean;
}
export const ToggleContainer = styled(Flex)<ToggleContainerProps>`
  width: ${({ width }) => width ?? 'auto'};
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-end'};
  margin-top: ${({ marginTop }) => marginTop ?? '0px'};
  margin-right: ${({ marginRight }) => marginRight ?? '0px'};
  gap: 10px;
`;

export const ToggleLabel = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey};
`;

export const Toggle: React.FC<IToggle> = ({
  value,
  onChange,
  small = false,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <StyledSwitch
      checked={value}
      onChange={(checked: boolean) => onChange(checked)}
      uncheckedIcon={false}
      checkedIcon={false}
      height={small ? 14 : 32}
      width={small ? 29 : 64}
      borderRadius={small ? 11 : 32}
      offColor={theme.colors.grey}
      onColor={theme.colors.yellow}
      onHandleColor={theme.colors.bg4}
      offHandleColor={theme.colors.bg4}
      handleDiameter={small ? 12 : 24}
      {...rest}
    />
  );
};
