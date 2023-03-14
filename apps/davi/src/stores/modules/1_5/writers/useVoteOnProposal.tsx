import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useVotingMachineContract } from 'hooks/Guilds/contracts/useContract';
import { useGetVotingMachineAddressBySchemeAddress } from 'stores/modules/1_5/fetchers/subgraph/useGetVotingMachineAddressBySchemeAddress';

type IUseVoteOnProposal = WriterHooksInteface['useVoteOnProposal'];
type IHandleVoteOnProposal = ReturnType<IUseVoteOnProposal>;

export const useVoteOnProposal: IUseVoteOnProposal = (
  daoAddress,
  schemeAddress
) => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();

  const votingMachineAddress =
    useGetVotingMachineAddressBySchemeAddress(schemeAddress);

  const votingMachineContract = useVotingMachineContract(
    votingMachineAddress?.votingMachineAddress
  );

  const handleVoteOnProposal: IHandleVoteOnProposal = useCallback(
    async (proposalId, option, votingPower, title = '', cb = null) => {
      createTransaction(
        `${t('voting.voteOnProposal')}${` ${title}` ?? ''}`,
        async () => votingMachineContract.vote(proposalId, option, votingPower),
        true,
        cb
      );
    },
    [createTransaction, t, votingMachineContract]
  );

  return handleVoteOnProposal;
};
