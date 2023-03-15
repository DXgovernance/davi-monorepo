import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import { useNetwork } from 'wagmi';

import { getPermissionDocument, getPermissionQuery } from '.graphclient';
import { getApolloClient } from 'clients/apollo';
import { Permission } from 'components/ActionsBuilder/types';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';

type IUseGetPermissions = FetcherHooksInterface['useGetPermissions'];

export const useGetPermissions: IUseGetPermissions = (
  daoId: `0x${string}`,
  permissionArgs: Permission
) => {
  const { chain } = useNetwork();

  const { from, to, functionSignature } = permissionArgs;

  const { data, loading, error } = useQuery<getPermissionQuery>(
    getPermissionDocument,
    {
      client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
      variables: {
        from: from?.toLowerCase(),
        to: to?.toLowerCase(),
        functionSignature: functionSignature,
      },
    }
  );

  if (!data || !data.permissions) return null;

  if (data.permissions.length === 0) {
    return {
      data: {
        valueAllowed: BigNumber.from('0'),
        fromTime: BigNumber.from('0'),
      },
      isLoading: loading,
      isError: !!error,
    };
  } else
    return {
      data: data.permissions[0],
      isLoading: loading,
      isError: !!error,
    };
};
