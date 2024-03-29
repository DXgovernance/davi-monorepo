import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { GuildSidebar } from 'components/GuildSidebar';
import { MemberActions } from 'components/GuildSidebar/MemberActions';
import { GuestActions } from 'components/GuildSidebar/GuestActions';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { useState } from 'react';
import { WalletModal } from 'components/Web3Modals';
import StakeTokensModalWrapper from './StakeTokensModalWrapper';
import { useAccount } from 'wagmi';
import { isReadOnly } from 'provider/wallets';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { useHookStoreProvider } from 'stores';

const GuildSidebarWrapper = () => {
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const {
    hooks: {
      writers: { useWithdrawTokens },
      fetchers: {
        useTotalLocked,
        useVotingPowerOf,
        useVoterLockTimestamp,
        useMemberCount,
        useGuildConfig,
      },
    },
  } = useHookStoreProvider();

  const { guildId: guildAddress } = useTypedParams();
  const { data: guildConfig } = useGuildConfig(guildAddress);
  const { isRepGuild } = useGuildImplementationType(guildAddress);
  const { data: guildToken } = useERC20Info(guildConfig?.token);
  const { data: numberOfMembers } = useMemberCount(guildAddress);

  const { address: userAddress, connector } = useAccount();
  const { ensName, imageUrl } = useENSAvatar(userAddress);
  const { data: unlockedAt } = useVoterLockTimestamp(guildAddress, userAddress);
  const { data: userVotingPower } = useVotingPowerOf({
    contractAddress: guildAddress,
    userAddress,
  });
  const { data: totalLocked } = useTotalLocked(guildAddress);
  const votingPowerPercent = useVotingPowerPercent(
    userVotingPower,
    totalLocked
  );
  const withdrawTokens = useWithdrawTokens(guildAddress);

  const handleWithdrawTokens = async () => {
    withdrawTokens(userVotingPower, guildToken?.decimals, guildToken?.symbol);
  };

  return (
    <>
      <GuildSidebar
        guildName={guildConfig?.name}
        numberOfMembers={numberOfMembers}
        actions={
          userVotingPower && !userVotingPower?.isZero() ? (
            <MemberActions
              guildToken={guildToken}
              isRepGuild={isRepGuild}
              userWalletAddress={userAddress}
              userEnsAvatar={{ ensName, imageUrl }}
              userVotingPower={userVotingPower}
              userVotingPowerPercent={votingPowerPercent}
              unlockedAt={unlockedAt}
              onWithdraw={handleWithdrawTokens}
              onShowStakeModal={() => setIsStakeModalOpen(true)}
            />
          ) : (
            <GuestActions
              userWalletAddress={isReadOnly(connector) ? null : userAddress}
              onShowStakeModal={() => setIsStakeModalOpen(true)}
              onShowWalletModal={() => setIsWalletModalOpen(true)}
            />
          )
        }
      />

      <StakeTokensModalWrapper
        isOpen={isStakeModalOpen}
        onDismiss={() => setIsStakeModalOpen(false)}
      />

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};

export default GuildSidebarWrapper;
