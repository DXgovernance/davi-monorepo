import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import { useInterval } from 'utils';

import { Postbox } from './Postbox';
import { Divider } from 'components/Divider';
import ActivityItem from './ActivityItem';
import {
  DiscussionContainer,
  DiscussionMasterPosts,
  DiscussionPostboxWrapper,
  DiscussionLoadMore,
  LoadMoreButton,
  DiscussionEmpty,
} from './Discussion.styled';
import { Box } from 'components/primitives/Layout';
import { IOrbisGetPostsAlgorithm, IOrbisPost } from 'types/types.orbis';

function Discussion({
  context,
  master = '',
  algorithm = 'all-context-master-posts',
  daoId,
  parentId,
}: {
  context: string;
  master?: string;
  algorithm?: keyof typeof IOrbisGetPostsAlgorithm;
  daoId?: string;
  parentId?: string;
}) {
  const { t } = useTranslation();
  const { orbis } = useOrbisContext();
  const [posts, setPosts] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [all, setAll] = useState([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pausePolling, setPausePolling] = useState(false);

  const getPosts = async ({ polling = false, reset = false }) => {
    if (isFetching || !context || !orbis) return;

    if (!polling) {
      setPausePolling(true);
      setIsFetching(true);
    }

    const _posts = reset ? [] : [...posts];

    const { data, error } = await orbis.getPosts(
      {
        context,
        master,
        algorithm,
      },
      polling || reset ? 0 : page
    );

    if (error) console.log(error);

    if (data) {
      if (!polling) {
        const nextPage = reset ? 1 : page + 1;
        setPage(nextPage);
        setPosts([..._posts, ...data]);
        setHasMore(data.length >= 50);
        setPausePolling(false);
        setIsFetching(false);
      } else {
        const unique = data.filter(
          (a: IOrbisPost) => !_posts.some(b => a.stream_id === b.stream_id)
        );
        if (unique.length > 0) {
          setPosts([...unique, ..._posts]);
        }
      }
    }
  };

  // Getting linked proposals
  const getProposals = async ({ polling = false, reset = false }) => {
    if (isFetching || !context || !orbis) return;

    if (!polling) {
      setPausePolling(true);
      setIsFetching(true);
    }

    const _proposals = reset ? [] : [...proposals];

    let { data, error } = await orbis.getPosts(
      {
        context: `DAVI-${daoId}-${parentId}-proposal`,
      },
      0
    );

    if (error) console.log(error);

    if (data) {
      if (!polling) {
        data?.forEach(proposal => {
          proposal.type = 'proposal';
        });
        const nextPage = reset ? 1 : page + 1;
        setPage(nextPage);
        setProposals([..._proposals, ...data]);
        setHasMore(data.length >= 50);
        setPausePolling(false);
        setIsFetching(false);
      } else {
        const unique = data.filter(
          (a: IOrbisPost) => !_proposals.some(b => a.stream_id === b.stream_id)
        );
        if (unique.length > 0) {
          unique?.forEach(proposal => {
            proposal.type = 'proposal';
          });
          setProposals([..._proposals, ...unique]);
        }
      }
    }
  };

  const onNewMasterPostCreated = (newPost: IOrbisPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletion = async (post: IOrbisPost) => {
    const confirmed = window.confirm(
      `${t('discussions.activity.deletionMessage1')}'\r\n${t(
        'discussions.activity.deletionMessage2'
      )}`
    );
    if (confirmed) {
      const res = await orbis.deletePost(post.stream_id);
      if (res.status === 200) {
        const _posts = posts.filter(o => o.stream_id !== post.stream_id);
        setPosts(_posts);
        console.log('deleted:', post);
      }
    }
  };

  useInterval(() => getPosts({ polling: true }), !pausePolling ? 10000 : null);

  useInterval(
    () => getProposals({ polling: true }),
    !pausePolling ? 10000 : null
  );
  useEffect(() => {
    if (context) {
      getPosts({});
      getProposals({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  useEffect(() => {
    if (all.length !== posts.length + proposals.length) {
      setAll(
        [...posts, ...proposals].sort(function (a, b) {
          return b.timestamp - a.timestamp;
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, proposals]);

  return (
    <DiscussionContainer>
      <DiscussionPostboxWrapper>
        <Postbox
          context={context}
          callback={onNewMasterPostCreated}
          enterToShare={false}
        />
      </DiscussionPostboxWrapper>

      <Divider />

      <DiscussionMasterPosts>
        {all.length > 0 ? (
          all.map(post => (
            // Handle multiple types in this component
            <div>
              <ActivityItem
                post={post}
                handleDeletion={() => handleDeletion(post)}
              />
            </div>
          ))
        ) : (
          <DiscussionEmpty>
            <VscCommentDiscussion size={56} />
            <Box>{t('discussions.activity.discussionEmpty')}</Box>
          </DiscussionEmpty>
        )}
      </DiscussionMasterPosts>

      {hasMore && (
        <DiscussionLoadMore>
          <LoadMoreButton onClick={() => getPosts({})}>
            {t('discussions.activity.discussionLoadMore')}
          </LoadMoreButton>
        </DiscussionLoadMore>
      )}
    </DiscussionContainer>
  );
}

export default Discussion;
