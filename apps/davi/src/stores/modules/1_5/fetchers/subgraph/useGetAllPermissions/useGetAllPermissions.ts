import {
  getAllDaoFunctionCallPermissionsDocument,
  getAllDaoPermissionsDocument,
  getAllDaoPermissionsQuery,
  getAllDaoTokenPermissionsDocument,
} from '.graphclient';
import { useQuery } from '@apollo/client';
import { getApolloClient } from 'clients/apollo';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { useNetwork } from 'wagmi';

type IUseGetAllPermissions = FetcherHooksInterface['useGetAllPermissions'];

export const useGetAllPermissions: IUseGetAllPermissions = (
  schemeId,
  filter
) => {
  const { chain } = useNetwork();

  const queryToExecute = useMemo(() => {
    if (!filter) {
      return getAllDaoPermissionsDocument;
    }

    if (filter === 'functionCalls') {
      return getAllDaoFunctionCallPermissionsDocument;
    }

    if (filter === 'tokens') {
      return getAllDaoTokenPermissionsDocument;
    }
  }, [filter]);

  const { data, loading, error } = useQuery<getAllDaoPermissionsQuery>(
    queryToExecute,
    {
      client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
      variables: { from: schemeId?.toLowerCase() },
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
