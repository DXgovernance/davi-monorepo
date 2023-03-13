import { duration } from 'moment';
import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeader,
} from 'components/SidebarCard';
import { Loading } from 'components/primitives/Loading';
import { Row, Label, ColoredLabel } from './SidebarInfoCard.styled';
import { SidebarInfoCardProps } from './types';
import { useTranslation } from 'react-i18next';
import { shortenAddress } from 'utils';

const SidebarInfoCard: React.FC<SidebarInfoCardProps> = ({
  proposalTime,
  quorum,
  subdaoId,
}) => {
  const { t } = useTranslation();

  return (
    <SidebarCard
      header={
        <SidebarCardHeader>{t('proposal.information')}</SidebarCardHeader>
      }
    >
      <SidebarCardContent>
        <Row>
          <Label>{t('proposal.consensusSystem')}</Label>
          <ColoredLabel>{t('dao.guild')}</ColoredLabel>
        </Row>
        <Row>
          <Label>{t('proposal.proposalDuration')}</Label>
          <ColoredLabel>
            {proposalTime ? (
              duration(proposalTime?.toNumber(), 'seconds').humanize()
            ) : (
              <Loading style={{ margin: 0 }} loading text />
            )}
          </ColoredLabel>
        </Row>
        <Row>
          <Label>{t('proposal.quorum')}</Label>
          <ColoredLabel>
            {quorum != null ? (
              `${quorum}%`
            ) : (
              <Loading style={{ margin: 0 }} loading text />
            )}
          </ColoredLabel>
        </Row>
        {subdaoId && (
          <Row>
            <Label>{t('schemes.schemes_one')}</Label>
            <ColoredLabel>{shortenAddress(subdaoId)}</ColoredLabel>
          </Row>
        )}
      </SidebarCardContent>
    </SidebarCard>
  );
};

export default SidebarInfoCard;
