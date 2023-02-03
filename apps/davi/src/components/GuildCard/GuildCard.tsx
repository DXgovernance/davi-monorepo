import { StyledLink } from 'components/primitives/Links';
import { Flex } from 'components/primitives/Layout';
import { Card } from 'components/Card';
import { cardWrapperStyles } from './GuildCard.styled';
import { GuildCardProps } from './types';
import { GuildCardHeader, GuildCardContent } from './components';
import { Result, ResultState } from 'components/Result';

export const GuildCard: React.FC<GuildCardProps> = ({
  isLoading,
  isUnmatched,
  guildAddress,
  numberOfMembers,
  t,
  numberOfActiveProposals,
  ensName,
  data,
}) => {
  if (isUnmatched) {
    return (
      <Card customStyles={cardWrapperStyles}>
        <Result state={ResultState.ERROR} title={t('unknownDAO')} />
      </Card>
    );
  }

  return (
    <StyledLink data-testid="guildCard" to={guildAddress || '#'}>
      <Flex>
        <Card customStyles={cardWrapperStyles}>
          <GuildCardHeader
            isLoading={isLoading}
            numberOfMembers={numberOfMembers}
            t={t}
            numberOfActiveProposals={numberOfActiveProposals}
          />
          <GuildCardContent
            isLoading={isLoading}
            ensName={ensName}
            data={data}
          />
        </Card>
      </Flex>
    </StyledLink>
  );
};
