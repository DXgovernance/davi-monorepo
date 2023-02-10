import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useHookStoreProvider } from 'stores';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { FetcherHooksInterface } from 'stores/types';

type IUseVotingResults = FetcherHooksInterface['useVotingResults'];

export const useVotingResults: IUseVotingResults = (
  optionalDaoId?: string,
  optionalProposalId?: `0x${string}`
): VoteData => {
  const {
    hooks: {
      fetchers: { useProposal, useTotalLocked, useGuildConfig },
    },
  } = useHookStoreProvider();
  const { guildId, proposalId } = useTypedParams();

  // swr hooks
  const { data: proposal } = useProposal(
    optionalDaoId || guildId,
    optionalProposalId || proposalId
  );

  const { data } = useGuildConfig(
    optionalDaoId || guildId,
    optionalProposalId || proposalId
  );

  const { data: tokenInfo } = useERC20Info(data?.token);

  const { data: totalLocked } = useTotalLocked(
    guildId,
    optionalProposalId || proposalId
  );

  const voteData = useMemo(() => {
    if (!proposal || !data || !tokenInfo) return undefined;
    const options = proposal?.totalVotes.reduce<Record<string, BigNumber>>(
      (acc, result, i) => {
        acc[i] = result;
        return acc;
      },
      {}
    );

    return {
      options,
      quorum: data?.votingPowerForProposalExecution,
      totalLocked,
      token: tokenInfo,
    };
  }, [data, proposal, tokenInfo, totalLocked]);

  return voteData;
};
