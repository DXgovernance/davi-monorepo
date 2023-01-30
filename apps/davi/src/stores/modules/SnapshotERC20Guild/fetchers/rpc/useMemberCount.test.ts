import {
  MOCK_GUILD_MEMBERS_TOTAL,
  MOCK_GUILD_ADDRESS,
} from 'Modules/Guilds/Hooks/fixtures';
import { useMemberCount } from './useMemberCount';

jest.mock('wagmi', () => ({
  useContractRead: () => ({
    data: MOCK_GUILD_MEMBERS_TOTAL,
  }),
}));

describe('useMemberCount', () => {
  it('should return guild member totals', () => {
    const { data } = useMemberCount(MOCK_GUILD_ADDRESS);

    expect(data).toMatchInlineSnapshot(`3`);
  });
});
