import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useMemo } from 'react';

export default function useBigNumberToNumber(
  number: BigNumber,
  decimals: number,
  precision: number = 2
) {
  // I don't think we need to memoize this function
  // TODO: check if this is true
  const stakeAmountParsed = useMemo(
    () => bigNumberToNumber(number, decimals, precision),
    [number, decimals, precision]
  );

  return stakeAmountParsed;
}

export function bigNumberToNumber(
  number: BigNumber,
  decimals: number,
  precision: number = 2
) {
  if (!number || decimals === null || decimals === undefined) return null;

  let formatted = Number.parseFloat(formatUnits(number, decimals));
  return (
    Math.round(formatted * Math.pow(10, precision)) / Math.pow(10, precision)
  );
}
