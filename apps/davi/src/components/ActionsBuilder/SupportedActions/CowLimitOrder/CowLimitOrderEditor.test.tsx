import { BigNumber } from 'ethers';
import { render } from 'utils/tests';
import CowLimitOrderEditor from './CowLimitOrderEditor';
import { MOCK_ADDRESS } from 'hooks/Guilds/ens/fixtures';
import { limitOrderDecodedCallMock } from './fixtures';

const mockBigNumber = BigNumber.from(100000000);

jest.mock('utils', () => ({
  getNetworkById: () => ({
    nativeAsset: {
      symbol: 'TST',
    },
  }),
  usePrevious: () => undefined,
}));

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    imageUrl: 'wagmi',
  }),
}));

jest.mock('hooks/Guilds/erc20/useERC20Info', () => ({
  useERC20Info: () => ({
    name: 'Test ERC20',
    symbol: 'TEST',
    decimals: 18,
    totalSupply: mockBigNumber,
  }),
}));

jest.mock('hooks/Guilds/erc20/useAllERC20Balances', () => ({
  useAllERC20Balances: () => ({
    data: [],
  }),
}));

const mockChainId = 123456;
jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: mockChainId } }),
  useAccount: () => ({ address: MOCK_ADDRESS }),
}));

jest.mock('hooks/Guilds/tokens/useTokenList', () => ({
  useTokenList: () => ({
    tokens: [],
  }),
}));

describe('CowLimitOrderEditor', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <CowLimitOrderEditor
        decodedCall={limitOrderDecodedCallMock}
        onSubmit={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
