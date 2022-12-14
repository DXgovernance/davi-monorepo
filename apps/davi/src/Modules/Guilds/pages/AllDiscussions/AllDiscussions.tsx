/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from 'components/primitives/Layout';
import { useTranslation } from 'react-i18next';
import { useTypedParams } from '../../Hooks/useTypedParams';
import { UnstyledLink } from 'components/primitives/Links';
import { Button } from 'components/primitives/Button';
import { ProposalsList } from './AllDiscussions.styled';
import Discussions from 'Modules/Social/Discussions';
import useIsProposalCreationAllowed from 'Modules/Guilds/Hooks/useIsProposalCreationAllowed';

const AllDiscussions = ({ guildId }) => {
  const { t } = useTranslation();
  const { chainName } = useTypedParams();
  const isProposalCreationAllowed = useIsProposalCreationAllowed();

  return (
    <>
      <Flex direction="row" justifyContent="right">
        {isProposalCreationAllowed && (
          <UnstyledLink to={`/${chainName}/${guildId}/create`}>
            <Button variant="secondary" data-testid="create-discussion-button">
              {t('forum.createDiscussion')}
            </Button>
          </UnstyledLink>
        )}
      </Flex>
      <ProposalsList>
        <Discussions />
      </ProposalsList>
    </>
  );
};

export default AllDiscussions;
