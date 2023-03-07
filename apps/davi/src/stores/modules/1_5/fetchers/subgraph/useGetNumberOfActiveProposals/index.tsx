import { BigNumber } from 'ethers';
import { useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';

import {
  getDaoNumberOfActiveProposalsDocument,
  getDaoNumberOfActiveProposalsQuery,
} from '.graphclient';
import { getApolloClient } from 'clients/apollo';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';

type IUseGetNumberOfActiveProposals =
  FetcherHooksInterface['useGetNumberOfActiveProposals'];

export const useGetNumberOfActiveProposals: IUseGetNumberOfActiveProposals =
  daoId => {
    const { chain } = useNetwork();

    // TODO: This query gets all "Submitted" proposals. We should define what an active proposal is, and fetch accordingly

    const { data, error, loading } =
      useQuery<getDaoNumberOfActiveProposalsQuery>(
        getDaoNumberOfActiveProposalsDocument,
        {
          client: getApolloClient(SupportedSubgraph.Guilds, chain?.id),
          variables: {
            id: daoId?.toLowerCase(),
          },
        }
      );

    const numberOfProposals = data?.dao?.schemes.reduce(
      (proposalCount, currentScheme) => {
        return proposalCount + currentScheme.proposals?.length;
      },
      0
    );

    return {
      data: BigNumber.from(numberOfProposals ?? 0),
      isError: !!error,
      isLoading: loading,
    };
  };
