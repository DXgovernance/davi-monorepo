import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { SidebarInfoCard } from 'components/SidebarInfoCard';
import { useHookStoreProvider } from 'stores';

const SidebarInfoCardWrapper = () => {
  const {
    hooks: {
      fetchers: { useTotalLocked },
    },
  } = useHookStoreProvider();
  const { guildId } = useTypedParams();
  const { data: config } = useGuildConfig(guildId);
  const { data: totalLocked } = useTotalLocked(guildId);
  const quorum = useVotingPowerPercent(
    config?.votingPowerForProposalExecution,
    totalLocked
  );
  return (
    <SidebarInfoCard proposalTime={config?.proposalTime} quorum={quorum} />
  );
};

export default SidebarInfoCardWrapper;
