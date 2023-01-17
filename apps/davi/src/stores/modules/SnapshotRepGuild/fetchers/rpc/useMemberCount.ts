import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import { useContractRead } from 'wagmi';

export const useMemberCount = (daoId: `0x${string}`) => {
  // TODO: Convert useGuildToken to the new architecture
  const { data: tokenAddress } = useGuildToken(daoId);
  const { data, refetch, ...rest } = useContractRead({
    address: tokenAddress,
    abi: ERC20SnapshotRep.abi,
    functionName: 'getTotalHolders',
  });

  return { data: Number(data), refetch, ...rest };
};
