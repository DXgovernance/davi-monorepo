import { getVotingPowerOfDocument, getVotingPowerOfQuery } from '.graphclient';
import { useQuery } from '@apollo/client';
import { getApolloClient } from 'clients/apollo';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { useNetwork } from 'wagmi';
import { useVotingPowerOfAt } from '../useVotingPowerOfAt';

type IUseVotingPowerOf = FetcherHooksInterface['useVotingPowerOf'];

export const useVotingPowerOf: IUseVotingPowerOf = ({
  contractAddress: daoId,
  userAddress,
  snapshotId,
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

  const votingPowerOfResponse = useMemo(() => {
    if (!data || !data.dao || !data.dao.reputationToken.members)
      return undefined;
    const member = data.dao.reputationToken.members?.[0];

    return member ? BigNumber.from(member.reputationTokenAmount) : undefined;
  }, [data]);

  const currentSnapshotId = data?.dao?.reputationToken?.currentSnapshotId;

  if (!snapshotId) snapshotId = currentSnapshotId;

  const votingPowerAtSnapshotResponse = useVotingPowerOfAt(
    daoId,
    userAddress,
    snapshotId
  );

  return snapshotId
    ? votingPowerAtSnapshotResponse
    : {
        data: votingPowerOfResponse
          ? BigNumber.from(votingPowerOfResponse)
          : undefined,
        isError: !!error,
        isLoading: loading,
      };
};
