import { TFunction } from 'react-i18next';
import { utils } from 'ethers';
import { removeNullValues } from 'utils';

interface validateRepMintValues {
  repPercent: string;
  recipient: string;
}

interface Context {
  t: TFunction;
}

const validateRepMint = (values: validateRepMintValues, { t }: Context) => {
  const repPercent = Number(values.repPercent || 0);
  const { recipient } = values;
  let errors = {
    repPercent: null,
    recipient: null,
  };

  if (repPercent > 100) {
    errors.repPercent = t('inputValidation.reputationPercentageTooHigh');
  }

  if (repPercent === 0) {
    errors.repPercent = t('inputValidation.reputationPercentIsRequired');
  }

  if (!utils.isAddress(recipient)) {
    errors.recipient = t('inputValidation.invalidRecipientAddress');
  }
  if (!recipient) {
    errors.recipient = t('inputValidation.recipientAddressIsRequired');
  }

  return {
    errors: removeNullValues(errors),
    values,
  };
};

export default validateRepMint;
