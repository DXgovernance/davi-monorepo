import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useHookStoreProvider } from 'stores';
import { FetcherHooksInterface } from 'stores/types';

type IUseVotingResults = FetcherHooksInterface['useVotingResults'];

export const useVotingResults: IUseVotingResults = (
  daoId,
  proposalId,
  totalVotes
) => {
  const options = [totalVotes[0], totalVotes[1]];

  const {
    hooks: {
      fetchers: { useGuildConfig, useTotalLocked },
    },
  } = useHookStoreProvider();

  const { data: guildConfig } = useGuildConfig(daoId);

  const quorum = guildConfig?.votingPowerForProposalExecution;
  const { data: totalLocked } = useTotalLocked(daoId, proposalId);
  const { data: token } = useERC20Info(guildConfig?.token);

  return {
    options,
    quorum,
    totalLocked,
    token,
  };
};
