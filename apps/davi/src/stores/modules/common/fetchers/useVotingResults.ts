import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useHookStoreProvider } from 'stores';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { FetcherHooksInterface } from 'stores/types';
import { Proposal } from 'types/types.guilds.d';

type IUseVotingResults = FetcherHooksInterface['useVotingResults'];

export const useVotingResults: IUseVotingResults = (
  daoId: string,
  proposalId: `0x${string}`,
  proposal: Proposal
): VoteData => {
  const {
    hooks: {
      fetchers: { useTotalLocked, useGuildConfig },
    },
  } = useHookStoreProvider();

  const { data } = useGuildConfig(daoId, proposalId);

  const { data: tokenInfo } = useERC20Info(data?.token);

  const { data: totalLocked } = useTotalLocked(daoId, proposalId);

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
