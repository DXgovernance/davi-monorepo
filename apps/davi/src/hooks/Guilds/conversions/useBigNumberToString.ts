import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useMemo } from 'react';

export default function useBigNumberToString(
  number: BigNumber,
  decimals: number = 0
) {
  const stakeAmountParsed = useMemo(() => {
    if (!number) return null;

    let formatted = formatUnits(number, decimals);
    return formatted;
  }, [number, decimals]);

  return stakeAmountParsed;
}
