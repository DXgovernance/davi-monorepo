import * as useGuildConfig from 'Modules/Guilds/Hooks/useGuildConfig';
import useIsProposalCreationAllowed from './useIsProposalCreationAllowed';
import { renderHook } from '@testing-library/react-hooks';
import { BigNumber } from 'ethers';
import { ZERO_ADDRESS } from 'utils';
const mockBigNumber = (value: number) => BigNumber.from(value);

const mockAddress = ZERO_ADDRESS;
jest.mock('wagmi', () => ({
  useAccount: () => ({ address: mockAddress }),
}));
const mockUseVotingPowerOf = jest.fn();

jest.mock('stores', () => ({
  useHookStoreProvider: () => ({
    hooks: {
      fetchers: {
        useVotingPowerOf: mockUseVotingPowerOf,
      },
    },
  }),
}));

jest.mock('Modules/Guilds/Hooks/useGuildConfig', () => ({
  useGuildConfig: () => ({
    data: {
      name: 'REPGuild',
      token: '0x0000000000000000000000000000000000000000',
      permissionRegistry: '0x0000000000000000000000000000000000000000',
      proposalTime: mockBigNumber(10000),
      timeForExecution: mockBigNumber(100002),
      maxActiveProposals: mockBigNumber(1000330),
      votingPowerForProposalCreation: mockBigNumber(1000022),
      votingPowerForProposalExecution: mockBigNumber(10044400),
      tokenVault: '0x0000000000000000000000000000000000000000',
      lockTime: mockBigNumber(1004440022),
      totalLocked: mockBigNumber(200),
    },
    isValidating: false,
    mutate: null,
  }),
}));

describe('useIsProposalCreationAllowed', () => {
  it('should return true if it has more voting power than required', async () => {
    mockUseVotingPowerOf.mockReturnValue({
      data: mockBigNumber(2000022),
      isValidating: false,
      mutate: null,
    });
    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeTruthy();
  });

  it('should return false if it has less voting power than required', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(
      () =>
        ({
          data: {
            name: 'REPGuild',
            token: '0x0000000000000000000000000000000000000000',
            permissionRegistry: '0x0000000000000000000000000000000000000000',
            proposalTime: mockBigNumber(10000),
            timeForExecution: mockBigNumber(100002),
            maxActiveProposals: mockBigNumber(1000330),
            votingPowerForProposalCreation: mockBigNumber(1000022),
            votingPowerForProposalExecution: mockBigNumber(10044400),
            tokenVault: '0x0000000000000000000000000000000000000000',
            lockTime: mockBigNumber(1004440022),
            totalLocked: mockBigNumber(200),
          },
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );

    mockUseVotingPowerOf.mockReturnValue({
      data: mockBigNumber(100002),
      isValidating: false,
      mutate: null,
    });

    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeFalsy();
  });

  it('should return false if there is no guildConfig', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(
      () =>
        ({
          data: null,
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );

    mockUseVotingPowerOf.mockReturnValue({
      data: mockBigNumber(1000000),
      isValidating: false,
      mutate: null,
    });

    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeFalsy();
  });

  it('should return false if there is no votingPower', async () => {
    mockUseVotingPowerOf.mockReturnValue({
      data: null,
      isValidating: false,
      mutate: null,
    });

    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeFalsy();
  });
});
