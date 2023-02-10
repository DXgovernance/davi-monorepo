import SidebarInfoCardWrapper from 'Modules/Guilds/Wrappers/SidebarInfoCardWrapper';
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
import sanitizeHtml from 'sanitize-html';
import { useTranslation } from 'react-i18next';
import {
  PageContainer,
  PageContent,
  StyledButton,
  SidebarContent,
  Label,
} from '../styles';
import {
  connect,
  isConnected,
  createPost,
  postTemplate,
} from 'components/Forum';
import { DiscussionContent } from 'components/Forum/types';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import { IconButton } from 'components/primitives/Button';
import { StyledLink } from 'components/primitives/Links';
import { linkStyles } from './Proposal/Proposal.styled';
import { useTheme } from 'styled-components';
import { WalletModal } from 'components/Web3Modals';
import { useAccount } from 'wagmi';
import { isReadOnly } from 'provider/wallets';

const CreateDiscussionPage: React.FC = () => {
  const { orbis } = useOrbisContext();

  const { guildId, chainName: chain } = useTypedParams();
  const { isLoading: isGuildAvailabilityLoading } = useContext(
    GuildAvailabilityContext
  );

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState('');
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState('');
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

  const {
    Editor,
    EditorConfig,
    md: discussionBodyMd,
    html: discussionBodyHtml,
  } = useTextEditor(
    `${guildId}/create-discussion`,
    345600000,
    t('discussions.discussionPlaceholder')
  );

  const hasWalletConnection = useMemo(() => {
    return !isWalletConnecting && !isReadOnly(connector) && isWalletConnected;
  }, [connector, isWalletConnected, isWalletConnecting]);

  const toggleWalletModal = () => {
    setIsWalletModalOpen(!isWalletModalOpen);
  };

  const handleToggleEditMode = () => {
    // TODO: add proper validation if toggle from edit to preview without required fields
    if (editMode && !title.trim() && !discussionBodyMd.trim()) return;
    setEditMode(v => !v);
  };

  const handleBack = () => navigate(`/${chain}/${guildId}/`);

  const handleCreateDiscussion = async (post: DiscussionContent) => {
    if (!hasWalletConnection) {
      setIsWalletModalOpen(true);
      return "";
    }

    if (postTemplate(post)) {
      const res = await createPost(orbis, post);
      handleBack();
      return {
        res,
        postTemplate,
      };
    } else {
      return 'Something went wrong when trying to create a discussion';
    }
  };

  const isValid = useMemo(() => {
    if (!title) return false;
    if (!discussionBodyHtml) return false;
    if (!discussionBodyMd || !discussionBodyMd.length) return false;

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
            <StyledLink to={`/${chain}/${guildId}`} customStyles={linkStyles}>
              <IconButton
                variant="secondary"
                iconLeft
                padding={'0.6rem 0.8rem'}
                marginTop={'5px;'}
              >
                <FiChevronLeft style={{ marginRight: '15px' }} />{' '}
                {t('proposal.backToOverview')}{' '}
              </IconButton>
            </StyledLink>

            <StyledButton
              onClick={handleToggleEditMode}
              disabled={!isValid}
              data-testid="create-proposal-editor-toggle-button"
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
                  data-testid="create-discussion-title"
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
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(discussionBodyHtml),
              }}
            />
          )}
          <Box margin="16px 0px">
            <StyledButton
              onClick={() => {
                handleCreateDiscussion({
                  title,
                  body: discussionBodyMd,
                  context: `DAVI-${guildId}`,
                  master: null,
                  replyTo: null,
                  mentions: [],
                  data: {},
                });
              }}
              backgroundColor={isValid ? 'none' : theme.colors.bg1}
              disabled={!isValid}
              data-testid="create-proposal-action-button"
            >
              {t('discussions.createDiscussion')}
            </StyledButton>
          </Box>
        </PageContent>
        <SidebarContent>
          <SidebarInfoCardWrapper />
        </SidebarContent>
      </PageContainer>
      <WalletModal isOpen={isWalletModalOpen} onClose={toggleWalletModal} />
    </>
  );
};

export default CreateDiscussionPage;
