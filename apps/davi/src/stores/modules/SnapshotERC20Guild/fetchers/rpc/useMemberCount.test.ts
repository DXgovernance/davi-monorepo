import {
  MOCK_GUILD_MEMBERS_TOTAL,
  MOCK_GUILD_ADDRESS,
} from 'Modules/Guilds/Hooks/fixtures';
import wagmi, { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
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

  it('should call getTotalMembers', () => {
    const mockUseContractRead = jest
      .spyOn(wagmi, 'useContractRead')
      .mockImplementationOnce(() => ({
        ...(useContractRead({
          address: MOCK_GUILD_ADDRESS,
          abi: BaseERC20Guild.abi,
          functionName: 'getTotalMembers',
        }) as any),
      }));

    useMemberCount(MOCK_GUILD_ADDRESS);

    expect(mockUseContractRead).toHaveBeenCalledWith({
      address: MOCK_GUILD_ADDRESS,
      abi: BaseERC20Guild.abi,
      functionName: 'getTotalMembers',
    });
  });
});
