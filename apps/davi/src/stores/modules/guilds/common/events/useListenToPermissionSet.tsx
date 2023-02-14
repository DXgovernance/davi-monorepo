import { useContractEvent } from 'wagmi';
import { PermissionRegistry } from 'contracts/ts-files/PermissionRegistry';

export const useListenToPermissionSet = (
  daoAddress: string,
  refetch: () => void
) => {
  useContractEvent({
    address: daoAddress,
    abi: PermissionRegistry.abi,
    eventName: 'PermissionSet',
    listener() {
      refetch();
    },
  });
};
