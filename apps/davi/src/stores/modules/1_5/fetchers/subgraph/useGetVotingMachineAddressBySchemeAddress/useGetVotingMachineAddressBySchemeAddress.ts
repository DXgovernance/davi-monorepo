import { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { apolloClient } from 'clients/apollo';
import { CHAIN_ID } from 'utils';
import {
  getVotingMachineBySchemeDocument,
  getVotingMachineBySchemeQuery,
} from '.graphclient';

type IUseGetVotingMachineAddressBySchemeAddress = (schemeAddress: string) => {
  votingMachineAddress: string;
  isError: boolean;
  isLoading: boolean;
};

export const useGetVotingMachineAddressBySchemeAddress: IUseGetVotingMachineAddressBySchemeAddress =
  (schemeAddress: string) => {
    const { chain } = useNetwork();
    const chainId: CHAIN_ID = useMemo(() => chain?.id, [chain]);
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
