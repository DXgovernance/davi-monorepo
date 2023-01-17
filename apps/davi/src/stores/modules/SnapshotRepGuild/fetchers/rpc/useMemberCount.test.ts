import {
  MOCK_GUILD_MEMBERS_TOTAL,
  MOCK_GUILD_ADDRESS,
  MOCK_TOKEN,
} from 'Modules/Guilds/Hooks/fixtures';
import wagmi, { useContractRead } from 'wagmi';
import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import { useMemberCount } from './useMemberCount';

jest.mock('wagmi', () => ({
  useContractRead: () => ({
    data: MOCK_GUILD_MEMBERS_TOTAL,
  }),
}));

jest.mock('Modules/Guilds/Hooks/useGuildToken', () => ({
  __esModule: true,
  default: () => ({
    data: MOCK_TOKEN,
  }),
}));

describe('useMemberCount', () => {
  it('should return guild member totals', () => {
    const { data } = useMemberCount(MOCK_GUILD_ADDRESS);

    expect(data).toMatchInlineSnapshot(`3`);
  });

  it('should call getTotalHolders', () => {
    const mockUseContractRead = jest
      .spyOn(wagmi, 'useContractRead')
      .mockImplementationOnce(() => ({
        ...(useContractRead({
          address: MOCK_TOKEN,
          abi: ERC20SnapshotRep.abi,
          functionName: 'getTotalHolders',
        }) as any),
      }));

    useMemberCount(MOCK_GUILD_ADDRESS);

    expect(mockUseContractRead).toHaveBeenCalledWith({
      address: MOCK_TOKEN,
      abi: ERC20SnapshotRep.abi,
      functionName: 'getTotalHolders',
    });
  });
});
