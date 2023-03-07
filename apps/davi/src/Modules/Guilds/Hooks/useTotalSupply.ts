import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { DecodedCall } from 'components/ActionsBuilder/types';

interface IUseTotalSupply {
  decodedCall: DecodedCall;
}

interface RepMintState {
  toAddress: string;
  amount: BigNumber;
}

export const useTotalSupply = ({ decodedCall }: IUseTotalSupply) => {
  const parsedData = useMemo<RepMintState>(() => {
    if (!decodedCall) return null;
    return {
      toAddress: decodedCall.args.account,
      amount: decodedCall.args.amount,
    };
  }, [decodedCall]);

  return {
    data: parsedData,
  };
};
