import { useMemo } from 'react';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { FetcherHooksInterface } from 'stores/types';
import { useHookStoreProvider } from 'stores';

type IUseIsProposalCreationAllowed =
  FetcherHooksInterface['useIsProposalCreationAllowed'];

export const useIsProposalCreationAllowed: IUseIsProposalCreationAllowed = (
  daoId,
  userAddress
) => {
  const { data: guildConfig } = useGuildConfig(daoId);

  const {
    hooks: {
      fetchers: { useVotingPowerOf },
    },
  } = useHookStoreProvider();

  const { data: votingPower } = useVotingPowerOf({
    contractAddress: daoId,
    userAddress,
  });

  const isProposalCreationAllowed = useMemo(() => {
    if (!guildConfig?.votingPowerForProposalCreation || !votingPower) {
      return false;
    }
    if (votingPower.gte(guildConfig.votingPowerForProposalCreation)) {
      return true;
    }
    return false;
  }, [votingPower, guildConfig]);

  return isProposalCreationAllowed;
};
