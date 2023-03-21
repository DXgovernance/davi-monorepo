import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { SidebarInfoCard } from 'components/SidebarInfoCard';
import { useHookStoreProvider } from 'stores';
import { useSearchParams } from 'react-router-dom';

const SidebarInfoCardWrapper = () => {
  const {
    hooks: {
      fetchers: { useTotalLocked, useGuildConfig },
    },
  } = useHookStoreProvider();
  const { guildId } = useTypedParams();
  const { data: config } = useGuildConfig(guildId);
  const { data: totalLocked } = useTotalLocked(guildId);
  const quorum = useVotingPowerPercent(
    config?.votingPowerForProposalExecution,
    totalLocked
  );
  const [searchParams] = useSearchParams();
  const subdaoId = searchParams.get('subdao');
  return (
    <SidebarInfoCard
      proposalTime={config?.proposalTime}
      quorum={quorum}
      subdaoId={subdaoId}
    />
  );
};

export default SidebarInfoCardWrapper;
