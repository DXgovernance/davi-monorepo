import dxIcon from 'assets/images/dxdao-icon.svg';
import { StyledLink } from 'components/primitives/Links';
import { Loading } from 'components/primitives/Loading';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { Label } from 'components/SidebarInfoCard/SidebarInfoCard.styled';
import {
  DaoBrand,
  DaoIcon,
  DaoInfo,
  DaoInfoPanel,
  DaoMemberCount,
  DaoTitle,
  MemberIconWrapper,
  SidebarMenu,
  SidebarMenuItem,
  SidebarWrapper,
} from './GuildSidebar.styled';

export interface GuildSidebarProps {
  guildName?: string;
  numberOfMembers?: number;
  actions?: React.ReactNode;
}

export const GuildSidebar: React.FC<GuildSidebarProps> = ({
  guildName,
  numberOfMembers,
  actions,
}) => {
  const { t } = useTranslation();
  let { chainName, guildId } = useTypedParams();
  const { pathname } = useLocation();

  const locations = {
    governance: `/${chainName}/${guildId}`,
    allProposals: `/${chainName}/${guildId}/all-proposals`,
    allDiscussions: `/${chainName}/${guildId}/all-discussions`,
    members: `/${chainName}/${guildId}/members`,
    permissions: `/${chainName}/${guildId}/permissions`,
    treasury: `/${chainName}/${guildId}/treasury`,
  };

  return (
    <SidebarWrapper data-testid="sidebar">
      <DaoInfoPanel>
        <DaoMemberCount>
          {numberOfMembers != null ? (
            <MemberIconWrapper>
              <MdOutlinePeopleAlt size={26} />
              <Label data-testid="members-count">
                {numberOfMembers.toString()}
              </Label>
            </MemberIconWrapper>
          ) : (
            <Loading loading text />
          )}
        </DaoMemberCount>
        <DaoInfo>
          <DaoBrand>
            <DaoIcon src={dxIcon} alt={guildName} />

            <DaoTitle data-testid="guild-name-sidebar" size={2} as="h1">
              {guildName || <Loading loading text />}
            </DaoTitle>
          </DaoBrand>
        </DaoInfo>
        {actions}
      </DaoInfoPanel>
      <SidebarMenu>
        <StyledLink data-testid="governance-page" to={locations.governance}>
          <SidebarMenuItem current={pathname === locations.governance}>
            {t('governance')}
          </SidebarMenuItem>
        </StyledLink>
        <StyledLink
          data-testid="all-proposals-page"
          to={locations.allProposals}
        >
          <SidebarMenuItem current={pathname === locations.allProposals}>
            {t('proposals.allProposals')}
          </SidebarMenuItem>
        </StyledLink>
        <StyledLink
          data-testid="all-discussions-page"
          to={locations.allDiscussions}
        >
          <SidebarMenuItem current={pathname === locations.allDiscussions}>
            {t('discussions.allDiscussions')}
          </SidebarMenuItem>
        </StyledLink>
        <StyledLink to={locations.members}>
          <SidebarMenuItem current={pathname === locations.members}>
            {t('members.members')}
          </SidebarMenuItem>
        </StyledLink>
        <StyledLink to={locations.permissions}>
          <SidebarMenuItem current={pathname === locations.permissions}>
            {t('actionBuilder.permissions.permissions')}
          </SidebarMenuItem>
        </StyledLink>
        <StyledLink to={locations.treasury}>
          <SidebarMenuItem current={pathname === locations.treasury}>
            {t('treasury.treasury')}
          </SidebarMenuItem>
        </StyledLink>
      </SidebarMenu>
    </SidebarWrapper>
  );
};
