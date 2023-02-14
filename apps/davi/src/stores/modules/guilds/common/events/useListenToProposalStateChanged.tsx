import { useContractEvent } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';

export const useListenToProposalStateChanged = (
  daoId: string,
  refetch: () => void,
  proposalId?: string,
  state?: number
) => {
  useContractEvent({
    address: daoId,
    abi: BaseERC20Guild.abi,
    eventName: 'ProposalStateChanged',
    listener(node, label, eventDetails) {
      if (proposalId && state) {
        const proposalState = eventDetails.args[1].toNumber();
        const eventProposalId = eventDetails.args[0];
        if (proposalState === state && eventProposalId === proposalId) {
          refetch();
        }
        return;
      }

      if (proposalId) {
        const eventProposalId = eventDetails.args[0];
        if (eventProposalId === proposalId) refetch();
        return;
      }

      if (state) {
        const proposalState = eventDetails.args[1].toNumber();
        if (proposalState === state) refetch();
        return;
      }

      refetch();
    },
  });
};
