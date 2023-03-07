import {
  Container,
  Title,
  InfoItem,
  ActionWrapper,
  CancelButton,
  ConfirmButton,
  TextContainer,
} from './ConfirmRemoveActionModal.styled';
import { Modal } from 'components/primitives/Modal';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ConfirmRemoveActionModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}
const ConfirmRemoveActionModal: React.FC<ConfirmRemoveActionModalProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      header={t('actionBuilder.action.confirmRemoval')}
      leftIcon={false}
      maxWidth={380}
    >
      <Container>
        <TextContainer>
          <Title>
            {t('actionBuilder.action.areYouSureYouWantToRemoveAction')}
          </Title>
          <InfoItem>
            {t('actionBuilder.action.theRemovalCannotBeReverted')}
          </InfoItem>
        </TextContainer>

        <ActionWrapper>
          <CancelButton onClick={onDismiss}>{t('modals.cancel')}</CancelButton>
          <ConfirmButton onClick={onConfirm}>
            {t('actionBuilder.action.removeAction')}
          </ConfirmButton>
        </ActionWrapper>
      </Container>
    </Modal>
  );
};

export default ConfirmRemoveActionModal;
