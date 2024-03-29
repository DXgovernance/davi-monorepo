import { useMemo } from 'react';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { getUpdatedValues, UpdatedValuesReturn } from './utils';
import { BigNumber } from 'ethers';
import { useHookStoreProvider } from 'stores';

interface ArgConfigValues {
  _proposalTime?: BigNumber;
  _timeForExecution?: BigNumber;
  _votingPowerPercentageForProposalExecution?: BigNumber;
  _votingPowerPercentageForProposalCreation?: BigNumber;
  _voteGas?: BigNumber;
  _maxGasPrice?: BigNumber;
  _maxActiveProposals?: BigNumber;
  _lockTime?: BigNumber;
  _minimumMembersForProposalCreation?: BigNumber;
  _minimumTokensLockedForProposalCreation?: BigNumber;
}

export const useUpdatedGuildConfigValues = (
  newValues: ArgConfigValues
): UpdatedValuesReturn | {} => {
  const { guildId } = useTypedParams();
  const {
    hooks: {
      fetchers: { useGuildConfig },
    },
  } = useHookStoreProvider();
  const { data: currentGuildConfig } = useGuildConfig(guildId);
  const parsedData = useMemo(() => {
    if (!newValues) return null;
    const {
      _proposalTime: proposalTime,
      _timeForExecution: timeForExecution,
      _votingPowerPercentageForProposalExecution:
        votingPowerPercentageForProposalExecution,
      _votingPowerPercentageForProposalCreation:
        votingPowerPercentageForProposalCreation,
      _voteGas: voteGas,
      _maxGasPrice: maxGasPrice,
      _maxActiveProposals: maxActiveProposals,
      _lockTime: lockTime,
      _minimumMembersForProposalCreation: minimumMembersForProposalCreation,
      _minimumTokensLockedForProposalCreation:
        minimumTokensLockedForProposalCreation,
    } = newValues;

    return getUpdatedValues(currentGuildConfig, {
      proposalTime,
      timeForExecution,
      votingPowerPercentageForProposalExecution,
      votingPowerPercentageForProposalCreation,
      voteGas,
      maxGasPrice,
      maxActiveProposals,
      lockTime,
      minimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation,
    });
  }, [newValues, currentGuildConfig]);

  return parsedData;
};
