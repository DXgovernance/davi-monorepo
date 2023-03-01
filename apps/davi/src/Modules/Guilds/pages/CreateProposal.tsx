import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiChevronLeft, FiX } from 'react-icons/fi';
import { MdOutlinePreview, MdOutlineModeEdit } from 'react-icons/md';

import { preventEmptyString, ZERO_ADDRESS, ZERO_HASH } from 'utils';
import { useHookStoreProvider } from 'stores';

import SidebarInfoCardWrapper from 'Modules/Guilds/Wrappers/SidebarInfoCardWrapper';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { Input } from 'components/primitives/Forms/Input';
import { Box, Flex } from 'components/primitives/Layout';
import { ActionsBuilder } from 'components/ActionsBuilder';
import { Call, Option } from 'components/ActionsBuilder/types';
import { useTextEditor } from 'components/Editor';
import { Loading } from 'components/primitives/Loading';
import { Modal } from 'components/primitives/Modal';
import { WarningCircle } from 'components/primitives/StatusCircles';
import { connect, isConnected } from 'components/Forum';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import { bulkEncodeCallsFromOptions } from 'hooks/Guilds/contracts/useEncodedCall';
import {
  PageContainer,
  PageContent,
  StyledButton,
  SidebarContent,
  Label,
} from '../styles';
import { StyledLink } from 'components/primitives/Links';
import { IconButton } from 'components/primitives/Button';
import { linkStyles } from './Proposal/Proposal.styled';
import { ProposalDescription } from 'components/ProposalDescription';
import useLocalStorageWithExpiry from 'hooks/Guilds/useLocalStorageWithExpiry';

export const EMPTY_CALL: Call = {
  data: ZERO_HASH,
  from: ZERO_ADDRESS,
  to: ZERO_ADDRESS,
  value: BigNumber.from(0),
};

const CreateProposalPage: React.FC = () => {
  const { guildId, chainName: chain } = useTypedParams();
  const [searchParams] = useSearchParams();
  const discussionId = searchParams.get('ref');

  const { isLoading: isGuildAvailabilityLoading } = useContext(
    GuildAvailabilityContext
  );
  const {
    hooks: {
      writers: { useCreateProposal },
    },
  } = useHookStoreProvider();
  const { orbis } = useOrbisContext();

  const createProposal = useCreateProposal(guildId, discussionId);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const [editMode, setEditMode] = useState(true);
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ignoreWarning, setIgnoreWarning] = useState(false);
  const [options, setOptions] = useState<Option[]>([
    {
      id: `option-1-For`,
      label: t('actionBuilder.options.for', { defaultValue: 'For' }),
      color: theme?.colors?.votes?.[1],
      decodedActions: [],
      permissions: [],
    },
  ]);
  const [isPermissionWarningModalOpen, setIsPermissionWarningModalOpen] =
    useState(false);

  const [html, onHTMLChange] = useLocalStorageWithExpiry<string>(
    `${guildId}/${discussionId ?? 'create-proposal'}/html`,
    null,
    345600000
  );

  const {
    Editor,
    EditorConfig,
    md: proposalBodyMd,
    html: proposalBodyHTML,
    clear,
  } = useTextEditor({
    placeholder: t('createProposal.enterProposalDescription'),
    onHTMLChange,
    html,
    initialContent: description,
  });

  const [isMetadataErrorModalOpen, setIsMetadataErrorModalOpen] =
    useState(false);
  const [skipMetadataUpload, setSkipMetadataUpload] = useState(false);
  const [metadataUploadError, setMetadataUploadError] = useState<string>(null);

  const [user, setUser] = useState('');

  const isActionDenied = useMemo(
    () =>
      options.some(({ decodedActions }) =>
        decodedActions.some(({ actionDenied }) => !!actionDenied)
      ),
    [options]
  );
  const handleToggleEditMode = () => {
    // TODO: add proper validation if toggle from edit to preview without required fields
    if (editMode && !title.trim() && !proposalBodyMd.trim()) return;
    setEditMode(v => !v);
  };

  const handleSkipMetadataUpload = () => {
    setIsMetadataErrorModalOpen(false);
    setSkipMetadataUpload(true);
  };

  const handleRetryMetadataUpload = () => {
    setIsMetadataErrorModalOpen(false);
    handleCreateProposal();
  };

  const handleMetadataUploadError = (error: Error) => {
    console.log(error);
    setMetadataUploadError(error.message);
    setIsMetadataErrorModalOpen(true);
  };

  useEffect(() => {
    if (skipMetadataUpload && !isMetadataErrorModalOpen) handleCreateProposal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipMetadataUpload, isMetadataErrorModalOpen]);

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

  useEffect(() => {
    const handleGetProposalContent = async () => {
      if (discussionId) {
        const { data } = await orbis.getPost(discussionId);
        setTitle(data.content.title);
        setDescription(data.content.body);
      }
    };
    handleGetProposalContent();
  }, [discussionId, orbis]);

  const checkIfWarningIgnored = useCallback(async () => {
    if (!ignoreWarning && isActionDenied) {
      setIsPermissionWarningModalOpen(true);
      return;
    }
    handleCreateProposal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ignoreWarning, isActionDenied]);

  const handleCreateProposal = async () => {
    setIsCreatingProposal(true);
    const encodedOptions = bulkEncodeCallsFromOptions(options);
    const totalOptions = encodedOptions.length;
    const maxActionsPerOption = encodedOptions.reduce(
      (acc, cur) => (acc < cur.actions.length ? cur.actions.length : acc),
      0
    );

    const calls = encodedOptions
      .map(option => {
        const actions = option.actions;
        if (option.actions.length < maxActionsPerOption) {
          // Pad array with empty calls
          return actions.concat(
            Array(maxActionsPerOption - option.actions.length).fill(EMPTY_CALL)
          );
        } else {
          return actions;
        }
      })
      .reduce((acc, actions) => acc.concat(actions), [] as Call[]);

    const toArray = calls.map(call => call.to);
    const dataArray = calls.map(call => call.data);
    const valueArray = calls.map(call => preventEmptyString(call.value));

    if (
      toArray.length === 0 &&
      dataArray.length === 0 &&
      valueArray.length === 0
    ) {
      toArray.push(ZERO_ADDRESS);
      dataArray.push(ZERO_HASH);
      valueArray.push(BigNumber.from(0));
    }

    const otherFields = { options };

    createProposal(
      title,
      proposalBodyMd,
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      otherFields,
      skipMetadataUpload,
      handleMetadataUploadError,
      err => {
        setIsCreatingProposal(false);
        if (!err) {
          editMode && clear();
          navigate(`/${chain}/${guildId}`);
        }
      }
    )
      .catch((err: Error) => {
        setIsCreatingProposal(false);
        toast.error(err.message);
      })
      .finally(() => {
        setIsCreatingProposal(false);
      });
  };
  useEffect(() => {
    if (ignoreWarning) checkIfWarningIgnored();
  }, [ignoreWarning, checkIfWarningIgnored]);

  const isValid = useMemo(() => {
    if (!title) return false;
    if (!proposalBodyHTML) return false;
    if (!proposalBodyMd || !proposalBodyMd.length) return false;

    return true;
  }, [title, proposalBodyHTML, proposalBodyMd]);

  if (isGuildAvailabilityLoading) return <Loading loading />;
  return (
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
              data-testid="back-to-overview-btn"
            >
              <FiChevronLeft style={{ marginRight: '15px' }} />{' '}
              {t('proposal.backToOverview')}{' '}
            </IconButton>
          </StyledLink>

          <StyledButton
            onClick={handleToggleEditMode}
            disabled={!title || !proposalBodyMd}
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
              <Label>{t('createProposal.title')}</Label>
              <Input
                data-testid="proposal-title-input"
                placeholder="Proposal Title"
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
          <ProposalDescription metadata={{ description: proposalBodyMd }} />
        )}
        <Box margin="16px 0px 24px">
          <ActionsBuilder
            options={options}
            onChange={setOptions}
            editable={editMode}
          />
        </Box>
        <Box margin="16px 0px">
          <StyledButton
            onClick={() => {
              if (isActionDenied) {
                checkIfWarningIgnored();
              } else {
                handleCreateProposal();
              }
            }}
            disabled={!isValid || isCreatingProposal}
            data-testid="create-proposal-action-button"
            backgroundColor={isValid ? 'none' : '#1B1D1F'}
            outline={'1px solid #A1A6B0'}
          >
            {t('createProposal.createProposal')}
          </StyledButton>
        </Box>
      </PageContent>
      <SidebarContent>
        <SidebarInfoCardWrapper />
      </SidebarContent>
      <Modal
        isOpen={isMetadataErrorModalOpen}
        onDismiss={() => setIsMetadataErrorModalOpen(false)}
        header={t('proposal.errors.metadataUploadError')}
        maxWidth={390}
      >
        <Flex padding={'1.5rem'}>
          <Flex>
            <WarningCircle>
              <FiX size={40} />
            </WarningCircle>
            <Flex padding={'1.5rem 0'}>{metadataUploadError}</Flex>
          </Flex>
          <Flex direction="row" style={{ columnGap: '1rem' }}>
            <StyledButton onClick={handleRetryMetadataUpload}>
              {t('createProposal.retry')}
            </StyledButton>
            <StyledButton
              onClick={handleSkipMetadataUpload}
              variant="secondary"
            >
              {t('createProposal.createAnyway')}
            </StyledButton>
            <StyledButton
              onClick={() => {
                setIsCreatingProposal(false);
                setIsMetadataErrorModalOpen(false);
              }}
              variant="secondary"
            >
              {t('modals.close')}
            </StyledButton>
          </Flex>
        </Flex>
      </Modal>
      <Modal
        isOpen={isPermissionWarningModalOpen}
        onDismiss={() => setIsPermissionWarningModalOpen(false)}
        header={t('actionBuilder.permissions.warningMessage')}
        maxWidth={390}
      >
        <Flex padding={'1.5rem'}>
          <Flex>
            <WarningCircle>
              <FiX size={40} />
            </WarningCircle>
            <Flex padding={'1.5rem 0'}>
              {t('actionBuilder.permissions.proposalNotExecuted')}
            </Flex>
          </Flex>
          <Flex direction="row" style={{ columnGap: '1rem' }}>
            <StyledButton
              onClick={() => {
                setIgnoreWarning(true);
              }}
              variant="secondary"
            >
              {t('createProposal.createAnyway')}
            </StyledButton>
            <StyledButton
              onClick={() => setIsPermissionWarningModalOpen(false)}
              variant="secondary"
            >
              {t('modals.close')}
            </StyledButton>
          </Flex>
        </Flex>
      </Modal>
    </PageContainer>
  );
};

export default CreateProposalPage;
