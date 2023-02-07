import { unix } from 'moment';
import { Proposal, ContractState } from 'types/types.guilds.d';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';
import { FetcherHooksInterface } from 'stores/types';
import { useProposalCalls } from '.';
import {
  useListenToVoteAdded,
  useListenToProposalStateChanged,
} from '../events';

type IUseProposal = FetcherHooksInterface['useProposal'];

interface IDataFromGetProposal {
  creator: `0x${string}`;
  startTime: BigNumber;
  endTime: BigNumber;
  to: readonly `0x${string}`[];
  data: readonly `0x${string}`[];
  value: readonly BigNumber[];
  title: string;
  contentHash: string;
  state: number;
  totalVotes: readonly BigNumber[];
}

const formatterMiddleware = (
  proposalData: IDataFromGetProposal,
  proposalId: `0x${string}`
): Proposal => {
  if (!proposalData) return null;

  const contractStatesMapping = {
    1: ContractState.Active,
    2: ContractState.Rejected,
    3: ContractState.Executed,
    4: ContractState.Failed,
  };
  const contractState = contractStatesMapping[proposalData.state];

  const startTime = proposalData.startTime
    ? unix(proposalData.startTime.toNumber())
    : null;
  const endTime = proposalData.endTime
    ? unix(proposalData.endTime.toNumber())
    : null;

  const returnedClone: Proposal = {
    id: proposalId,
    creator: proposalData.creator,
    startTime,
    endTime,
    to: proposalData.to as `0x${string}`[], // needed to bypass readonly
    data: proposalData.data as `0x${string}`[], // needed to bypass readonly
    value: proposalData.value as BigNumber[], // needed to bypass readonly
    totalOptions: null, // Not used in the codebase but in the deploy scripts
    options: null,
    title: proposalData.title,
    contentHash: proposalData.contentHash,
    contractState,
    totalVotes: proposalData.totalVotes as BigNumber[], // needed to bypass readonly
  };

  return returnedClone;
};

export const useProposal: IUseProposal = (daoId, proposalId) => {
  const { data, refetch, error } = useContractRead({
    address: daoId,
    abi: SnapshotERC20Guild.abi,
    functionName: 'getProposal',
    args: [proposalId],
  });
  const proposalData: IDataFromGetProposal = data;

  useListenToProposalStateChanged(daoId, refetch, proposalId);
  useListenToVoteAdded(daoId, refetch, proposalId);

  const formattedData = formatterMiddleware(proposalData, proposalId);
  const { options } = useProposalCalls(daoId, proposalId, formattedData);

  if (formattedData && options) formattedData.options = options;

  return {
    data: formattedData,
    refetch,
    error,
  };
};
