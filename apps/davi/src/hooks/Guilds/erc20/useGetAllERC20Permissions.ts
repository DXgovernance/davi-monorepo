import { PermissionRegistry } from 'contracts/ts-files/PermissionRegistry';
import { useMemo } from 'react';
import { useHookStoreProvider } from 'stores';
import { useContractReads, useNetwork } from 'wagmi';
import { TokenType, useTokenList } from '../tokens/useTokenList';

export const useGetAllERC20Permissions = (daoId: string) => {
  const {
    hooks: {
      fetchers: { useGuildConfig },
    },
  } = useHookStoreProvider();
  const { chain } = useNetwork();

  const { data: guildConfig } = useGuildConfig(daoId);
  const { tokens } = useTokenList(chain?.id, true);

  const erc20Tokens = useMemo(
    () => tokens.filter(token => token.type === TokenType.ERC20),
    [tokens]
  );

  const { data } = useContractReads({
    contracts: erc20Tokens.map(token => ({
      address: guildConfig?.permissionRegistry,
      abi: PermissionRegistry.abi,
      functionName: 'getERC20Limit',
      args: [daoId, token.address],
    })),
  });

  console.log(data);

  return { data };
};

