import { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { apolloClient } from 'clients/apollo';
import { FetcherHooksInterface } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import {
  getVotingMachineBySchemeDocument,
  getVotingMachineBySchemeQuery,
} from '.graphclient';

type IUseGetVotingMachineAddressBySchemeAddress =
  FetcherHooksInterface['useGetVotingMachineAddressBySchemeAddress'];

export const useGetVotingMachineAddressBySchemeAddress: IUseGetVotingMachineAddressBySchemeAddress =
  (schemeAddress: string) => {
    const { chain } = useNetwork();
    const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);
    const { data, loading, error } = useQuery<getVotingMachineBySchemeQuery>(
      getVotingMachineBySchemeDocument,
      {
        client: apolloClient[chainId]['Governance1.5'],
        variables: {
          schemeAddress: schemeAddress,
        },
      }
    );

    if (!data || !data.scheme || !data.scheme.votingMachine) return null;

    return {
      votingMachineAddress: data.scheme.votingMachine,
      isLoading: loading,
      isError: !!error,
    };
  };
