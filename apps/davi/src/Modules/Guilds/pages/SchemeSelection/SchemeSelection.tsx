import { useState } from 'react';
import { useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { FaChevronLeft } from 'react-icons/fa';

import { getSchemesDocument, getSchemesQuery } from '.graphclient';
import { getApolloClient } from 'clients/apollo';
import { SupportedSubgraph } from 'stores/types';

import { SidebarCard, SidebarCardContent } from 'components/SidebarCard';
import { Divider } from 'components/Divider';
import {
  OptionText,
  StyledRadioInput,
} from 'components/ProposalVoteCard/ProposalVoteCard.styled';
import { Result, ResultState } from 'components/Result';
import { IconButton } from 'components/primitives/Button';
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
import { Treasury } from '../Treasury';
import { PermissionsPage } from '../Permissions';
import { SchemeInfo } from './SchemeInfo';

const SchemeSelection = () => {
  const { chain } = useNetwork();
  const { guildId: daoId, chainName } = useTypedParams();

  const {
    data,
    loading: isSchemeLoading,
    error: errorFetchingScheme,
  } = useQuery<getSchemesQuery>(getSchemesDocument, {
    client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
    variables: { id: daoId?.toLowerCase() },
  });

  const [selectedSchemeIndex, setSelectedSchemeIndex] = useState<number>(0); // Defaults to first scheme

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
          title="scheme error"
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
              Cancel
            </IconButton>
          </StyledLink>

          <Heading size={2}>
            {selectedScheme.name} ({selectedScheme.id})
          </Heading>
          <div>
            <CardContainer>
              <CardTitle size={1}>Scheme parameters</CardTitle>
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
            <PermissionsPage subDaoAddress={selectedScheme.id} />
            <Divider />
          </Box>
          <Box>
            <Treasury subDaoAddress={selectedScheme.id} />
          </Box>
        </div>
        <SidebarContent>
          <SidebarCard header="Scheme for proposal">
            <SidebarCardContent>
              {schemes.map((_, index) => {
                return (
                  <Flex
                    direction="row"
                    justifyContent="left"
                    onClick={() => {
                      setSelectedSchemeIndex(index);
                    }}
                  >
                    <StyledRadioInput
                      value={schemes[index]}
                      optionKey={index}
                      checked={selectedSchemeIndex === index}
                    />
                    <OptionText optionKey={index} variant="medium">
                      {schemes[index].name}
                    </OptionText>
                  </Flex>
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

// TODO: fix permissions for avatar scheme
// TODO: prevent guild from accessing scheme-selection
// TODO: add translations
// TODO: trigger scheme selection when creating a proposal in DAOs
// TODO: pass scheme ID to proposal page. Maybe in params?
// TODO: make radio button white and formatted
// ? since we aren't enforcing scheme unique names, how should we display data to differentiate them?
// ? have a "go back to scheme selecction" button in proposal?
