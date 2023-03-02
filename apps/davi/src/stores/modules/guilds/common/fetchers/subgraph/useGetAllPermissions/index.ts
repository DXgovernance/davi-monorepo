import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import {
  getAllPermissionsQuery,
  getAllPermissionsDocument,
  getAllFunctionCallPermissionsDocument,
  getAllTokenPermissionsDocument,
} from '.graphclient';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { getApolloClient } from 'clients/apollo';
import { useNetwork } from 'wagmi';

type IUseGetAllPermissions = FetcherHooksInterface['useGetAllPermissions'];

export const useGetAllPermissions: IUseGetAllPermissions = (daoId, filter) => {
  const { chain } = useNetwork();

  const queryToExecute = useMemo(() => {
    if (!filter) {
      return getAllPermissionsDocument;
    }

    if (filter === 'functionCalls') {
      return getAllFunctionCallPermissionsDocument;
    }

    if (filter === 'tokens') {
      return getAllTokenPermissionsDocument;
    }
  }, [filter]);

  const { data, loading, error } = useQuery<getAllPermissionsQuery>(
    queryToExecute,
    {
      client: getApolloClient(SupportedSubgraph.Guilds, chain?.id),
      variables: { id: daoId?.toLocaleLowerCase() },
    }
  );

  const parsedData = useMemo(() => {
    return data?.guild?.permissions?.map(permission => {
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
  }, [data?.guild?.permissions]);

  return {
    data: parsedData,
    isLoading: loading,
    isError: !!error,
  };
};
