import DiscussionMasterPost from './DiscussionMasterPost';
import Proposal from './Proposal/Proposal';
function ActivityItem({ post, handleDeletion }) {
  if (post.type === 'proposal') {
    return (
      <Proposal
        key={post.stream_id}
        post={post}
        onDeletion={() => handleDeletion(post)}
      />
    );
  } else {
    return (
      <DiscussionMasterPost
        key={post.stream_id}
        post={post}
        onDeletion={() => handleDeletion(post)}
      />
    );
  }
}

export default ActivityItem;
