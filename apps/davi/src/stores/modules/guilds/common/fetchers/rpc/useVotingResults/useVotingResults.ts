import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useHookStoreProvider } from 'stores';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { FetcherHooksInterface } from 'stores/types';

type IUseVotingResults = FetcherHooksInterface['useVotingResults'];

export const useVotingResults: IUseVotingResults = (
  daoId,
  proposalId,
  totalVotes
) => {
  const {
    hooks: {
      fetchers: { useTotalLocked, useGuildConfig },
    },
  } = useHookStoreProvider();

  const { data } = useGuildConfig(daoId, proposalId);

  const { data: tokenInfo } = useERC20Info(data?.token);

  const { data: totalLocked } = useTotalLocked(daoId, proposalId);

  const voteData = useMemo(() => {
    if (!totalVotes || !data || !tokenInfo) return undefined;
    const options = totalVotes.reduce<Record<string, BigNumber>>(
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
  }, [data, tokenInfo, totalLocked, totalVotes]);

  return voteData;
};
