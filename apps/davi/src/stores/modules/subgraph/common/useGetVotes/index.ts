import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import { getVotesDocument, getVotesQuery } from '.graphclient';
import { FetcherHooksInterface } from 'stores/types';
import { useMemo } from 'react';

type IUseGetVotes = FetcherHooksInterface['useGetVotes'];

export const useGetVotes: IUseGetVotes = proposalId => {
  const { data, loading, error } = useQuery<getVotesQuery>(getVotesDocument, {
    variables: { id: proposalId },
  });

  const parsedData = useMemo(() => {
    return data?.proposal?.votes?.map(vote => {
      return {
        voter: vote.voter as `0x${string}`,
        option: vote.option,
        votingPower: BigNumber.from(vote.votingPower),
      };
    });
  }, [data]);

  return {
    data: parsedData,
    isLoading: loading,
    isError: !!error,
  };
};
