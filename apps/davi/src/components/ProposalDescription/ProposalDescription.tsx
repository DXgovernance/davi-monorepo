import {
  ButtonContainer,
  ProposalDescriptionContainer,
  ProposalDescriptionOverlay,
  ProposalDescriptionWrapper,
} from './ProposalDescription.styled';
import { ProposalDescriptionProps } from './types';
import { Loading } from 'components/primitives/Loading';
import { useTranslation } from 'react-i18next';
import { Interweave } from 'interweave';
import { GlobalErrorBoundary } from 'components/ErrorBoundary';
import { useCallback, useMemo, useState } from 'react';
import { Button } from 'components/primitives/Button';

export const ProposalDescription: React.FC<ProposalDescriptionProps> = ({
  metadata,
  error,
}) => {
  const { t } = useTranslation();
  const [descriptionHeight, setDescriptionHeight] = useState<number>();
  const [windowHeight, setWindowHeight] = useState<number>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const ref = useCallback(
    node => {
      if (node !== null) {
        setDescriptionHeight(node.getBoundingClientRect().height);
        setWindowHeight(window.innerHeight);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [metadata?.description]
  );

  const showMoreVisibility: boolean =
    useMemo(() => {
      if (!windowHeight || !descriptionHeight) {
        return 0;
      }

      return Math.ceil((descriptionHeight / windowHeight) * 100);
    }, [windowHeight, descriptionHeight]) >= 40;

  if (error) {
    return (
      <ProposalDescriptionWrapper>
        {t('proposal.errors.proposalDescriptionError')}
      </ProposalDescriptionWrapper>
    );
  }

  const toggleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ProposalDescriptionWrapper data-testid="discussion-page-description">
      <GlobalErrorBoundary>
        <>
          {metadata?.description ? (
            <ProposalDescriptionContainer
              ref={ref}
              showHandler={showMoreVisibility}
              disabled={isExpanded}
            >
              <Interweave content={metadata.description} />

              {showMoreVisibility && (
                <>
                  <ProposalDescriptionOverlay disabled={isExpanded} />
                  <ButtonContainer
                    position={isExpanded ? 'relative' : 'absolute'}
                  >
                    <Button
                      variant="primaryWithBorder"
                      data-testid="show-more-button"
                      onClick={toggleShowMore}
                    >
                      {isExpanded ? t('showLess') : t('showMore')}
                    </Button>
                  </ButtonContainer>
                </>
              )}
            </ProposalDescriptionContainer>
          ) : (
            <Loading loading text skeletonProps={{ width: '100%' }} />
          )}
        </>
      </GlobalErrorBoundary>
    </ProposalDescriptionWrapper>
  );
};
