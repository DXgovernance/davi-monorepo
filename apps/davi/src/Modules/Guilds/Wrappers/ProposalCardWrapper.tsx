import { useTypedParams } from '../Hooks/useTypedParams';
import { ProposalCard } from 'components/ProposalCard';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { MAINNET_ID } from 'utils/constants';
import { useFilter } from 'contexts/Guilds/filters';
import { useAccount } from 'wagmi';
import { useHookStoreProvider } from 'stores';

interface ProposalCardWrapperProps {
  proposalId?: `0x${string}`;
}
const ProposalCardWrapper: React.FC<ProposalCardWrapperProps> = ({
  proposalId,
}) => {
  const {
    hooks: {
      fetchers: {
        useProposal,
        useProposalVotesOfVoter,
        useProposalState,
        useTimeDetail,
      },
    },
  } = useHookStoreProvider();
  const { guildId, chainName } = useTypedParams();
  const { data: proposal } = useProposal(guildId, proposalId);
  const ensAvatar = useENSAvatar(proposal?.creator, MAINNET_ID);
  const status = useProposalState(proposal);
  const { withFilters } = useFilter();
  const options = proposal?.options;
  const { address } = useAccount();
  const { data: proposalVotesOfVoter } = useProposalVotesOfVoter(
    guildId,
    proposalId,
    address
  );

  const endTime = useTimeDetail(guildId, status, proposal?.endTime);

  return withFilters(
    <ProposalCard
      proposal={{
        ...proposal,
        id: proposalId,
        votesOfVoter: proposalVotesOfVoter,
      }}
      ensAvatar={ensAvatar}
      href={
        proposalId ? `/${chainName}/${guildId}/proposal/${proposalId}` : null
      }
      statusProps={{
        status,
        endTime: endTime,
      }}
      address={address}
    />
  )(proposal, status, options);
};

export default ProposalCardWrapper;
