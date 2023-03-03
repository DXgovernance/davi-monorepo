import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import { useNetwork } from 'wagmi';

import { getPermissionDocument, getPermissionQuery } from '.graphclient';
import { apolloClient } from 'clients/apollo';
import { Permission } from 'components/ActionsBuilder/types';
import { FetcherHooksInterface } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';

type IUseGetPermissions = FetcherHooksInterface['useGetPermissions'];

export const useGetPermissions: IUseGetPermissions = (
  daoId: `0x${string}`,
  permissionArgs: Permission
) => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { from, to, functionSignature } = permissionArgs;

  const { data, loading, error } = useQuery<getPermissionQuery>(
    getPermissionDocument,
    {
      client: apolloClient[chainId]['Governance1.5'],
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
