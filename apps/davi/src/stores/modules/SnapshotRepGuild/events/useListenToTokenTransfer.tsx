import { useContractEvent } from 'wagmi';
import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';

export const useListenToTokenTransfer = (
  tokenAddress: string,
  refetch: () => void
) => {
  useContractEvent({
    address: tokenAddress,
    abi: ERC20SnapshotRep.abi,
    eventName: 'Transfer',
    listener() {
      refetch();
    },
  });
};
