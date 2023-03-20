import useIPFSFile from 'hooks/Guilds/ipfs/useIPFSFile';
import { useEffect, useMemo, useState } from 'react';
import { ProposalMetadata } from 'types/types.guilds';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import * as contentHashLib from '@ensdomains/content-hash';

function useProposalMetadata(contentHash: string) {
  const { orbis } = useOrbisContext();
  const [orbisData, setOrbisData] = useState<any>();

  // Support backwards compatible encoded ipfs hashes
  const { decodedContentHash } = useMemo(() => {
    if (!contentHash || contentHash?.includes('://')) console.log('hey');

    try {
      return {
        decodedContentHash: contentHashLib.decode(contentHash),
      };
    } catch (e) {
      console.error(e);
      return { decodeError: e };
    }
  }, [contentHash]);

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
      decodedContentHash
        ? decodedContentHash
        : contentHash?.substring(7, contentHash?.length + 1)
    );

  if (orbisData) {
    return {
      data: {
        description: orbisData.data?.content?.body,
        voteOptions: orbisData.data?.content?.data.voteOptions,
        discussionRef: orbisData.data?.content?.data?.discussionRef,
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
