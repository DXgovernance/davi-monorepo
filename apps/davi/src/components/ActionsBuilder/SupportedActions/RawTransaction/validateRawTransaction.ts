import { BigNumber } from 'ethers';
import { TFunction } from 'react-i18next';
import { hexStripZeros, isHexString } from 'ethers/lib/utils';
import { isAddress, removeNullValues } from 'utils';
import { RawTransactionValues } from './types';

interface Context {
  t: TFunction;
}

const validateRawTransaction = (
  values: RawTransactionValues,
  { t }: Context
) => {
  const { to, value, data } = values;

  let errors = {
    to: null,
    value: null,
    data: null,
  };

  const checkValueEmpty = (value: BigNumber) => {
    const noValue = !value;
    if (noValue) return true;
    if (BigNumber.isBigNumber(value) && value.toString() === '0') return true;
    return false;
  };

  const checkDataEmpty = (data: string) => {
    if (!data) return true;
    if (isHexString(data) && hexStripZeros(data) === '0x') return true;
    return false;
  };

  const isValueEmpty = checkValueEmpty(value);
  const isDataEmpty = checkDataEmpty(data);

  // Data validations
  if (isValueEmpty) {
    if (!data) {
      errors.data = t('inputValidation.eitherDataOrValueRequired');
    } else if (!isHexString(data)) {
      errors.data = t('inputValidation.dataIsNotAHexString');
    } else if (hexStripZeros(data) === '0x') {
      errors.data = t('inputValidation.eitherDataOrValueRequired');
    } else if (data.length % 2 !== 0) {
      errors.data = t('inputValidation.dataIsOddLength');
    }
  } else if (data) {
    if (!isHexString(data)) {
      errors.data = t('inputValidation.dataIsNotAHexString');
    } else if (data.length % 2 !== 0) {
      errors.data = t('inputValidation.dataIsOddLength');
    }
  }

  // Value validations
  if (isDataEmpty) {
    if (!value) {
      errors.value = t('inputValidation.eitherDataOrValueRequired');
    } else if (!BigNumber.isBigNumber(value)) {
      errors.value = t('inputValidation.invalidValue');
    } else if (value.toString() === '0') {
      errors.value = t('inputValidation.eitherDataOrValueRequired');
    }
  } else if (value) {
    if (!BigNumber.isBigNumber(value)) {
      errors.value = t('inputValidation.invalidValue');
    }
  }

  if (!to) {
    errors.to = t('inputValidation.addressIsRequired');
  } else if (!isAddress(to)) {
    errors.to = t('inputValidation.invalidAddress');
  }

  return {
    errors: removeNullValues(errors),
    values,
  };
};

export default validateRawTransaction;
