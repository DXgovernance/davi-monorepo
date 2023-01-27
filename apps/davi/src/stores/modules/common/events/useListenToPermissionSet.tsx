import { PermissionRegistry } from 'contracts/ts-files/PermissionRegistry';
import { useContractEvent } from 'wagmi';

export const useListenToPermissionSet = (
  daoId: string,
  refetch: () => void
) => {
  useContractEvent({
    address: daoId,
    abi: PermissionRegistry.abi,
    eventName: 'PermissionSet',
    listener() {
      refetch();
    },
  });
};
