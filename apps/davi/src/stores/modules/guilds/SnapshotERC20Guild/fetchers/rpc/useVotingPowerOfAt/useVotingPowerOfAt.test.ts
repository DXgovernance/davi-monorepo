import {
  MOCK_BIG_NUMBER,
  MOCK_CONTRACT_ADDRESS,
  MOCK_SNAPSHOT_ID,
  MOCK_USER_ADDRESS,
} from 'Modules/Guilds/Hooks/fixtures';
import { useVotingPowerOfAt } from './useVotingPowerOfAt';

jest.mock('./useVotingPowerOfAt', () => ({
  __esModule: true,
  useVotingPowerOfAt: () => ({
    data: MOCK_BIG_NUMBER,
    isError: false,
    isLoading: false,
  }),
}));

describe('useVotingPowerOfAt', () => {
  it('should return the voting power of at snapshot id', () => {
    const { data, isError, isLoading } = useVotingPowerOfAt(
      MOCK_CONTRACT_ADDRESS,
      MOCK_USER_ADDRESS,
      MOCK_SNAPSHOT_ID.toString(),
      true
    );
    expect(data).toMatchInlineSnapshot(`
      Object {
        "hex": "0x01",
        "type": "BigNumber",
      }
    `);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
