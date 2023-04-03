import { createPost } from 'components/Forum';
import { useTransactions } from 'contexts/Guilds';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import { providers } from 'ethers';
import { useSchemeContract } from 'hooks/Guilds/contracts/useContract';
import usePinataIPFS from 'hooks/Guilds/ipfs/usePinataIPFS';
import useWeb3Storage from 'hooks/Guilds/ipfs/useWeb3Storage';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WriterHooksInteface } from 'stores/types';
import { isValid1_5Proposal } from 'utils';
import { useNetwork } from 'wagmi';

type IUseCreateProposal = WriterHooksInteface['useCreateProposal'];
type IHandleCreateProposal = ReturnType<IUseCreateProposal>;

export const useCreateProposal: IUseCreateProposal = (
  daoAddress: string,
  subdaoId?: string,
  discussionRef?: string
) => {
  const { chain } = useNetwork();
  const { orbis } = useOrbisContext();
  const { pinToPinata } = usePinataIPFS();
  const { pinToStorage } = useWeb3Storage();
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();

  const schemeContract = useSchemeContract(subdaoId);

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

      // adding the against option
      totalOptions++;

      const { isValid, error } = isValid1_5Proposal({
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

      if (!isValid) throw new Error(error);

      createTransaction(
        `${t('createProposal.createProposal')} ${title}`,
        async () => {
          return schemeContract.proposeCalls(
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
      schemeContract,
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
