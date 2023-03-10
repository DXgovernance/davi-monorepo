import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';

import { getSchemesDocument, getSchemesQuery } from '.graphclient';
import { getApolloClient } from 'clients/apollo';
import { useHookStoreProvider } from 'stores';
import { SupportedSubgraph } from 'stores/types';

import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import { Divider } from 'components/Divider';
import { Result, ResultState } from 'components/Result';
import { Button, IconButton } from 'components/primitives/Button';
import { RadioInput } from 'components/primitives/Forms/RadioInput';
import { Box, Flex } from 'components/primitives/Layout';
import { StyledLink } from 'components/primitives/Links';
import { Loading } from 'components/primitives/Loading';
import { Heading } from 'components/primitives/Typography';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { PageContainer, SidebarContent } from 'Modules/Guilds/styles';

import {
  CardContainer,
  CardTitle,
  StyledDivider,
} from './SchemeSelection.styled';
import { SchemeInfo } from './SchemeInfo';
import { Treasury } from '../Treasury';
import { PermissionsPage } from '../Permissions';

const SchemeSelection = () => {
  const { t } = useTranslation();
  const { chain } = useNetwork();
  const { guildId: daoId, chainName } = useTypedParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const discussionId = searchParams.get('ref');

  const { name: governanceName } = useHookStoreProvider();

  const {
    data,
    loading: isSchemeLoading,
    error: errorFetchingScheme,
  } = useQuery<getSchemesQuery>(getSchemesDocument, {
    client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
    variables: { id: daoId?.toLowerCase() },
  });

  const [selectedSchemeIndex, setSelectedSchemeIndex] = useState(0); // Defaults to first scheme

  if (governanceName !== 'Governance1_5') {
    navigate(`/${chainName}/${daoId}/create-proposal`);
    return <></>;
  }

  if (
    !data ||
    !data.dao ||
    !data.dao.schemes ||
    data.dao.schemes.length === 0
  ) {
    return <></>;
  }

  if (errorFetchingScheme) {
    return (
      <PageContainer>
        <Result
          title={t('schemes.errorFetchingSchemes')}
          subtitle={errorFetchingScheme.message}
          state={ResultState.ERROR}
        />
      </PageContainer>
    );
  }

  const schemes = data.dao.schemes;
  const selectedScheme = schemes[selectedSchemeIndex];

  return (
    <>
      <PageContainer>
        <div>
          <StyledLink to={`/${chainName}/${daoId}`} variant="outline">
            <IconButton
              data-testid="proposal-home-btn"
              variant="secondary"
              iconLeft
              padding={'0.6rem 0.8rem'}
              marginTop={'5px;'}
            >
              <FaChevronLeft style={{ marginRight: '15px' }} />
              {t('modals.cancel')}
            </IconButton>
          </StyledLink>

          <Heading size={2}>
            {selectedScheme.name} ({selectedScheme.id})
          </Heading>
          <div>
            <CardContainer>
              <CardTitle size={1}>{t('schemes.schemeParameters')}</CardTitle>
              <StyledDivider />
              {isSchemeLoading ? (
                <Loading loading text />
              ) : (
                <SchemeInfo selectedScheme={selectedScheme} />
              )}
            </CardContainer>
            <Divider />
          </div>
          <Box margin="20px 0px">
            <PermissionsPage
              subDaoAddress={
                selectedScheme.canMakeAvatarCalls ? null : selectedScheme.id
              }
            />
            <Divider />
          </Box>
          <Box>
            <Treasury
              subDaoAddress={
                selectedScheme.canMakeAvatarCalls ? null : selectedScheme.id
              }
            />
          </Box>
          <Flex margin="20px 0px" alignItems="flex-end">
            <StyledLink
              to={`/${chainName}/${daoId}/create-proposal?subdao=${
                selectedScheme.id
              }${discussionId ? '&ref=' + discussionId : ''}`}
              variant="outline"
            >
              <Button
                variant="primaryWithBorder"
                data-testid="create-proposal-btn"
              >
                {t('createProposal.createProposal')}
              </Button>
            </StyledLink>
          </Flex>
        </div>
        <SidebarContent>
          <SidebarCard
            header={
              <SidebarCardHeaderSpaced>
                {t('schemes.schemeForProposal')}
              </SidebarCardHeaderSpaced>
            }
          >
            <SidebarCardContent>
              {schemes.map((_, index) => {
                return (
                  <>
                    <Flex
                      direction="row"
                      justifyContent="left"
                      onClick={() => {
                        setSelectedSchemeIndex(index);
                      }}
                    >
                      <RadioInput
                        value={schemes[index]}
                        checked={selectedSchemeIndex === index}
                      />
                      <Box margin={'0px 10px'}>{schemes[index].name}</Box>
                    </Flex>
                    {index !== schemes.length - 1 && (
                      <Divider margin="14px 0px " />
                    )}
                  </>
                );
              })}
            </SidebarCardContent>
          </SidebarCard>
        </SidebarContent>
      </PageContainer>
    </>
  );
};

export default SchemeSelection;

// TODO: separating lines between options
// ? since we aren't enforcing scheme unique names, how should we display data to differentiate them?
// ? have a "go back to scheme selecction" button in proposal?
// ? in "create proposal" page, show which scheme was selected
// ? what goes in the text?
