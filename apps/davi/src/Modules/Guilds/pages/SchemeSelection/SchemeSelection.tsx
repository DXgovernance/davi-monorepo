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
  InfoDetail,
  InfoDetailMuted,
} from 'components/ProposalInfoCard/ProposalInfoCard.styled';
import {
  OptionText,
  StyledRadioInput,
} from 'components/ProposalVoteCard/ProposalVoteCard.styled';
import { IconButton } from 'components/primitives/Button';
import { Box, Flex } from 'components/primitives/Layout';
import { StyledLink } from 'components/primitives/Links';
import { Heading } from 'components/primitives/Typography';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { PageContainer, SidebarContent } from 'Modules/Guilds/styles';

import {
  CardBody,
  CardContainer,
  CardTitle,
  SchemePropertiesGrid,
  StyledDivider,
} from './SchemeSelection.styled';
import { Treasury } from '../Treasury';
import { PermissionsPage } from '../Permissions';

const SchemeSelection = () => {
  const { chain } = useNetwork();
  const { guildId: daoId, chainName } = useTypedParams();

  const { data } = useQuery<getSchemesQuery>(getSchemesDocument, {
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
              <CardBody>
                <SchemePropertiesGrid>
                  <InfoDetail>
                    <span>Quorum</span>
                    {/* ! HARDCODED */}
                    <InfoDetailMuted>40%</InfoDetailMuted>
                  </InfoDetail>

                  <InfoDetail>
                    <span>Can manage schemes</span>
                    <InfoDetailMuted>
                      {selectedScheme.canManageSchemes ? 'yes' : 'no'}
                    </InfoDetailMuted>
                  </InfoDetail>

                  <InfoDetail>
                    <span>Proposal time max</span>
                    {/* ! HARDCODED */}
                    <InfoDetailMuted>3 days</InfoDetailMuted>
                  </InfoDetail>

                  <InfoDetail>
                    <span>Can control main treasury</span>
                    <InfoDetailMuted>
                      {selectedScheme.canMakeAvatarCalls ? 'yes' : 'no'}
                    </InfoDetailMuted>
                  </InfoDetail>

                  <InfoDetail>
                    <span>Proposal time in boost</span>
                    {/* ! HARDCODED */}
                    <InfoDetailMuted>1 day</InfoDetailMuted>
                  </InfoDetail>

                  <InfoDetail>
                    <span>Can change reputation</span>
                    <InfoDetailMuted>
                      {selectedScheme.canChangeReputation ? 'yes' : 'no'}
                    </InfoDetailMuted>
                  </InfoDetail>

                  <InfoDetail>
                    <span>Proposal time in pre boost</span>
                    {/* ! HARDCODED */}
                    <InfoDetailMuted>1 day</InfoDetailMuted>
                  </InfoDetail>

                  <InfoDetail>
                    <span>Max rep percentage change</span>
                    <InfoDetailMuted>
                      {selectedScheme.maxRepPercentageChange}%
                    </InfoDetailMuted>
                  </InfoDetail>

                  <InfoDetail>
                    <span>Type</span>
                    <InfoDetailMuted>{selectedScheme.type}</InfoDetailMuted>
                  </InfoDetail>
                </SchemePropertiesGrid>
              </CardBody>
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

// TODO: handle loading
// TODO: handle error
// TODO: prevent guild from accessing scheme-selection
// TODO: add translations
// TODO: trigger scheme selection when creating a proposal in DAOs
// TODO: get missing data: proposal time, quorum, boost, etc
// TODO: make radio button white and formatted
// TODO: fix permissions for avatar scheme
// TODO: pass scheme ID to proposal page. Maybe in params?
// ? since we aren't enforcing scheme unique names, how should we display data to differentiate them?
// ? have a "go back to scheme selecction" button in proposal?
