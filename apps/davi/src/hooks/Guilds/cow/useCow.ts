import { useState } from 'react';
import { useNetwork } from 'wagmi';
import { BigNumber, FixedNumber } from 'ethers';
import moment from 'moment';
import { COW_CONFIG } from './config';

export interface CowSwapQuote {
  sellToken: string;
  buyToken: string;
  sellAmount: string;
  buyAmount: string;
  deadLine: number;
  feeAmount: string;
  receiver: string;
}

export const useCow = () => {
  const { chain } = useNetwork();
  const [error, setError] = useState('');

  const getQuote = async (params: Partial<CowSwapQuote>) => {
    setError('');
    try {
      const res = await fetch(`${COW_CONFIG[chain?.id]}/api/v1/quote`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          kind: 'sell',
          buyToken: params.buyToken,
          sellToken: params.sellToken,
          validTo: Math.round(moment().add(60, 'minutes').valueOf() / 1000),
          sellAmountBeforeFee: BigNumber.from(params.sellAmount).toString(),
          from: params.receiver,
          receiver: params.receiver,
        }),
      });

      if (!res?.ok) {
        const data = await res.json();
        setError(data?.description ?? 'Error getting quote');
        return;
      }

      const data = await res.json();

      return data?.quote;
    } catch (err: any) {
      setError(err?.message ?? 'Error getting quote');
    }
  };

  const createOrder = async (quote: CowSwapQuote) => {
    const {
      sellToken,
      buyToken,
      deadLine,
      buyAmount,
      sellAmount,
      receiver,
      feeAmount,
    } = quote;

    setError('');

    const order = {
      kind: 'sell',
      receiver,
      sellToken,
      buyToken,
      partiallyFillable: false, // ("false" would be for a "Fill or Kill" order, "true" for allowing "Partial execution" which is not supported yet)
      validTo: deadLine ?? Math.round(moment().add(7, 'days').valueOf() / 1000),
      sellAmount,
      buyAmount,
      feeAmount,
      appData:
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      signingScheme: 'presign', // Placing an unsigned order
      signature: '0x',

      from: quote.receiver,
    };

    try {
      const res = await fetch(`${COW_CONFIG[chain?.id]}/api/v1/orders`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      return await res.json();
    } catch (err: any) {
      setError(err?.message ?? 'Error creating order');
    }
  };

  const getOrder = async (orderId: string) => {
    try {
      setError('');
      const res = await fetch(
        `${COW_CONFIG[chain?.id]}/api/v1/orders/${orderId}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      return await res.json();
    } catch (err: any) {
      setError(err?.message ?? 'Error creating order');
    }
  };

  const getNativePrice = async (tokenAddress: string, decimals: number) => {
    if (!tokenAddress) return 0;
    try {
      setError('');
      const res = await fetch(
        `${COW_CONFIG[chain?.id]}/api/v1/token/${tokenAddress}/native_price`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      
      const response = await res.json();

      if(!res?.ok) {
        throw new Error(response?.description);
      }

      const priceStrigified = response?.price?.toString();

      // Convert to fixed number
      const price = FixedNumber.from(priceStrigified);

      // Adjust for decimals (some tokens use 18 some 6, USDC for example uses 6)
      const adjustedPrice = price.divUnsafe(FixedNumber.from(10 ** (18 - decimals))).round(6).toString();

      return adjustedPrice;
    } catch (err: any) {
      setError(err?.message ?? 'Error creating order');
      return 0;
    }
  };

  return {
    getQuote,
    createOrder,
    error,
    getOrder,
    getNativePrice,
  };
};
