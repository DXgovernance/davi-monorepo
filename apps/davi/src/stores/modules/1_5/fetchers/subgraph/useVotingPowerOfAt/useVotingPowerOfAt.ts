import {
  getVotingPowerOfAtDocument,
  getVotingPowerOfAtQuery,
} from '.graphclient';
import { useQuery } from '@apollo/client';
import { apolloClient } from 'clients/apollo';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';
import { CHAIN_ID } from 'utils';
import { useNetwork } from 'wagmi';

type IUseVotingPowerOfAt = FetcherHooksInterface['useVotingPowerOfAt'];

export const useVotingPowerOfAt: IUseVotingPowerOfAt = (
  daoId,
  userAddress,
  snapshotId
) => {
  const { chain } = useNetwork();
  const chainId: CHAIN_ID = useMemo(() => chain?.id, [chain]);

  const { data, loading, error } = useQuery<getVotingPowerOfAtQuery>(
    getVotingPowerOfAtDocument,
    {
      client: apolloClient[chainId]['Governance1.5'],
      variables: {
        id: daoId?.toLowerCase(),
        userAddress: userAddress?.toLowerCase(),
      },
    }
  );
  if (
    !data ||
    !data.dao ||
    !data.dao.reputationToken ||
    data.dao.reputationToken.members.length === 0 ||
    !snapshotId
  )
    return { data: null, isError: true, isLoading: false };
  let snapshot = data?.dao?.reputationToken?.members?.[0].snapshots.find(
    s => s.snapshotId === snapshotId
  );

  // if the snapshot is not found, we'll get the nearest lower one
  while (!snapshot) {
    if (snapshotId === '0') {
      return {
        data: BigNumber.from('0'),
        isLoading: loading,
        isError: !!error,
      };
    }
    snapshotId = BigNumber.from(snapshotId).sub(1).toString();
    snapshot = data?.dao?.reputationToken?.members?.[0].snapshots.find(
      // eslint-disable-next-line no-loop-func
      s => s.snapshotId === snapshotId
    );
  }

  return {
    data: BigNumber.from(snapshot.value),
    isLoading: loading,
    isError: !!error,
  };
};
