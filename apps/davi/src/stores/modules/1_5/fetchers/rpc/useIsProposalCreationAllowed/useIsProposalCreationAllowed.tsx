import { FetcherHooksInterface } from 'stores/types';

type IUseIsProposalCreationAllowed =
  FetcherHooksInterface['useIsProposalCreationAllowed'];

// Gov 1.5 has no limitations on who can create a proposal

export const useIsProposalCreationAllowed: IUseIsProposalCreationAllowed =
  () => {
    return true;
  };
