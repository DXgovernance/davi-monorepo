import { BigNumber } from 'ethers';
import {
  MOCK_GUILD_ADDRESS,
  MOCK_USER_ADDRESS,
} from 'Modules/Guilds/Hooks/fixtures';
import { Permission, SupportedAction } from 'components/ActionsBuilder/types';
import { useGetPermissions } from './useGetPermissions';

const mockFromTime = BigNumber.from(500000);
const mockValueAllowed = BigNumber.from(700000);

jest.mock('contexts/Guilds/orbis', () => ({}));

jest.mock('stores/modules/guilds/common/fetchers/rpc', () => ({
  useProposalCalls: () => ({ options: [] }),
  useGuildConfig: () => ({
    data: {
      permissionRegistry: '0x23120390909dq0w9adsj832921293989',
    },
  }),
}));

jest.mock('wagmi', () => ({
  useContractRead: () => ({
    data: {
      valueAllowed: mockValueAllowed,
      fromTime: mockFromTime,
    },
  }),
  useNetwork: () => ({ chain: { id: 1 } }),
  chain: {
    mainnet: {},
  },
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
  }),
  useContractEvent: () => jest.fn(),
}));

describe('useGetPermissions', () => {
  it('should return the permission from the permission registry', () => {
    const permission: Permission = {
      from: MOCK_GUILD_ADDRESS,
      to: MOCK_USER_ADDRESS,
      callType: SupportedAction.NATIVE_TRANSFER,
      functionSignature: '0x',
    };

    const parsedPermission = useGetPermissions(MOCK_GUILD_ADDRESS, permission);

    expect(parsedPermission.data.fromTime).toEqual(mockFromTime);
    expect(parsedPermission.data.valueAllowed).toEqual(mockValueAllowed);
  });
});
