import { getChainIcon } from 'utils';
import { useNetwork } from 'wagmi';
import { Chain, CustomRPCInput } from './components';
import {
  ChainOptionContainer as ChainContainer,
  CustomRPCModal,
} from './CustomRPC.styled';

export const CustomRPC: React.FC = () => {
  const { chains } = useNetwork();

  return (
    <CustomRPCModal>
      {chains.map(chain => (
        <ChainContainer key={chain.id}>
          <Chain name={chain.name} icon={getChainIcon(chain.id)} />
          <CustomRPCInput chain={chain} />
        </ChainContainer>
      ))}
    </CustomRPCModal>
  );
};
