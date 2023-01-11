import { useContractEvent } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';

export const useListenToVoteAdded = (
  daoAddress: `0x${string}`,
  refetch: () => void,
  proposalId?: `0x${string}`
) => {
  useContractEvent({
    address: daoAddress ?? null,
    abi: BaseERC20Guild.abi,
    eventName: 'VoteAdded',
    listener(node, label, eventDetails) {
      if (!proposalId) refetch();
      else if (node === proposalId) refetch();
    },
  });
};
