import { Proposal } from '../types/types.guilds.d';

export function mapStructToProposal(
  proposalStruct: any,
  proposalId: string
): Proposal {
  const proposal: Proposal = {
    ...proposalStruct,
    id: proposalId,
  };
  return proposal;
}

export const getOptionLabel = ({ metadata, optionKey, t }) => {
  const metadataLabel = metadata?.voteOptions?.[optionKey];
  return metadataLabel
    ? metadataLabel
    : Number(optionKey) === 0
    ? t('actionBuilder.options.against', { defaultValue: 'Against' })
    : t('actionBuilder.options.option', { optionKey });
};
