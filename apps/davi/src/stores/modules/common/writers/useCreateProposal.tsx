import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidGuildProposal } from 'utils';
import { WriterHooksInteface } from 'stores/types';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import useIPFSNode from 'hooks/Guilds/ipfs/useIPFSNode';
import usePinataIPFS from 'hooks/Guilds/ipfs/usePinataIPFS';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import { createPost } from 'components/Forum';
import { providers } from 'ethers';

type IUseCreateProposal = WriterHooksInteface['useCreateProposal'];
type IHandleCreateProposal = ReturnType<IUseCreateProposal>;

export const useCreateProposal: IUseCreateProposal = (
  daoAddress: string,
  discussionRef?: string
) => {
  const { t } = useTranslation();
  const daoContract = useERC20Guild(daoAddress);
  const { createTransaction } = useTransactions();
  const ipfs = useIPFSNode();
  const { pinToPinata } = usePinataIPFS();
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
          data: {},
        };
        createPost(orbis, link);
      };

      const uploadToIPFS = async () => {
        const content = {
          description: description,
          voteOptions: ['', ...options.map(({ label }) => label)],
          discussionRef: discussionRef,
        };
        // while (!ipfs.isReady) {
        console.log(ipfs.isReady);
        // }
        const cid = await ipfs.add(JSON.stringify(content));
        await ipfs.pin(cid);
        const pinataPinResult = await pinToPinata(cid, content);
        console.log({ pinataPinResult });
        console.log({ cid });
        if (pinataPinResult.IpfsHash !== `${cid}`) {
          throw new Error(t('ipfs.hashNotTheSame'));
        }
        return `ipfs://${pinataPinResult.IpfsHash}`;
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
        `${t('createProposal')} ${title}`,
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
        true,
        linkToOrbis
      );
    },
    [
      daoContract,
      createTransaction,
      t,
      ipfs,
      pinToPinata,
      discussionRef,
      daoAddress,
      orbis,
    ]
  );

  return handleCreateProposal;
};
