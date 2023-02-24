import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';

import {
  getDaoNumberOfActiveProposalsDocument,
  getDaoNumberOfActiveProposalsQuery,
} from '.graphclient';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import { apolloClient } from 'clients/apollo';
import { FetcherHooksInterface } from 'stores/types';

type IUseGetNumberOfActiveProposals =
  FetcherHooksInterface['useGetNumberOfActiveProposals'];

export const useGetNumberOfActiveProposals: IUseGetNumberOfActiveProposals =
  daoId => {
    const { chain } = useNetwork();
    const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

    // TODO: This query gets all "Submitted" proposals. We should define what an active proposal is, and fetch accordingly

    const { data, error, loading } =
      useQuery<getDaoNumberOfActiveProposalsQuery>(
        getDaoNumberOfActiveProposalsDocument,
        {
          client: apolloClient[chainId]['Governance1.5'],
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
