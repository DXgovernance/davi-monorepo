import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useMemo } from 'react';

export default function useBigNumberToString(
  number: BigNumber,
  decimals: number = 0
) {
  const stakeAmountParsed = useMemo(
    () => bigNumberToString(number, decimals),
    [number, decimals]
  );

  return stakeAmountParsed;
}

export function bigNumberToString(number: BigNumber, decimals: number = 0) {
  if (!number) return null;
  let formatted = formatUnits(number, decimals);
  return formatted;
}
