import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';
import { useHookStoreProvider } from 'stores';

type IUseIsProposalCreationAllowed =
  FetcherHooksInterface['useIsProposalCreationAllowed'];

export const useIsProposalCreationAllowed: IUseIsProposalCreationAllowed = (
  daoId,
  userAddress
) => {
  const {
    hooks: {
      fetchers: { useVotingPowerOf, useGuildConfig },
    },
  } = useHookStoreProvider();
  const { data: guildConfig } = useGuildConfig(daoId);
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
