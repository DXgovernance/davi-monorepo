import { getVotingPowerOfDocument, getVotingPowerOfQuery } from '.graphclient';
import { useQuery } from '@apollo/client';
import { getApolloClient } from 'clients/apollo';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { useNetwork } from 'wagmi';

type IUseVotingPowerOf = FetcherHooksInterface['useVotingPowerOf'];

export const useVotingPowerOf: IUseVotingPowerOf = ({
  contractAddress: daoId,
  userAddress,
}) => {
  const { chain } = useNetwork();

  const { data, loading, error } = useQuery<getVotingPowerOfQuery>(
    getVotingPowerOfDocument,
    {
      client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
      variables: {
        id: daoId?.toLowerCase(),
        userAddress: userAddress?.toLowerCase(),
      },
    }
  );

  const userVotingPower = useMemo(() => {
    if (!data?.dao) return undefined;
    const member = data?.dao?.reputationToken?.members?.[0];

    return member ? BigNumber.from(member.reputationTokenAmount) : undefined;
  }, [data?.dao]);

  return {
    data: userVotingPower,
    isLoading: loading,
    isError: !!error,
  };
};
