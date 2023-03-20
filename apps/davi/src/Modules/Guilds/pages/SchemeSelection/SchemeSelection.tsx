import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import { useHookStoreProvider } from 'stores';

import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import { Divider } from 'components/Divider';
import { Result, ResultState } from 'components/Result';
import { IconButton } from 'components/primitives/Button';
import { RadioInput } from 'components/primitives/Forms/RadioInput';
import { Box } from 'components/primitives/Layout';
import { StyledLink } from 'components/primitives/Links';
import { Loading } from 'components/primitives/Loading';
import { Heading } from 'components/primitives/Typography';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { PageContainer, SidebarContent } from 'Modules/Guilds/styles';

import {
  CardContainer,
  CardTitle,
  NextButton,
  RadioInputContainer,
  StyledDivider,
} from './SchemeSelection.styled';
import { SchemeInfo } from './SchemeInfo';
import { Treasury } from '../Treasury';
import { PermissionsPage } from '../Permissions';

const SchemeSelection = () => {
  const { t } = useTranslation();
  const { guildId: daoId, chainName } = useTypedParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const discussionId = searchParams.get('ref');
  const subdaoId = searchParams.get('subdao');

  const {
    hooks: {
      fetchers: { useGetSubDAOs },
    },
    capabilities: { hasSubDAO },
  } = useHookStoreProvider();

  const {
    data: schemes,
    isLoading: isSchemeLoading,
    isError,
    errorMessage,
  } = useGetSubDAOs(daoId);

  const [selectedSchemeIndex, setSelectedSchemeIndex] = useState(0);

  useEffect(() => {
    // handles case where the user goes back to selecting a scheme from the proposal creation page
    try {
      if (subdaoId) {
        schemes.find((scheme, index) => {
          if (scheme.id === subdaoId) {
            setSelectedSchemeIndex(index);
            if (discussionId) setSearchParams(`ref=${discussionId}`);
            else setSearchParams('');
            return true;
          } else {
            return false;
          }
        });
      }
    } catch {
      return;
    }
  }, [schemes, subdaoId, discussionId, setSearchParams]);

  if (hasSubDAO === false) {
    navigate(`/${chainName}/${daoId}/create-proposal`);
    return <></>;
  }

  if (isError) {
    return (
      <PageContainer>
        <Result
          title={t('schemes.errorFetchingSchemes')}
          subtitle={errorMessage}
          state={ResultState.ERROR}
        />
      </PageContainer>
    );
  }

  if (!schemes) return <></>;

  if (schemes?.length === 0) {
    return <PageContainer>{t('schemes.daoHasNoSchemes')}</PageContainer>;
  }

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
                  <div>
                    <RadioInputContainer
                      onClick={() => {
                        setSelectedSchemeIndex(index);
                      }}
                    >
                      <RadioInput
                        value={schemes[index]}
                        checked={selectedSchemeIndex === index}
                      />
                      {schemes[index].name}
                    </RadioInputContainer>
                    {index !== schemes.length - 1 && (
                      <Divider margin="14px 0px " />
                    )}
                  </div>
                );
              })}
            </SidebarCardContent>
            <Divider />

            <Box margin={'24px'}>
              <StyledLink
                to={`/${chainName}/${daoId}/create-proposal?subdao=${
                  selectedScheme.id
                }${discussionId ? '&ref=' + discussionId : ''}`}
              >
                <NextButton data-testid="create-proposal-btn">
                  {t('schemes.next')}
                </NextButton>
              </StyledLink>
            </Box>
          </SidebarCard>
        </SidebarContent>
      </PageContainer>
    </>
  );
};

export default SchemeSelection;
