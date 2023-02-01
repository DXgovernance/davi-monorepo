import {
  getAllTokenPermissionsDocument,
  getAllTokenPermissionsQuery,
} from '.graphclient';
import { useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';

// ! This currently only fetches token permissions

type IUseGetAllPermissions = FetcherHooksInterface['useGetAllPermissions'];

export const useGetAllPermissions: IUseGetAllPermissions = (daoId: string) => {
  const { data, loading, error } = useQuery<getAllTokenPermissionsQuery>(
    getAllTokenPermissionsDocument,
    {
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
