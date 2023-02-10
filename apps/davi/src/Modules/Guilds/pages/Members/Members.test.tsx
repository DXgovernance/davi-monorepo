import { BigNumber } from 'ethers';
import { screen } from '@testing-library/react';
import { render } from 'utils/tests.js';
import { MembersPage } from '.';

// General mocks

jest.mock('provider', () => ({
  getBlockExplorerUrl: () => null,
}));

jest.mock('wagmi', () => ({
  chain: {
    mainnet: {},
  },
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

// Test specific mocks

const mockUserTokensLocked = BigNumber.from(33);
const mockTotalTokensLocked = BigNumber.from(100);

jest.mock('hooks/Guilds/erc20/useERC20Info', () => ({
  useERC20Info: () => ({
    name: 'Test ERC20',
    symbol: 'TEST',
    decimals: 18,
    totalSupply: mockTotalTokensLocked,
  }),
}));

let mockUseGetMemberListReturn;

jest.mock('stores', () => ({
  useHookStoreProvider: () => ({
    hooks: {
      fetchers: {
        useGuildConfig: () => jest.fn(),
        useTotalLocked: () => jest.fn(),
        useGetMemberList: () => mockUseGetMemberListReturn,
      },
    },
  }),
}));

describe('Members Page', () => {
  it('should display a table with members and search if there are members', () => {
    mockUseGetMemberListReturn = {
      data: [
        {
          id: '1',
          address: '0x0000000000000000000000000000000000000000',
          tokensLocked: mockUserTokensLocked,
        },
      ],
      isLoading: false,
      isError: false,
    };
    render(<MembersPage />);
    expect(screen.getByTestId('members-table')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('should display a message if there are no members', () => {
    mockUseGetMemberListReturn = {
      data: [],
      isLoading: false,
      isError: false,
    };
    render(<MembersPage />);
    expect(screen.getByTestId('no-members-message')).toBeInTheDocument();
  });

  it('should display a loading indicator if it is loading', () => {
    mockUseGetMemberListReturn = {
      data: null,
      isLoading: true,
      isError: false,
    };
    render(<MembersPage />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should display a message if there was an error', () => {
    mockUseGetMemberListReturn = {
      data: null,
      isLoading: false,
      isError: true,
    };
    render(<MembersPage />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
