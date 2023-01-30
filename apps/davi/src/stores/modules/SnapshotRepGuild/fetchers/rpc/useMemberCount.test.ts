import {
  MOCK_GUILD_MEMBERS_TOTAL,
  MOCK_GUILD_ADDRESS,
  MOCK_TOKEN,
} from 'Modules/Guilds/Hooks/fixtures';
import { useMemberCount } from './useMemberCount';

jest.mock('wagmi', () => ({
  chain: {
    mainnet: {},
  },
  useContractRead: () => ({
    data: MOCK_GUILD_MEMBERS_TOTAL,
  }),
}));

jest.mock('stores/modules/common/fetchers', () => ({
  useDAOToken: () => ({
    data: MOCK_TOKEN,
  }),
}));

describe('useMemberCount', () => {
  it('should return guild member totals', () => {
    const { data } = useMemberCount(MOCK_GUILD_ADDRESS);

    expect(data).toMatchInlineSnapshot(`3`);
  });
});
