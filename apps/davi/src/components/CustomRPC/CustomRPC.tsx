import { useNetwork } from 'wagmi';
import { CustomRPCOption } from './components';
import { CustomRPCModal } from './CustomRPC.styled';

export const CustomRPC: React.FC = () => {
  const { chains } = useNetwork();

  return (
    <CustomRPCModal>
      {chains.map(chain => (
        <CustomRPCOption key={chain.id} chain={chain} />
      ))}
    </CustomRPCModal>
  );
};
