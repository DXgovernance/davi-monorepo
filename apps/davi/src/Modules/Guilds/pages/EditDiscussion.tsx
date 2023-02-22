import { Input } from 'components/primitives/Forms/Input';
import { Box, Flex } from 'components/primitives/Layout';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { useTextEditor } from 'components/Editor';
import { Loading } from 'components/primitives/Loading';
import { useContext, useMemo, useState, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { MdOutlinePreview, MdOutlineModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageContainer, PageContent, StyledButton, Label } from '../styles';
import { connect, isConnected, editPost, postTemplate } from 'components/Forum';
import { DiscussionContent } from 'components/Forum/types';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import { IconButton } from 'components/primitives/Button';
import { StyledLink } from 'components/primitives/Links';
import { linkStyles } from './Proposal/Proposal.styled';
import { useTheme } from 'styled-components';
import { ProposalDescription } from 'components/ProposalDescription';
import { WalletModal } from 'components/Web3Modals';
import { useAccount } from 'wagmi';
import { isReadOnly } from 'provider/wallets';

const EditDiscussionPage: React.FC = () => {
  const { orbis } = useOrbisContext();

  const { chainName: chain, guildId, discussionId } = useTypedParams();
  const { isLoading: isGuildAvailabilityLoading } = useContext(
    GuildAvailabilityContext
  );

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState('');
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState('');
  const [html, onHTMLChange] = useState<string>();
  const [initialDescription, setInitialDescription] = useState<string>('');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const theme = useTheme();

  const {
    connector,
    isConnecting: isWalletConnecting,
    isConnected: isWalletConnected,
  } = useAccount();

  useEffect(() => {
    isConnected(orbis).then(res => {
      if (res) {
        console.log('Already connected with: ', res);
      } else {
        connect(orbis).then(did => {
          setUser(did);
        });
      }
    });
  }, [user, orbis]);

  const getPost = async () => {
    const { data } = await orbis.getPost(discussionId);
    setTitle(data?.content?.title);
    setInitialDescription(data?.content?.body);
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    Editor,
    EditorConfig,
    md: discussionBodyMd,
    html: discussionBodyHtml,
  } = useTextEditor(
    t('discussions.discussionPlaceholder'),
    onHTMLChange,
    html,
    initialDescription
  );

  const hasWalletConnection = useMemo(() => {
    return !isWalletConnecting && !isReadOnly(connector) && isWalletConnected;
  }, [connector, isWalletConnected, isWalletConnecting]);

  const toggleWalletModal = () => {
    setIsWalletModalOpen(!isWalletModalOpen);
  };

  const handleToggleEditMode = () => {
    if (editMode && !title.trim() && !discussionBodyMd.trim()) return;
    setEditMode(v => !v);
  };

  const handleBack = () => {
    setTimeout(() => {
      navigate(`/${chain}/${guildId}/discussion/${discussionId}`);
    }, 3000);
  };

  const handleEditDiscussion = async (post: DiscussionContent) => {
    if (!hasWalletConnection) {
      setIsWalletModalOpen(true);
      return '';
    }

    if (postTemplate(post)) {
      const res = await editPost(orbis, discussionId, post);
      handleBack();
      return {
        res,
        postTemplate,
      };
    } else {
      return 'Something went wrong when trying to updating the discussion';
    }
  };

  const isValid = useMemo(() => {
    if (
      !title ||
      !discussionBodyHtml ||
      !discussionBodyMd ||
      !discussionBodyMd.length
    ) {
      return false;
    }

    return true;
  }, [title, discussionBodyHtml, discussionBodyMd]);

  if (isGuildAvailabilityLoading) return <Loading loading />;

  return (
    <>
      <PageContainer>
        <PageContent>
          <Flex
            direction="row"
            justifyContent="space-between"
            margin="0px 0px 24px"
          >
            <StyledLink
              to={`/${chain}/${guildId}/discussion/${discussionId}`}
              customStyles={linkStyles}
            >
              <IconButton
                variant="secondary"
                iconLeft
                padding={'0.6rem 0.8rem'}
                marginTop={'5px;'}
              >
                <FiChevronLeft style={{ marginRight: '15px' }} />{' '}
                {t('proposal.backToDiscussion')}{' '}
              </IconButton>
            </StyledLink>

            <StyledButton
              onClick={handleToggleEditMode}
              disabled={!isValid}
              data-testid="edit-proposal-editor-toggle-button"
            >
              {editMode ? (
                <MdOutlinePreview size={18} />
              ) : (
                <MdOutlineModeEdit size={18} />
              )}
            </StyledButton>
          </Flex>
          <Box margin="0px 0px 24px">
            {editMode ? (
              <>
                <Label>{t('discussions.title')}</Label>
                <Input
                  data-testid="edit-discussion-title"
                  placeholder="Discussion Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </>
            ) : (
              <Label size="24px"> {title}</Label>
            )}
          </Box>

          {editMode ? (
            <Editor EditorConfig={EditorConfig} />
          ) : (
            <ProposalDescription metadata={{ description: discussionBodyMd }} />
          )}
          <Box margin="16px 0px">
            <StyledButton
              onClick={() => {
                handleEditDiscussion({
                  title,
                  body: discussionBodyMd,
                  context: `DAVI-${guildId}`
                });
              }}
              backgroundColor={isValid ? 'none' : theme.colors.bg1}
              disabled={!isValid}
              data-testid="edit-proposal-action-button"
            >
              {t('discussions.updateDiscussion')}
            </StyledButton>
          </Box>
        </PageContent>
      </PageContainer>
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={toggleWalletModal}
        title={t('connections.connectTheWalletToProceed')}
      />
    </>
  );
};

export default EditDiscussionPage;
