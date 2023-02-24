import { useRef } from 'react';
import { DiscussionMasterPost } from '../Discussion.styled';
import {
  // PostBody,
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

const Proposal = ({ post, onDeletion }) => {
  const discussionMasterPost = useRef<HTMLDivElement>(null);

  const proposalId = post.master;
  const [, daoId] = post.context.split('-');
  const { data: proposal } = useProposal(daoId, proposalId);

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
        {proposal.creator !== '0x0000000000000000000000000000000000000000' ? (
          <ProposalCardWrapper key={proposalId} proposalId={proposalId} />
        ) : (
          <h3>{`Sorry, this proposal sees to be on another chain, try switching to ${post?.data?.chain} view it`}</h3>
        )}
      </PostWrapper>
    </DiscussionMasterPost>
  );
};

export default Proposal;
