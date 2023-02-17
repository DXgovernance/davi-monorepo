import useIPFSFile from 'hooks/Guilds/ipfs/useIPFSFile';
import { useEffect, useState } from 'react';
import { ProposalMetadata } from 'types/types.guilds';
import { useOrbisContext } from 'contexts/Guilds/orbis';

function useProposalMetadata(contentHash: string) {
  const { orbis } = useOrbisContext();
  const [orbisData, setOrbisData] = useState<any>();

  // Get orbis data
  useEffect(() => {
    let data;
    if (contentHash?.startsWith('streamId://')) {
      const fetchData = async () => {
        data = await orbis.getPost(contentHash.slice(11));
        if (data.status === 200) setOrbisData(data);
        else setOrbisData(data.error);
      };
      fetchData();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentHash]);

  const { data: metadata, error: metadataError } =
    useIPFSFile<ProposalMetadata>(
      contentHash?.substring(7, contentHash?.length + 1)
    );

  if (orbisData) {
    return {
      data: {
        description: orbisData.data?.content?.body,
        voteOptions: orbisData.data?.content?.data.voteOptions,
        link: {
          master: orbisData.data?.master,
          context: orbisData.data?.context,
        },
      },
      error: undefined,
    };
  } else if (metadataError) {
    return { error: metadataError };
  } else if (!contentHash || !metadata) {
    return { error: undefined, data: undefined };
  }

  return { data: metadata };
}

export default useProposalMetadata;
