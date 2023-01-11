import { useVoterLockTimestamp } from './useVoterLockTimestamp';
import {
  MOCK_CONTRACT_ADDRESS,
  MOCK_USER_ADDRESS,
  MOCK_BIG_NUMBER,
} from 'Modules/Guilds/Hooks/fixtures';

jest.mock('wagmi', () => ({
  useContractRead: () => ({
    data: MOCK_BIG_NUMBER,
  }),
  useContractEvent: () => jest.fn(),
}));

describe('useVoterLockTimestamp', () => {
  it('should return the timestamp of voter tokens', () => {
    const { data } = useVoterLockTimestamp(
      MOCK_CONTRACT_ADDRESS,
      MOCK_USER_ADDRESS
    );
    expect(data).toMatchInlineSnapshot(`"1970-01-01T00:00:01.000Z"`);
  });
});
