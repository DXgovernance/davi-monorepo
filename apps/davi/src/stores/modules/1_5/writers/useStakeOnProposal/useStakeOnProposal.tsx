import { useTransactions } from 'contexts/Guilds';
import { useVotingMachineContract } from 'hooks/Guilds/contracts/useContract';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WriterHooksInteface } from 'stores/types';
import { useGetVotingMachineAddressBySchemeAddress } from '../../fetchers/subgraph/useGetVotingMachineAddressBySchemeAddress';

type IUseStakeOnProposal = WriterHooksInteface['useStakeOnProposal'];
type IHandleStakeOnProposal = ReturnType<IUseStakeOnProposal>;

export const useStakeOnProposal: IUseStakeOnProposal = (
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

  const handleStakeOnProposal: IHandleStakeOnProposal = useCallback(
    async (proposalId, option, stakeAmount, title = '', cb = null) => {
      createTransaction(
        `${t('holographicConsensus.stakeOnProposal')}${` ${title}` ?? ''}`,
        async () =>
          votingMachineContract.stake(proposalId, option, stakeAmount),
        true,
        cb
      );
    },
    [createTransaction, t, votingMachineContract]
  );

  return handleStakeOnProposal;
};
