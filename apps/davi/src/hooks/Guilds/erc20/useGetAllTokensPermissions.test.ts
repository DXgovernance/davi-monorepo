import { renderHook } from '@testing-library/react';
import { ZERO_ADDRESS } from 'utils';
import { useGetAllTokensPermissions } from './useGetAllTokensPermissions';

jest.mock('stores', () => ({
  useHookStoreProvider: () => ({
    hooks: {
      fetchers: {
        useGuildConfig: () => ({ data: '' }),
      },
    },
  }),
}));

jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: 1 } }),
  chain: {
    mainnet: {},
  },
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
  }),
  useContractReads: () => ({
    data: [
      {
        0: {
          type: 'BigNumber',
          hex: '0x00',
        },
        1: {
          type: 'BigNumber',
          hex: '0x00',
        },
        fromTime: {
          type: 'BigNumber',
          hex: '0x00',
        },
        valueAllowed: {
          type: 'BigNumber',
          hex: '0x00',
        },
      },
    ],
  }),
  useContractRead: () => ({
    data: {
      0: {
        type: 'BigNumber',
        hex: '0x00',
      },
      1: {
        type: 'BigNumber',
        hex: '0x00',
      },
      fromTime: {
        type: 'BigNumber',
        hex: '0x00',
      },
      valueAllowed: {
        type: 'BigNumber',
        hex: '0x00',
      },
    },
  }),
}));

jest.mock('hooks/Guilds/tokens/useTokenList', () => ({
  useTokenList: () => ({
    tokens: [
      {
        type: 'NATIVE',
        name: 'xDAI',
        symbol: 'DAI',
        address: null,
        chainId: 100,
        decimals: 18,
        logoURI:
          'http://localhost:3000/static/media/gnosis-icon-green.90512ab9f6bb0735cf52d3288bc6e66e.svg',
      },
      {
        chainId: 100,
        address: '0xb90D6bec20993Be5d72A5ab353343f7a0281f158',
        name: 'DXdao on xDai',
        decimals: 18,
        symbol: 'DXD',
        logoURI:
          'https://s2.coinmarketcap.com/static/img/coins/200x200/5589.png',
        type: 'ERC20',
      },
    ],
  }),
}));

describe('useGetAllTokensPermissions', () => {
  it('should return both native and ERC20 data by default', async () => {
    const { result } = renderHook(() =>
      useGetAllTokensPermissions(ZERO_ADDRESS)
    );

    expect(result.current.data.length).toEqual(2);
  });

  it('should return only ERC20 token data if includeNativeToken is false', async () => {
    const { result } = renderHook(() =>
      useGetAllTokensPermissions(ZERO_ADDRESS, false)
    );

    expect(result.current.data.length).toEqual(1);
  });
});
