import { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { BigNumber } from 'ethers';
import { FetcherHooksInterface } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import {
  getProposalSnapshotIdDocument,
  getProposalSnapshotIdQuery,
} from '.graphclient';
import { useQuery } from '@apollo/client';
import { apolloClient } from 'clients/apollo';

type IUseSnapshotId = FetcherHooksInterface['useSnapshotId'];

export const useSnapshotId: IUseSnapshotId = ({
  contractAddress,
  proposalId,
}) => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { data } = useQuery<getProposalSnapshotIdQuery>(
    getProposalSnapshotIdDocument,
    {
      client: apolloClient[chainId]['Governance1.5'],
      variables: {
        id: proposalId,
      },
    }
  );

  const snapshotId = useMemo(() => {
    return data ? BigNumber.from(data?.proposal?.snapshot) : null;
  }, [data]);

  return {
    data: snapshotId,
  };
};

export default useSnapshotId;

