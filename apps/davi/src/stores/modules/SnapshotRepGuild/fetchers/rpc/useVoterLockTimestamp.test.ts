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
  it('should return null because the method is not supported', () => {
    const { data } = useVoterLockTimestamp(
      MOCK_CONTRACT_ADDRESS,
      MOCK_USER_ADDRESS
    );
    expect(data).toBeNull();
  });
});
