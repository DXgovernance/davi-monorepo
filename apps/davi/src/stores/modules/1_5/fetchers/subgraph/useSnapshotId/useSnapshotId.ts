import { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { BigNumber } from 'ethers';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import {
  getProposalSnapshotIdDocument,
  getProposalSnapshotIdQuery,
} from '.graphclient';
import { useQuery } from '@apollo/client';
import { getApolloClient } from 'clients/apollo';

type IUseSnapshotId = FetcherHooksInterface['useSnapshotId'];

export const useSnapshotId: IUseSnapshotId = ({
  contractAddress,
  proposalId,
}) => {
  const { chain } = useNetwork();

  const { data } = useQuery<getProposalSnapshotIdQuery>(
    getProposalSnapshotIdDocument,
    {
      client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
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
