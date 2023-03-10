import { useCallback } from 'react';
import { WriterHooksInteface } from 'stores/types';

type IUseCreateProposal = WriterHooksInteface['useCreateProposal'];
type IHandleCreateProposal = ReturnType<IUseCreateProposal>;

// TODO: placeholder hook to prevent crashing

export const useCreateProposal: IUseCreateProposal = (
  daoAddress: string,
  discussionRef?: string
) => {
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
      return;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return handleCreateProposal;
};
