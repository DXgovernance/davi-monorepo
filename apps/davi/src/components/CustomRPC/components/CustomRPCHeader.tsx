import { useTranslation } from 'react-i18next';
import {
  Toggle,
  ToggleContainer,
  ToggleLabel,
} from 'components/primitives/Forms/Toggle';
import { ChainContainer, ChainName, IconWrapper } from '../CustomRPC.styled';
import { Flex } from 'components/primitives/Layout';
import { Chain } from 'wagmi';

interface ChainOptionProps {
  chain: Chain;
  icon: string;
  isDefaultValue: boolean;
  setIsDefaultValue: (isDefaultValue: boolean) => void;
}

export const CustomRPCHeader: React.FC<ChainOptionProps> = ({
  chain,
  icon,
  isDefaultValue,
  setIsDefaultValue,
}) => {
  const { t } = useTranslation();

  return (
    <Flex direction="row">
      <ChainContainer>
        <IconWrapper>{icon && <img src={icon} alt={'Icon'} />}</IconWrapper>
        <ChainName> {chain.name}</ChainName>
      </ChainContainer>
      <ToggleContainer width="100%">
        <ToggleLabel>{t('customRPC.useDefaultValue')}</ToggleLabel>
        <Toggle
          value={isDefaultValue}
          onChange={() => setIsDefaultValue(!isDefaultValue)}
          small
          name="toggle-is-default-value"
        />
      </ToggleContainer>
    </Flex>
  );
};
