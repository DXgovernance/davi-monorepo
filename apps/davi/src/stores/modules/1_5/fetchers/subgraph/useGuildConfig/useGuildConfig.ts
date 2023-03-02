import {
  getGuildConfig1_5Document,
  getGuildConfig1_5Query,
} from '.graphclient';
import { useQuery } from '@apollo/client';
import { apolloClient } from 'clients/apollo';
import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';
import { GuildConfigProps } from 'types/types.guilds';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import { useNetwork } from 'wagmi';

type IUseGuildConfig = FetcherHooksInterface['useGuildConfig'];

export const useGuildConfig: IUseGuildConfig = (
  daoId: string,
  proposalId?: `0x${string}`
) => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { data, loading, error } = useQuery<getGuildConfig1_5Query>(
    getGuildConfig1_5Document,
    {
      client: apolloClient[chainId]['Governance1.5'],
      variables: { id: daoId?.toLowerCase() },
    }
  );

  const guildConfig: GuildConfigProps = useMemo(() => {
    if (!data?.dao) return undefined;

    return {
      token: data?.dao?.reputationToken?.address as `0x${string}`,
      permissionRegistry: null,
      name: data?.dao?.reputationToken?.name,
      proposalTime: null,
      timeForExecution: null,
      maxActiveProposals: null,
      votingPowerForProposalCreation: null,
      votingPowerForProposalExecution: null,
      tokenVault: null,
      lockTime: null,
      voteGas: null,
      maxGasPrice: null,
      votingPowerPercentageForProposalExecution: null,
      votingPowerPercentageForProposalCreation: null,
      minimumMembersForProposalCreation: null,
      minimumTokensLockedForProposalCreation: null,
    };
  }, [data]);
  return {
    data: guildConfig,
    isLoading: loading,
    isError: !!error,
  };
};
