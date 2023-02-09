import { BigNumber, utils } from 'ethers';
import { TFunction } from 'react-i18next';
import { removeNullValues } from 'utils';
import { TokenInfoWithType, TokenType } from 'hooks/Guilds/tokens/useTokenList';

interface ValidateTokenTransferValues {
  recipientAddress: string;
  amount: any;
  token: TokenInfoWithType;
}

interface Context {
  t: TFunction;
}

const validateERC20Transfer = (
  values: ValidateTokenTransferValues,
  { t }: Context
) => {
  const { recipientAddress, amount, token } = values;
  let errors = {
    recipientAddress: null,
    amount: null,
    token: null,
  };

  if (!token) {
    errors.token = t('inputValidation.tokenIsRequired');
  } else if (
    token.type === TokenType.ERC20 &&
    !utils.isAddress(token.address)
  ) {
    errors.token = t('inputValidation.invalidTokenAddress');
  }
  if (!BigNumber.isBigNumber(amount)) {
    errors.amount = t('inputValidation.invalidAmount');
  }
  if (BigNumber.isBigNumber(amount) && amount.lte(0)) {
    errors.amount = t('inputValidation.amountCannotBeZero');
  }
  if (!utils.isAddress(recipientAddress)) {
    errors.recipientAddress = t('inputValidation.invalidRecipientAddress');
  }
  if (!recipientAddress) {
    errors.recipientAddress = t('inputValidation.recipientAddressIsRequired');
  }
  if (!amount) {
    errors.amount = t('inputValidation.amountIsRequired');
  }

  return {
    errors: removeNullValues(errors),
    values,
  };
};

export default validateERC20Transfer;
