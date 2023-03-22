import { mockChain } from 'components/Web3Modals/fixtures';
import { BigNumber } from 'ethers';
import { render } from 'utils/tests';
import CowLimitOrderInfoLine from './CowLimitOrderInfoLine';
import { limitOrderDecodedCallMock } from './fixtures';

const mockBigNumber = BigNumber.from(100000000);

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
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

jest.mock('wagmi', () => ({
  useContractRead: () => ({ data: '' }),
  useNetwork: () => ({ chain: mockChain, chains: [mockChain] }),
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
      contentHash: '0x0',
    },
  }),
}));

describe('CowLimitOrderInfoLine', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <CowLimitOrderInfoLine decodedCall={limitOrderDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
});
