import { BigNumber, utils } from 'ethers';
import { FieldError } from 'react-hook-form';
import { TFunction } from 'react-i18next';
import { removeNullValues } from 'utils';

export interface ValidateLimitOrderValues {
  buyToken: string;
  sellToken: string;
  sellAmount: any;
  unitBuyPrice: any;
}

interface Context {
  t: TFunction;
}

const validateLimitOrder = (
  values: ValidateLimitOrderValues,
  { t }: Context
) => {
  const { buyToken, sellToken, sellAmount } = values;
  let errors: Record<string, FieldError> = {
    buyToken: { type: null, message: null },
    sellToken: { type: null, message: null },
    sellAmount: { type: null, message: null },
  };

  let hasErrors = false;

  if (!buyToken) {
    errors.buyToken.message = t('inputValidation.buyTokenIsRequired');
    hasErrors = true;
  } else if (!utils.isAddress(buyToken)) {
    errors.buyToken.message = t('inputValidation.invalidBuyTokenAddress');
    hasErrors = true;
  }

  if (!sellToken) {
    errors.sellToken.message = t('inputValidation.sellTokenIsRequired');
    hasErrors = true;
  } else if (!utils.isAddress(sellToken)) {
    errors.sellToken.message = t('inputValidation.invalidSellTokenAddress');
    hasErrors = true;
  }

  if (buyToken === sellToken) {
    errors.buyToken.message = t(
      'inputValidation.buyAndSellTokensCannotBeTheSame'
    );
    hasErrors = true;
  }

  if (!sellAmount) {
    errors.sellAmount.message = t('inputValidation.sellAmountIsRequired');
    hasErrors = true;
  }

  if (!BigNumber.isBigNumber(sellAmount)) {
    errors.sellAmount.message = t('inputValidation.invalidSellAmount');
    hasErrors = true;
  }
  if (BigNumber.isBigNumber(sellAmount) && sellAmount.lte(0)) {
    errors.sellAmount.message = t('inputValidation.sellAmountCannotBeZero');
    hasErrors = true;
  }

  if (!hasErrors) {
    errors = null;
  }

  return {
    errors: removeNullValues(errors) as {
      type: string | null;
      message: string | null;
    }[],
    values,
  };
};

export default validateLimitOrder;