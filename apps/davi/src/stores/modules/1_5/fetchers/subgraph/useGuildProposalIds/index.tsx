import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { useNetwork } from 'wagmi';
import { getApolloClient } from 'clients/apollo';
import {
  getDaoProposalIdsDocument,
  getDaoProposalIdsQuery,
} from '.graphclient';
import { useQuery } from '@apollo/client';

type IUseGuildProposalIds = FetcherHooksInterface['useGuildProposalIds'];

export const useGuildProposalIds: IUseGuildProposalIds = daoId => {
  const { chain } = useNetwork();

  const { data, error, loading } = useQuery<getDaoProposalIdsQuery>(
    getDaoProposalIdsDocument,
    {
      client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
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
