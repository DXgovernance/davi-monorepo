import { BigNumber } from 'ethers';

const truncateNumber = (number: number, decimals: number): number => {
  if (Number.isInteger(number)) return number;

  const stringResult = number.toString();
  const dotPosition = stringResult.indexOf('.');

  return Number(stringResult.slice(0, dotPosition + decimals + 1));
};

const getAmountOfDecimalPlaces = (number: number): number => {
  if (Number.isInteger(number)) return 0;
  const numberString = number.toString();
  const dotPosition = numberString.indexOf('.');
  const numberOfDecimals = numberString.length - dotPosition - 1;
  return numberOfDecimals;
};

// Used to calculate percentages of big numbers due to decimal limitation for things like voting power
export function getBigNumberPercentage(
  amount: BigNumber,
  totalAmount: BigNumber,
  decimals: number = 2
) {
  if (!amount || !totalAmount) return null;
  if (totalAmount.isZero()) return 0;

  const percent = amount
    .mul(100)
    .mul(Math.pow(10, decimals + 1))
    .div(totalAmount);

  let result = Math.round(percent.toNumber()) / Math.pow(10, decimals + 1);

  const numberOfDecimals = getAmountOfDecimalPlaces(result);
  if (numberOfDecimals < decimals + 1) return result;

  const lastDigit = parseInt(result.toString().slice(-1));
  if (lastDigit >= 5) result += 1 / Math.pow(10, decimals);

  return truncateNumber(result, decimals);
}
