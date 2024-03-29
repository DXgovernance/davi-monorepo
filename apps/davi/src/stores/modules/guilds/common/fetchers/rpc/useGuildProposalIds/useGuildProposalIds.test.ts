import {
  MOCK_GUILD_ADDRESS,
  MOCK_CONTRACT_ADDRESSES,
} from 'Modules/Guilds/Hooks/fixtures';
import { useGuildProposalIds } from './useGuildProposalIds';
jest.mock('./useGuildProposalIds', () => ({
  useGuildProposalIds: () => ({
    data: MOCK_CONTRACT_ADDRESSES,
    isError: false,
    isLoading: false,
    errorMessage: null,
  }),
}));

describe('useGuildProposalIds', () => {
  it('should return guild proposal ids', () => {
    const { data, isError, isLoading } =
      useGuildProposalIds(MOCK_GUILD_ADDRESS);
    expect(data).toMatchInlineSnapshot(`
      Array [
        "0x0000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000003",
      ]
    `);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
