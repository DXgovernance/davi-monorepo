import { render } from 'utils/tests.js';
import { Treasury } from '.';
import { MOCK_TOKEN_INFO } from './fixtures';

jest.mock('Modules/Guilds/Hooks/useTypedParams', () => ({
  useTypedParams: () => ({
    chainName: 'localhost',
    guildId: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2',
  }),
}));

let mockHook;

jest.mock('hooks/Guilds/erc20/useAllERC20Balances', () => ({
  useAllERC20Balances: () => mockHook,
}));

describe('Treasury Page', () => {
  it(`Should render with token data`, async () => {
    mockHook = {
      data: [MOCK_TOKEN_INFO],
      isLoading: false,
      isError: false,
    };
    const { container } = render(<Treasury />);
    expect(container).toMatchSnapshot();
  });

  it(`Should render message when there are no tokens`, async () => {
    mockHook = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const { container } = render(<Treasury />);
    expect(container).toMatchSnapshot();
  });
});
