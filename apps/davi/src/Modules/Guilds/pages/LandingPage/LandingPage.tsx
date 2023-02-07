import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGuildRegistry } from 'Modules/Guilds/Hooks/useGuildRegistry';
import { GuildCard } from 'components/GuildCard/GuildCard';
import useENSNameFromAddress from 'hooks/Guilds/ens/useENSNameFromAddress';
import { CardsContainer } from './LandingPage.styled';
import { HookStoreProvider, useHookStoreProvider } from 'stores';
import { Result, ResultState } from 'components/Result';

const GuildCardLoader = () => {
  return (
    <GuildCard
      isLoading={true}
      guildAddress={null}
      numberOfMembers={null}
      t={null}
      numberOfActiveProposals={null}
      ensName={null}
      data={null}
    />
  );
};

const GuildCardUnmatched = () => {
  const { t } = useTranslation();
  return (
    <GuildCard
      isUnmatched={true}
      isLoading={false}
      guildAddress={null}
      numberOfMembers={null}
      t={t}
      numberOfActiveProposals={null}
      ensName={null}
      data={null}
    />
  );
};

const GuildCardWithContent = ({ guildAddress, t }) => {
  const {
    hooks: {
      fetchers: { useGuildConfig, useGetActiveProposals, useMemberCount },
    },
  } = useHookStoreProvider();
  const { data: guildConfig } = useGuildConfig(guildAddress);

  const { data: numberOfMembers } = useMemberCount(guildAddress);
  const { data: numberOfActiveProposals } = useGetActiveProposals(guildAddress);
  const ensName = useENSNameFromAddress(guildAddress)?.ensName?.split('.')[0];

  return (
    <GuildCard
      guildAddress={guildAddress}
      numberOfMembers={numberOfMembers}
      t={t}
      numberOfActiveProposals={numberOfActiveProposals}
      ensName={ensName}
      data={guildConfig}
    />
  );
};

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: allGuilds, error, isLoading } = useGuildRegistry();

  const EmptyGuilds = () => {
    return <h1>{t('noGuildsRegistered')}</h1>;
  };

  if (error) {
    return (
      <Result
        state={ResultState.ERROR}
        title={t('errorLoadingDAOsList')}
        subtitle={error?.message}
      />
    );
  }

  if (isLoading || !allGuilds) {
    return (
      <CardsContainer>
        <GuildCardLoader />
        <GuildCardLoader />
        <GuildCardLoader />
      </CardsContainer>
    );
  }

  if (allGuilds.length === 0) {
    return <EmptyGuilds />;
  }

  return (
    <>
      <CardsContainer>
        {error ? (
          <>{/* Render error state */}</>
        ) : (
          allGuilds.map(guildAddress => (
            <HookStoreProvider
              key={guildAddress}
              daoId={guildAddress}
              loadingIndicator={<GuildCardLoader />}
              matchErrorIndicator={<GuildCardUnmatched />}
            >
              <GuildCardWithContent guildAddress={guildAddress} t={t} />
            </HookStoreProvider>
          ))
        )}
      </CardsContainer>
    </>
  );
};

export default LandingPage;
