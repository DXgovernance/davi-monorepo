import { useNetwork } from 'wagmi';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import { getGuildConfigDocument, getGuildConfigQuery } from '.graphclient';
import { SUPPORTED_DAVI_NETWORKS, ZERO_ADDRESS } from 'utils';
import { apolloClient } from 'clients/apollo';
import { GuildConfigProps } from 'types/types.guilds';
import { FetcherHooksInterface } from 'stores/types';
import { useVotingPowerForProposalExecution } from 'Modules/Guilds/Hooks/useVotingPowerForProposalExecution';

type IUseGuildConfig = FetcherHooksInterface['useGuildConfig'];

export const useGuildConfig: IUseGuildConfig = (guildAddress, proposalId?) => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { data, loading, error } = useQuery<getGuildConfigQuery>(
    getGuildConfigDocument,
    {
      client: apolloClient[chainId]['Guilds'],
      variables: { id: guildAddress?.toLowerCase() },
    }
  );

  const { data: votingPowerForProposalExecution } =
    useVotingPowerForProposalExecution({
      contractAddress: guildAddress,
      proposalId,
    });

  const transformedData: GuildConfigProps = useMemo(() => {
    if (!data?.guild) return undefined;
    const guild = data.guild;
    const {
      token,
      permissionRegistry,
      name,
      proposalTime,
      timeForExecution,
      maxActiveProposals,
      votingPowerForProposalCreation,
      votingPowerPercentageForProposalCreation,
      votingPowerPercentageForProposalExecution,
      lockTime,
      voteGas,
      maxGasPrice,
      minimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation,
    } = guild;

    return {
      token: token?.id as `0x${string}`,
      permissionRegistry: permissionRegistry?.toString(),
      name: name?.toString(),
      proposalTime: proposalTime ? BigNumber.from(proposalTime) : undefined,
      timeForExecution: timeForExecution
        ? BigNumber.from(timeForExecution)
        : undefined,
      maxActiveProposals: maxActiveProposals
        ? BigNumber.from(maxActiveProposals)
        : undefined,
      votingPowerForProposalCreation: votingPowerForProposalCreation
        ? BigNumber.from(votingPowerForProposalCreation)
        : undefined,
      votingPowerForProposalExecution,
      tokenVault: ZERO_ADDRESS,
      lockTime: lockTime ? BigNumber?.from(lockTime) : undefined,
      voteGas: voteGas ? BigNumber?.from(voteGas) : undefined,
      maxGasPrice: maxGasPrice ? BigNumber?.from(maxGasPrice) : undefined,
      votingPowerPercentageForProposalExecution:
        votingPowerPercentageForProposalExecution
          ? BigNumber?.from(votingPowerPercentageForProposalExecution)
          : undefined,
      votingPowerPercentageForProposalCreation:
        votingPowerPercentageForProposalCreation
          ? BigNumber?.from(votingPowerPercentageForProposalCreation)
          : undefined,
      minimumMembersForProposalCreation: minimumMembersForProposalCreation
        ? BigNumber?.from(minimumMembersForProposalCreation)
        : undefined,
      minimumTokensLockedForProposalCreation:
        minimumTokensLockedForProposalCreation
          ? BigNumber?.from(minimumTokensLockedForProposalCreation)
          : undefined,
    };
  }, [data, votingPowerForProposalExecution]);

  return {
    data: transformedData,
    isLoading: loading,
    isError: !!error,
  };
};
