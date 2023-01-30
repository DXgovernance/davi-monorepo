import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import { useDAOToken } from 'stores/modules/common/fetchers';
import { useContractRead } from 'wagmi';

export const useMemberCount = (daoId: `0x${string}`) => {
  const { data: tokenAddress } = useDAOToken(daoId);
  const { data, refetch, ...rest } = useContractRead({
    address: tokenAddress,
    abi: ERC20SnapshotRep.abi,
    functionName: 'getTotalHolders',
  });

  return { data: Number(data), refetch, ...rest };
};
