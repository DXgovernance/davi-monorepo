import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useContractRead } from 'wagmi';

export const useMemberCount = (daoId: `0x${string}`) => {
  const { data, refetch, ...rest } = useContractRead({
    address: daoId,
    abi: BaseERC20Guild.abi,
    functionName: 'getTotalMembers',
  });

  return { data: Number(data), refetch, ...rest };
};
