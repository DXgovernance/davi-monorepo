import { useEffect, useRef } from 'react';
import { DiscussionMasterPost } from '../Discussion.styled';
import {
  PostCreatorAddressBadge,
  PostCreatorName,
  PostHeader,
  PostTime,
  PostWrapper,
} from '../Post/Post.styled';
import { useProposal } from 'stores/modules/guilds/common/fetchers/rpc';
import ProposalCardWrapper from 'Modules/Guilds/Wrappers/ProposalCardWrapper';
import { Avatar } from 'components/Avatar';
import moment from 'moment';
import { getBadgeContent, getUsername } from 'utils/orbis';
import { useFilter } from 'contexts/Guilds';
import { ZERO_ADDRESS } from 'utils';
import { useTranslation } from 'react-i18next';

const Proposal = ({ post, onDeletion }) => {
  const { t } = useTranslation();
  const discussionMasterPost = useRef<HTMLDivElement>(null);

  const proposalId = post.master;
  const [, daoId] = post.context.split('-');
  const { data: proposal } = useProposal(daoId, proposalId);

  const { onResetState, onResetActionType, onResetCurrency, setSearchQuery } =
    useFilter();

  // Reset filters when page loads
  useEffect(() => {
    setSearchQuery('');
    onResetActionType();
    onResetCurrency();
    onResetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DiscussionMasterPost ref={discussionMasterPost}>
      <PostHeader>
        <Avatar
          src={post?.creator_details?.profile?.pfp}
          defaultSeed={post?.creator_details?.metadata?.address}
          size={24}
        />
        <PostCreatorName>{getUsername(post?.creator_details)}</PostCreatorName>
        <PostCreatorAddressBadge>
          {getBadgeContent(post?.creator_details)}
        </PostCreatorAddressBadge>
        <PostTime>
          {post?.timestamp && moment.unix(post.timestamp).fromNow()}
        </PostTime>
      </PostHeader>
      <PostWrapper>
        {proposal?.creator !== ZERO_ADDRESS ? (
          <ProposalCardWrapper key={proposalId} proposalId={proposalId} />
        ) : (
          <h3>
            {t('discussions.proposalOnOtherChain', {
              chain: post?.content?.data?.chain?.name,
            })}
          </h3>
        )}
      </PostWrapper>
    </DiscussionMasterPost>
  );
};

export default Proposal;
