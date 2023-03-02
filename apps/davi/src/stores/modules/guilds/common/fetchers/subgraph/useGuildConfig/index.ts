import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import { getGuildConfigDocument, getGuildConfigQuery } from '.graphclient';
import { ZERO_ADDRESS } from 'utils';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { useVotingPowerForProposalExecution } from 'Modules/Guilds/Hooks/useVotingPowerForProposalExecution';
import { useNetwork } from 'wagmi';
import { getApolloClient } from 'clients/apollo';

type IUseGuildConfig = FetcherHooksInterface['useGuildConfig'];

export type GuildConfigProps = {
  name: string;
  token: `0x${string}`;
  permissionRegistry: string;
  proposalTime: BigNumber;
  timeForExecution: BigNumber;
  maxActiveProposals: BigNumber;
  votingPowerForProposalCreation: BigNumber;
  votingPowerForProposalExecution: BigNumber;
  tokenVault: `0x${string}`;
  lockTime: BigNumber;
  voteGas: BigNumber;
  maxGasPrice: BigNumber;
  votingPowerPercentageForProposalExecution: BigNumber;
  votingPowerPercentageForProposalCreation: BigNumber;
  minimumMembersForProposalCreation: BigNumber;
  minimumTokensLockedForProposalCreation: BigNumber;
};

export const useGuildConfig: IUseGuildConfig = (guildAddress, proposalId?) => {
  const { chain } = useNetwork();

  const { data, loading, error } = useQuery<getGuildConfigQuery>(
    getGuildConfigDocument,
    {
      client: getApolloClient(SupportedSubgraph.Guilds, chain?.id),
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
      votingPowerPercentageForProposalExecution: BigNumber.from(0),
      votingPowerPercentageForProposalCreation: BigNumber.from(0),
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
