import { useDAOToken } from './useDAOToken';
import { MOCK_CONTRACT_ADDRESS, MOCK_GUILD_ADDRESS } from './fixtures';

jest.mock('./useDAOToken', () => ({
  __esModule: true,
  useDAOToken: () => ({
    data: MOCK_CONTRACT_ADDRESS,
    isError: false,
    isLoading: false,
  }),
}));

describe('[SnapshotERC20Guild] useDAOToken', () => {
  it('should return the guild token', () => {
    const { data, isError, isLoading } = useDAOToken(MOCK_GUILD_ADDRESS);
    expect(data).toMatchInlineSnapshot(`"${MOCK_CONTRACT_ADDRESS}"`);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
