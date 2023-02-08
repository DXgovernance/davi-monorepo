import { BigNumber } from 'ethers';
import i18next from 'i18next';

export const isValidGuildProposal = ({
  toArray,
  dataArray,
  valueArray,
  totalOptions,
  title,
}: {
  toArray: string[];
  dataArray: string[];
  valueArray: BigNumber[];
  totalOptions: number;
  title: string;
}): { isValid: boolean; error?: string } => {
  if (!title) {
    return {
      isValid: false,
      error: i18next.t('proposal.errors.titleRequired'),
    };
  }
  if (totalOptions === 0) {
    return {
      isValid: false,
      error: i18next.t('proposal.errors.atLeastOneOptionRequired'),
    };
  }
  if (
    toArray.length === 0 ||
    dataArray.length === 0 ||
    valueArray.length === 0
  ) {
    return {
      isValid: false,
      error: i18next.t('proposal.errors.atLeastOneActionPerOptionRequired'),
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const isEnsName = (
  name: string
): { isValid: boolean; validationError: string } => {
  let isValid = true;
  let validationError = null;

  if (!name) {
    validationError = i18next.t(
      'actionBuilder.ens.validation.nameCannotBeEmpty'
    );
    isValid = false;
    return { isValid, validationError };
  }

  let labelArray = name.split('.');

  let numberOfInvalidLabels = labelArray.filter(
    element => element.length === 0
  );
  if (numberOfInvalidLabels.length > 0) {
    validationError = i18next.t(
      'actionBuilder.ens.validation.domainNameInvalidLength'
    );
    isValid = false;
  }

  if (name.includes(' ')) {
    validationError = i18next.t(
      'actionBuilder.ens.validation.domainNameCannotIncludeSpaces'
    );
    isValid = false;
  }

  if (labelArray.length > 3) {
    validationError = i18next.t(
      'actionBuilder.ens.validation.domainCannotBeMoreThanThreeLevels'
    );
    isValid = false;
  }

  return { isValid, validationError };
};

export const isIpfsHash = (
  hash: string
): { isValid: boolean; validationError: string } => {
  let isValid = true;
  let validationError = null;

  // Removed validation due to library not supporting cid v1

  return { isValid, validationError };
};
