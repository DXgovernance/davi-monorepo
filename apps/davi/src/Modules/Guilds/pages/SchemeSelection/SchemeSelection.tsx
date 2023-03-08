import { Heading } from 'components/primitives/Typography';
import { PageContainer, SidebarContent } from 'Modules/Guilds/styles';
import {
  CardBody,
  CardContainer,
  CardTitle,
  StyledDivider,
} from './SchemeSelection.styled';
import { SidebarCard, SidebarCardContent } from 'components/SidebarCard';
import { Divider } from 'components/Divider';

const SchemeSelection = () => {
  return (
    <>
      <PageContainer>
        <div>
          <Heading size={2}>Scheme 1</Heading>
          <div>
            <CardContainer>
              <CardTitle size={1}>Scheme parameters</CardTitle>
              <StyledDivider />
              <CardBody></CardBody>
            </CardContainer>
            <Divider />
          </div>
          <div>
            <CardContainer>
              <CardTitle size={1}>Permissions</CardTitle>
              <StyledDivider />
              <CardBody></CardBody>
            </CardContainer>
            <Divider />
          </div>
          <div>
            <CardContainer>
              <CardTitle size={1}>Treasury</CardTitle>
              <StyledDivider />
              <CardBody></CardBody>
            </CardContainer>
          </div>
        </div>
        <SidebarContent>
          <SidebarCard header="Sidebar">
            <SidebarCardContent>Content</SidebarCardContent>
          </SidebarCard>
        </SidebarContent>
      </PageContainer>
    </>
  );
};

export default SchemeSelection;

// TODO: get a list of all schemes
// TODO: get scheme capabilities
// TODO: get scheme permissions
// TODO: get scheme treasury
// TODO: implement a way to switch between schemes: either poll the data for all the schemes or just the one currently selected
// TODO: add button logic to go back
