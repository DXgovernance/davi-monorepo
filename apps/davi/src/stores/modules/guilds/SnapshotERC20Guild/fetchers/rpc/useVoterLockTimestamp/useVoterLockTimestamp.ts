import { unix } from 'moment';
import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useListenToLockAndWithdrawTokens } from 'stores/modules/guilds/SnapshotERC20Guild/events';
import { useListenToVoteAdded } from 'stores/modules/guilds/common/events';
import { FetcherHooksInterface } from 'stores/types';

type IUseVoterLockTimestamp = FetcherHooksInterface['useVoterLockTimestamp'];

export const useVoterLockTimestamp: IUseVoterLockTimestamp = (
  contractAddress: `0x${string}`,
  userAddress: `0x${string}`
) => {
  const { data, refetch, ...rest } = useContractRead({
    address: contractAddress ?? null,
    abi: BaseERC20Guild.abi,
    functionName: 'getVoterLockTimestamp',
    args: [userAddress],
  });

  useListenToLockAndWithdrawTokens(contractAddress, refetch);
  useListenToVoteAdded(contractAddress, refetch);

  return {
    data: data ? unix(Number(data)) : undefined,
    ...rest,
  };
};
