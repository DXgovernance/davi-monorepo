import { ChainContainer, ChainName, IconWrapper } from '../CustomRPC.styled';

interface ChainOptionProps {
  name: string;
  icon: string;
}

export const Chain: React.FC<ChainOptionProps> = ({ name, icon }) => {
  return (
    <ChainContainer>
      <IconWrapper>{icon && <img src={icon} alt={'Icon'} />}</IconWrapper>
      <ChainName> {name}</ChainName>
    </ChainContainer>
  );
};
