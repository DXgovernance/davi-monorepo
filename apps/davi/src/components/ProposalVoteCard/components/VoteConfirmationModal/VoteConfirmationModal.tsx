import {
  Container,
  Title,
  InfoItem,
  Widget,
  InfoRow,
  InfoLabel,
  InfoValue,
  ActionWrapper,
  CancelButton,
  ConfirmButton,
} from './VoteConfirmationModal.styled';
import { Modal } from 'components/primitives/Modal';
import React from 'react';
import { VoteConfirmationModalProps } from '../../types';
import { useTranslation } from 'react-i18next';

const VoteConfirmationModal: React.FC<VoteConfirmationModalProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
  selectedOption,
  votingPower,
  currentVoteAmount,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      header="Confirm Vote"
      leftIcon={false}
      maxWidth={380}
    >
      <Container>
        <Title>{t('voting.voteQuestion', { action: selectedOption })}</Title>
        <InfoItem>{t('voting.noRevertAction')}</InfoItem>

        <Widget>
          <InfoRow>
            <InfoLabel>
              {t('actionBuilder.options.option', { optionKey: '' })}
            </InfoLabel>
            <InfoValue>{selectedOption}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{t('voting.votingPower')}</InfoLabel>
            <InfoValue>{votingPower}%</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{t('voting.voteImpact')}</InfoLabel>
            <InfoValue>
              <InfoValue grey> {currentVoteAmount}% </InfoValue>
              {`-->  ${votingPower + currentVoteAmount}%`}
            </InfoValue>
          </InfoRow>
        </Widget>
        <ActionWrapper>
          <CancelButton onClick={onDismiss}>{t('modals.cancel')}</CancelButton>
          <ConfirmButton variant="primaryWithBorder" onClick={onConfirm}>
            {t('voting.vote')}
          </ConfirmButton>
        </ActionWrapper>
      </Container>
    </Modal>
  );
};

export default VoteConfirmationModal;
