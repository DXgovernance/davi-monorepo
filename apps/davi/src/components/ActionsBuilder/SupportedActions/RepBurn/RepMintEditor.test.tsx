import { BigNumber } from 'ethers';
import { render } from 'utils/tests';
import { repMintEmptyDecodedCallMock } from './fixtures';
import { Burn } from './RepBurnEditor';
import { MOCK_ADDRESS, MOCK_ENS_NAME } from 'hooks/Guilds/ens/fixtures';

const mockBigNumber = BigNumber.from(0);

jest.mock('contexts/Guilds/orbis', () => ({}));

jest.mock('stores', () => ({
  useHookStoreProvider: () => ({
    hooks: {
      fetchers: {
        useVotingPowerOf: () => ({
          data: '0x0000',
        }),
      },
    },
  }),
}));

jest.mock('Modules/Guilds/Hooks/useTypedParams', () => ({
  useTypedParams: () => ({
    guildId: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2',
  }),
}));

jest.mock('Modules/Guilds/Hooks/useTotalSupply', () => ({
  useTotalSupply: () => ({
    parsedData: {
      toAddress: '0x0000000000000000000000000000000000000000',
      amount: mockBigNumber,
    },
  }),
}));

jest.mock('Modules/Guilds/Hooks/useTokenData', () => ({
  useTokenData: () => ({
    tokenData: {
      symbol: 'REP',
      decimals: 18,
      name: 'Reputation',
      address: '0x0000000000000000000000000000000000000000',
      totalSupply: mockBigNumber,
    },
  }),
}));

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

const mockChainId = 123456;
jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: mockChainId } }),
  useAccount: () => ({ address: MOCK_ADDRESS }),
}));

jest.mock('hooks/Guilds/ens/useENS', () => ({
  __esModule: true,
  default: (value: string) => {
    if (value === MOCK_ENS_NAME || value === MOCK_ADDRESS) {
      return { name: MOCK_ENS_NAME, address: MOCK_ADDRESS };
    } else {
      return { name: null, address: value };
    }
  },
}));

describe('RepMintEditor', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <Burn
        decodedCall={repMintEmptyDecodedCallMock}
        updateCall={jest.fn()}
        onSubmit={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
