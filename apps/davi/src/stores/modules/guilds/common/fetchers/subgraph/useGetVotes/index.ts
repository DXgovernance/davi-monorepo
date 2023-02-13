import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { getVotesDocument, getVotesQuery } from '.graphclient';

import { useHookStoreProvider } from 'stores';
import { FetcherHooksInterface } from 'stores/types';
import { getBigNumberPercentage } from 'utils/bnPercentage';
import { useListenToVoteAdded } from 'stores/modules/guilds/common/events';
import useProposalMetadata from 'hooks/Guilds/useProposalMetadata';
import { getGuildOptionLabel } from 'utils/proposals';
import { Vote } from 'types/types.guilds.d';

type IUseGetVotes = FetcherHooksInterface['useGetVotes'];

export const useGetVotes: IUseGetVotes = (guildId, proposal) => {
  const {
    hooks: {
      fetchers: { useTotalLocked },
    },
  } = useHookStoreProvider();

  const { data, refetch, loading, error } = useQuery<getVotesQuery>(
    getVotesDocument,
    {
      variables: { id: proposal?.id },
    }
  );

  const { data: totalLocked } = useTotalLocked(guildId, proposal?.id);
  // TODO: proposal metadata could be removed from this hook if we get the optionLabel from subgraph in the votes.
  const { data: proposalMetadata } = useProposalMetadata(proposal?.contentHash);
  const { t } = useTranslation();

  const parsedData: Vote[] = useMemo(() => {
    return data?.proposal?.votes?.map(vote => {
      const optionLabel = getGuildOptionLabel({
        metadata: proposalMetadata,
        optionKey: vote.option,
        t,
      });
      return {
        voter: vote.voter as `0x${string}`,
        optionLabel,
        votingPower: getBigNumberPercentage(
          BigNumber.from(vote?.votingPower),
          totalLocked,
          2
        ),
      };
    });
  }, [data?.proposal?.votes, proposalMetadata, t, totalLocked]);

  useListenToVoteAdded(guildId, refetch, proposal?.id);

  return {
    data: parsedData,
    isLoading: loading,
    isError: !!error,
  };
};
