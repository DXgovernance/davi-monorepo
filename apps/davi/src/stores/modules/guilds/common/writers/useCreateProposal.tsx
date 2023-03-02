import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidGuildProposal } from 'utils';
import { WriterHooksInteface } from 'stores/types';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import usePinataIPFS from 'hooks/Guilds/ipfs/usePinataIPFS';
import useWeb3Storage from 'hooks/Guilds/ipfs/useWeb3Storage';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import { createPost } from 'components/Forum';
import { providers } from 'ethers';
import { useNetwork } from 'wagmi';

type IUseCreateProposal = WriterHooksInteface['useCreateProposal'];
type IHandleCreateProposal = ReturnType<IUseCreateProposal>;

export const useCreateProposal: IUseCreateProposal = (
  daoAddress: string,
  discussionRef?: string
) => {
  const { t } = useTranslation();
  const { chain } = useNetwork();
  const daoContract = useERC20Guild(daoAddress);
  const { createTransaction } = useTransactions();
  const { pinToPinata } = usePinataIPFS();
  const { pinToStorage } = useWeb3Storage();
  const { orbis } = useOrbisContext();

  const handleCreateProposal: IHandleCreateProposal = useCallback(
    async (
      title,
      description,
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      otherFields,
      skipMetadataUpload,
      handleMetadataUploadError,
      cb
    ) => {
      const { options } = otherFields;
      const { isValid, error } = isValidGuildProposal({
        toArray,
        dataArray,
        valueArray,
        totalOptions,
        title,
      });

      const linkToOrbis = (receipt: providers.TransactionReceipt) => {
        const link = {
          title,
          body: `Created Proposal: ${title}`,
          context: `DAVI-${daoAddress}-${discussionRef}-proposal`,
          master: receipt.logs[0].topics[1],
          replyTo: null,
          mentions: [],
          data: { chain: chain },
        };
        createPost(orbis, link);
      };

      const uploadToIPFS = async () => {
        const content = {
          description: description,
          voteOptions: ['', ...options.map(({ label }) => label)],
          discussionRef: discussionRef,
        };
        const pinataPin = pinToPinata(content).then(result => result?.IpfsHash);
        const web3storagePin = pinToStorage(content);
        const results = await Promise.all([pinataPin, web3storagePin]);
        // TODO: Loop through array looking for at least two matching hashes when we have >2 pinning services
        if (results[0] !== results[1]) {
          console.warn(t('actionBuilder.ens.ipfs.hashNotTheSame'), results);
        }
        return `ipfs://${results[0]}`;
      };
      if (!isValid) throw new Error(error);

      if (options.length === 0) {
        throw new Error(t('proposal.errors.optionsArrayIsEmpty'));
      }

      let contentHash = '';

      if (!skipMetadataUpload) {
        try {
          contentHash = await uploadToIPFS();
        } catch (error) {
          handleMetadataUploadError(error);
          return;
        }
      }

      createTransaction(
        `${t('createProposal.createProposal')} ${title}`,
        async () => {
          return daoContract.createProposal(
            toArray,
            dataArray,
            valueArray,
            totalOptions,
            title,
            contentHash
          );
        },
        true,
        cb,
        linkToOrbis
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      daoContract,
      createTransaction,
      t,
      pinToPinata,
      discussionRef,
      daoAddress,
      orbis,
    ]
  );

  return handleCreateProposal;
};
