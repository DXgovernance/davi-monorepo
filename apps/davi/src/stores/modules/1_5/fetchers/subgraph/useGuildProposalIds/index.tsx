import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import { useNetwork } from 'wagmi';
import { apolloClient } from 'clients/apollo';
import {
  getDaoProposalIdsDocument,
  getDaoProposalIdsQuery,
} from '.graphclient';
import { useQuery } from '@apollo/client';

type IUseGuildProposalIds = FetcherHooksInterface['useGuildProposalIds'];

export const useGuildProposalIds: IUseGuildProposalIds = daoId => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { data, error, loading } = useQuery<getDaoProposalIdsQuery>(
    getDaoProposalIdsDocument,
    {
      client: apolloClient[chainId]['Governance1.5'],
      variables: {
        id: daoId?.toLowerCase(),
      },
    }
  );

  const proposals = data?.dao?.schemes.reduce((proposalIds, currentScheme) => {
    if (currentScheme.proposals.length > 0) {
      currentScheme.proposals.forEach(proposal => {
        proposalIds.push(proposal?.id);
      });
    }
    return proposalIds;
  }, []);

  return {
    data: proposals,
    isError: !!error,
    errorMessage: error?.message,
    isLoading: loading,
  };
};
