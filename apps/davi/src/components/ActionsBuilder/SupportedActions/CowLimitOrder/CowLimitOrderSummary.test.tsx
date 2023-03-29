import { BigNumber } from 'ethers';
import { render } from 'utils/tests';
import { mockChain } from 'components/Web3Modals/fixtures';
import { limitOrderDecodedCallMock } from './fixtures';
import CowLimitOrderSummary from './CowLimitOrderSummary';

const mockBigNumber = BigNumber.from(100000000);

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
  useEnsName: () => ({
    data: 'name.eth',
  }),
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
  }),
  useContractReads: () => ({
    data: [{}],
  }),
}));

jest.mock('provider', () => ({
  getBlockExplorerUrl: () => null,
}));

describe('CowLimitOrderSummary', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <CowLimitOrderSummary decodedCall={limitOrderDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
  it('Should match snapshot without data', () => {
    const { container } = render(<CowLimitOrderSummary decodedCall={null} />);
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot with default values', () => {
    const { container } = render(
      <CowLimitOrderSummary decodedCall={limitOrderDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
});
