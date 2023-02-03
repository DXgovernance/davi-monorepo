// import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import { getVotesDocument, getVotesQuery } from '.graphclient';
import { FetcherHooksInterface } from 'stores/types';
import { useMemo } from 'react';
import { useHookStoreProvider } from 'stores';
import { getBigNumberPercentage } from 'utils/bnPercentage';
import { BigNumber } from 'ethers';
import { useListenToVoteAdded } from 'stores/modules/common/events';

type IUseGetVotes = FetcherHooksInterface['useGetVotes'];

export const useGetVotes: IUseGetVotes = (guildId, proposalId) => {
  const {
    hooks: {
      fetchers: { useTotalLocked },
    },
  } = useHookStoreProvider();

  const { data, refetch, loading, error } = useQuery<getVotesQuery>(
    getVotesDocument,
    {
      variables: { id: proposalId },
    }
  );

  const { data: totalLocked } = useTotalLocked(guildId, proposalId);

  const parsedData = useMemo(() => {
    return data?.proposal?.votes?.map(vote => {
      return {
        voter: vote.voter as `0x${string}`,
        optionLabel: vote.optionLabel,
        votingPower: getBigNumberPercentage(
          BigNumber.from(vote?.votingPower),
          totalLocked,
          2
        ),
      };
    });
  }, [data?.proposal?.votes, totalLocked]);

  useListenToVoteAdded(guildId, refetch, proposalId);

  return {
    data: parsedData,
    isLoading: loading,
    isError: !!error,
  };
};
