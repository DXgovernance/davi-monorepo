import { ProposalDescriptionWrapper } from './ProposalDescription.styled';
import { ProposalDescriptionProps } from './types';
import { Loading } from 'components/primitives/Loading';
import { useTranslation } from 'react-i18next';
import { Interweave } from 'interweave';
import { GlobalErrorBoundary } from 'components/ErrorBoundary';
import isHtml from 'is-html';
import Markdown from 'markdown-to-jsx';
import { useMemo } from 'react';

export const ProposalDescription: React.FC<ProposalDescriptionProps> = ({
  metadata,
  error,
}) => {
  const { t } = useTranslation();
  const isDescriptionHtml = useMemo(
    () => isHtml(metadata?.description || ''),
    [metadata]
  );

  if (error) {
    return (
      <ProposalDescriptionWrapper>
        {t('proposal.errors.proposalDescriptionError')}
      </ProposalDescriptionWrapper>
    );
  }

  return (
    <ProposalDescriptionWrapper>
      <GlobalErrorBoundary>
        {metadata?.description ? (
          isDescriptionHtml ? (
            <Interweave content={metadata.description} />
          ) : (
            <Markdown
              children={metadata?.description}
              options={{
                disableParsingRawHTML: true,
                overrides: {
                  a: {
                    props: {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                  },
                },
              }}
            />
          )
        ) : (
          <Loading loading text skeletonProps={{ width: '100%' }} />
        )}
      </GlobalErrorBoundary>
    </ProposalDescriptionWrapper>
  );
};
