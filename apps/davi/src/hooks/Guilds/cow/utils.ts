import { GNOSIS_ID, LOCALHOST_ID, MAINNET_ID } from 'utils';

export const isAvailableOnCow = (chainId: number) => {
  return [MAINNET_ID, GNOSIS_ID, LOCALHOST_ID].includes(chainId);
};
