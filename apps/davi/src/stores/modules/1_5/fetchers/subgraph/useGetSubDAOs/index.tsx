import { useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { getSchemesDocument, getSchemesQuery } from '.graphclient';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { getApolloClient } from 'clients/apollo';
import { SubDAO } from 'types/types.guilds';

type IUseGetSubDAOs = FetcherHooksInterface['useGetSubDAOs'];

export const useGetSubDAOs: IUseGetSubDAOs = daoId => {
  const { chain } = useNetwork();

  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<getSchemesQuery>(getSchemesDocument, {
    client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
    variables: { id: daoId?.toLowerCase() },
  });

  if (!data || !data.dao) {
    return {
      data: null,
      isLoading,
      errorMessage: error?.message,
      isError: !!error,
    };
  }

  if (data.dao.schemes.length === 0) {
    return {
      data: [],
      isLoading,
      errorMessage: error?.message,
      isError: !!error,
    };
  }

  const schemeData: SubDAO[] = data.dao.schemes.map(scheme => {
    return {
      id: scheme.id,
      name: scheme.name,
      averagesDownstakesOfBoosted: scheme.averagesDownstakesOfBoosted,
      controller: scheme.controller,
      isRegistered: scheme.isRegistered,
      orgBoostedProposalsCnt: scheme.orgBoostedProposalsCnt,
      paramsHash: scheme.paramsHash,
      permissionRegistry: scheme.permissionRegistry,
      stakingTokenBalance: scheme.stakingTokenBalance,
      canChangeReputation: scheme.canChangeReputation,
      canMakeAvatarCalls: scheme.canMakeAvatarCalls,
      canManageSchemes: scheme.canManageSchemes,
      maxGasPrice: scheme.maxGasPrice,
      maxRepPercentageChange: scheme.maxRepPercentageChange,
      type: scheme.type,
      voteGas: scheme.voteGas,
      voteGasBalance: scheme.voteGasBalance,
      votingMachine: {
        boostedVoteRequiredPercentage:
          scheme.votingMachine.boostedVoteRequiredPercentage,
        preBoostedVotePeriodLimit:
          scheme.votingMachine.preBoostedVotePeriodLimit,
        boostedVotePeriodLimit: scheme.votingMachine.boostedVotePeriodLimit,
        quietEndingPeriod: scheme.votingMachine.quietEndingPeriod,
      },
    };
  });

  return {
    data: schemeData,
    isLoading,
    errorMessage: error?.message,
    isError: !!error,
  };
};
