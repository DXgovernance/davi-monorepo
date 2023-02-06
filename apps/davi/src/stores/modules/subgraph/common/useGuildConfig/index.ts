import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import { getGuildConfigDocument, getGuildConfigQuery } from '.graphclient';
import { useMemo } from 'react';
import { ZERO_ADDRESS } from 'utils';

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

export const useGuildConfig = (guildAddress: string) => {
  const { data, loading, error } = useQuery<getGuildConfigQuery>(
    getGuildConfigDocument,
    {
      variables: { id: guildAddress?.toLowerCase() },
    }
  );
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
      votingPowerForProposalExecution,
      // tokenVault,
      lockTime,
      voteGas,
      maxGasPrice,
      // votingPowerPercentageForProposalExecution,
      // votingPowerPercentageForProposalCreation,
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
      votingPowerForProposalExecution: votingPowerForProposalExecution
        ? BigNumber.from(votingPowerForProposalExecution)
        : undefined,
      tokenVault: ZERO_ADDRESS,
      lockTime: lockTime ? BigNumber?.from(lockTime) : undefined,
      voteGas: voteGas ? BigNumber?.from(voteGas) : undefined,
      maxGasPrice: maxGasPrice ? BigNumber?.from(maxGasPrice) : undefined,
      votingPowerPercentageForProposalExecution: BigNumber.from(0),
      //   votingPowerPercentageForProposalExecution
      //     ? BigNumber?.from(votingPowerPercentageForProposalExecution)
      //     : undefined,
      votingPowerPercentageForProposalCreation: BigNumber.from(0),
      //   votingPowerPercentageForProposalCreation
      //     ? BigNumber?.from(votingPowerPercentageForProposalCreation)
      //     : undefined,
      minimumMembersForProposalCreation: minimumMembersForProposalCreation
        ? BigNumber?.from(minimumMembersForProposalCreation)
        : undefined,
      minimumTokensLockedForProposalCreation:
        minimumTokensLockedForProposalCreation
          ? BigNumber?.from(minimumTokensLockedForProposalCreation)
          : undefined,
    };
  }, [data]);

  return {
    data: transformedData,
    isLoading: loading,
    isError: !!error,
  };
};
