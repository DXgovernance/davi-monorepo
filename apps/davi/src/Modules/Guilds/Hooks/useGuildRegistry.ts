import { GuildRegistry } from 'contracts/ts-files/GuildRegistry';
import useNetworkConfig from 'hooks/Guilds/useNetworkConfig';
import { useContractRead } from 'wagmi';

export const useGuildRegistry = (contractAddress?: string) => {
  const config = useNetworkConfig();
  const { data, isLoading, error } = useContractRead({
    address: contractAddress || config?.contracts?.utils.guildRegistry,
    abi: GuildRegistry.abi,
    functionName: 'getGuildsAddresses',
  });

  return { data, isLoading, error };
};
