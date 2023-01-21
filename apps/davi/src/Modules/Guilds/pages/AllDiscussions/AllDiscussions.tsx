import { useTranslation } from 'react-i18next';
import { Flex } from 'components/primitives/Layout';
import { useTypedParams } from '../../Hooks/useTypedParams';
import { StyledLink } from 'components/primitives/Links';
import { Button } from 'components/primitives/Button';
import { ProposalsList } from './AllDiscussions.styled';
import Discussions from 'Modules/Social/Discussions';

const AllDiscussions = ({ guildId }) => {
  const { t } = useTranslation();
  const { chainName } = useTypedParams();

  return (
    <>
      <Flex direction="row" justifyContent="right">
        <StyledLink to={`/${chainName}/${guildId}/create`}>
          <Button variant="terciary" data-testid="create-discussion-button">
            {t('forum.createDiscussion')}
          </Button>
        </StyledLink>
      </Flex>
      <ProposalsList>
        <Discussions />
      </ProposalsList>
    </>
  );
};

export default AllDiscussions;
