import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useListenToVoteAdded } from '../../../events';
import { FetcherHooksInterface } from 'stores/types';

type IUseProposalVotesOfVoter =
  FetcherHooksInterface['useProposalVotesOfVoter'];

export const useProposalVotesOfVoter: IUseProposalVotesOfVoter = (
  daoAddress: `0x${string}`,
  proposalId: `0x${string}`,
  userAddress: `0x${string}`
) => {
  const { data, refetch, isLoading, isError } = useContractRead({
    enabled: !!daoAddress && !!proposalId && !!userAddress,
    address: daoAddress,
    abi: BaseERC20Guild.abi,
    functionName: 'getProposalVotesOfVoter',
    args: [proposalId, userAddress],
  });

  useListenToVoteAdded(daoAddress, refetch, proposalId);

  const parsedData = useMemo(() => {
    if (!data?.votingPower || !data?.option) {
      return { option: null, votingPower: null };
    }
    if (
      BigNumber.from(data?.votingPower || 0).gt(0) &&
      BigNumber.isBigNumber(data?.option)
    ) {
      return {
        option: data.option.toString(),
        votingPower: data?.votingPower,
      };
    }
    return { option: null, votingPower: null };
  }, [data?.option, data?.votingPower]); // eslint-disable-line

  return {
    data: parsedData,
    isLoading,
    isError,
  };
};
