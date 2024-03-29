import { mockBigNumber } from 'components/ActionsBuilder/SupportedActions/SetGuildConfig/fixtures';
import { MOCK_ENS_NAME, MOCK_IMAGE_URL } from 'hooks/Guilds/ens/fixtures';
import { render } from 'utils/tests';
import { BlockExplorerLink } from './BlockExplorerLink';

jest.mock('provider', () => ({
  getBlockExplorerUrl: () => null,
}));

jest.mock('wagmi', () => ({
  useNetwork: () => ({
    chain: {
      id: 1,
      blockExplorers: {
        default: {
          url: 'https://etherscan.io/',
        },
      }.default.url,
    },
  }),
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
  }),
  useEnsName: () => ({
    data: 'name.eth',
  }),
  useEnsResolver: () => ({
    data: {
      name: 'naaame.eth',
      address: '0x0000000000000000000000000000000000000000',
    },
  }),
  useContractRead: () => ({
    data: 'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be',
  }),
  useContractReads: () => ({
    data: [{}],
  }),
}));

jest.mock('hooks/Guilds/tokens/useTokenList', () => ({
  useTokenList: () => ({
    tokens: [],
  }),
}));

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    ensName: MOCK_ENS_NAME,
    imageUrl: MOCK_IMAGE_URL,
  }),
}));

const mockUseERC20InfoReturn = jest.fn().mockReturnValue({
  name: 'Test ERC20',
  symbol: 'TEST',
  decimals: 18,
  totalSupply: mockBigNumber,
});

jest.mock('hooks/Guilds/erc20/useERC20Info', () => ({
  useERC20Info: (address: string) =>
    address
      ? {
          data: mockUseERC20InfoReturn(),
        }
      : { data: null },
}));

describe('BlockExplorerLink', () => {
  describe('BlockExplorerLink render', () => {
    it('Should match snapshot', () => {
      const { container } = render(
        <BlockExplorerLink
          address={'0x4e91c9F086DB2Fd8aDb1888e9b18e17F70B7BdB6'}
        />
      );
      expect(container).toMatchSnapshot();
    });
    it('should not render if address is an empty string, null or undefined', () => {
      let queryByTestIdEmptyStringAddress;
      let queryByTestIdUndefinedAddress;
      let queryByTestIdNullAddress;

      let componentWithEmptryStringAddress = render(
        <BlockExplorerLink address={''} />
      );
      queryByTestIdEmptyStringAddress =
        componentWithEmptryStringAddress.queryByTestId;
      let componentWithNullAddress = render(
        <BlockExplorerLink address={null} />
      );
      queryByTestIdNullAddress = componentWithNullAddress.queryByTestId;
      let componentWithUndefinedAddress = render(
        <BlockExplorerLink address={undefined} />
      );
      queryByTestIdUndefinedAddress =
        componentWithUndefinedAddress.queryByTestId;

      expect(
        queryByTestIdEmptyStringAddress('block-explorer-container')
      ).toBeNull();
      expect(queryByTestIdNullAddress('block-explorer-container')).toBeNull();
      expect(
        queryByTestIdUndefinedAddress('block-explorer-container')
      ).toBeNull();
    });
  });

  describe('BlockExplorerLink with Avatar', () => {
    it('should show avatar when receives showAvatar prop', () => {
      let getByTestId;
      let componentWithAvatar = render(
        <BlockExplorerLink
          address={'0x4e91c9F086DB2Fd8aDb1888e9b18e17F70B7BdB6'}
          showAvatar
        />
      );
      getByTestId = componentWithAvatar.getByTestId;
      const container = getByTestId('avatar');
      expect(container).toBeDefined();
    });
    it('should not show avatar when does not receive showAvatar prop', () => {
      let queryByTestId;
      let componentWithAvatar = render(
        <BlockExplorerLink
          address={'0x4e91c9F086DB2Fd8aDb1888e9b18e17F70B7BdB6'}
        />
      );
      queryByTestId = componentWithAvatar.queryByTestId;
      expect(queryByTestId('avatar')).toBeNull();
    });
  });

  describe('BlockExplorerLink fetch token data', () => {
    it('should fetch token data by default', async () => {
      render(
        <BlockExplorerLink
          address={'0x4e91c9F086DB2Fd8aDb1888e9b18e17F70B7BdB6'}
        />
      );
      expect(mockUseERC20InfoReturn).toHaveBeenCalled();
    });

    it('should not fetch token data if fetchTokenData is false', async () => {
      render(
        <BlockExplorerLink
          address={'0x4e91c9F086DB2Fd8aDb1888e9b18e17F70B7BdB6'}
          fetchTokenData={false}
        />
      );
      expect(mockUseERC20InfoReturn).not.toHaveBeenCalled();
    });
  });
});
