import { render } from 'utils/tests.js';
import { Treasury } from '.';
import { MOCK_TOKEN_INFO } from './fixtures';

jest.mock('Modules/Guilds/Hooks/useTypedParams', () => ({
  useTypedParams: () => ({
    chainName: 'localhost',
    guildId: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2',
  }),
}));

jest.mock('hooks/Guilds/erc20/useAllERC20Balances', () => ({
  useAllERC20Balances: () => ({
    data: [MOCK_TOKEN_INFO],
    isLoading: false,
    isError: false,
  }),
}));

describe('Treasury Page', () => {
  it(`Should render without data`, async () => {
    const { container } = render(<Treasury />);
    expect(container).toMatchSnapshot();
  });
});
