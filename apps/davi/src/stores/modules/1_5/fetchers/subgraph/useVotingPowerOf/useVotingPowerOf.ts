import { getVotingPowerOfDocument, getVotingPowerOfQuery } from '.graphclient';
import { useQuery } from '@apollo/client';
import { apolloClient } from 'clients/apollo';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import { useNetwork } from 'wagmi';

type IUseVotingPowerOf = FetcherHooksInterface['useVotingPowerOf'];

export const useVotingPowerOf: IUseVotingPowerOf = ({
  contractAddress: daoId,
  userAddress,
}) => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { data, loading, error } = useQuery<getVotingPowerOfQuery>(
    getVotingPowerOfDocument,
    {
      client: apolloClient[chainId]['Governance1.5'],
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
