import { useContractRead } from 'wagmi';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { Permission } from 'components/ActionsBuilder/types';
import { PermissionRegistry } from 'contracts/ts-files/PermissionRegistry';
import { FetcherHooksInterface } from 'stores/types';
import { useListenToPermissionSet } from '../events';

type IUseGetPermissions = FetcherHooksInterface['useGetPermissions'];

export const useGetPermissions: IUseGetPermissions = (
  daoAddress: `0x${string}`,
  permissionArgs: Permission
) => {
  const { data: guildConfig } = useGuildConfig(daoAddress);

  const { from, to, functionSignature } = permissionArgs;

  // The type castings are there because, if we use template literals
  // in the permissionArgs, it leads to the whole app needing 0x${string} types.

  const { data, refetch } = useContractRead({
    address: guildConfig?.permissionRegistry,
    abi: PermissionRegistry.abi,
    functionName: 'getETHPermission',
    args: [
      from as `0x${string}`,
      to as `0x${string}`,
      functionSignature as `0x${string}`,
    ],
  });

  useListenToPermissionSet(guildConfig?.permissionRegistry, refetch);

  return { data };
};
