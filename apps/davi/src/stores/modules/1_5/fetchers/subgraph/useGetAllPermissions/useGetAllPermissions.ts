import {
  getDaoPermissionsDocument,
  getDaoPermissionsQuery,
} from '.graphclient';
import { useQuery } from '@apollo/client';
import { apolloClient } from 'clients/apollo';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import { useNetwork } from 'wagmi';

type IUseGetAllPermissions = FetcherHooksInterface['useGetAllPermissions'];

export const useGetAllPermissions: IUseGetAllPermissions = daoId => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { data, loading, error } = useQuery<getDaoPermissionsQuery>(
    getDaoPermissionsDocument,
    {
      client: apolloClient[chainId]['Governance1.5'],
      variables: { id: daoId?.toLowerCase() },
    }
  );

  const permissions = useMemo(() => {
    if (!data || !data.permissions) return undefined;
    return data.permissions.map(permission => {
      return {
        id: permission.id,
        to: permission.to,
        from: permission.from,
        valueAllowed: BigNumber.from(permission.valueAllowed),
        fromTime: BigNumber.from(permission.fromTime),
        functionSignature: permission.functionSignature,
        allowed: permission.allowed,
      };
    });
  }, [data]);

  return {
    data: permissions,
    isLoading: loading,
    isError: !!error,
  };
};
