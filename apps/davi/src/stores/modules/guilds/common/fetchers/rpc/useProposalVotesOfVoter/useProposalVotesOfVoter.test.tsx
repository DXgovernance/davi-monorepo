import { BigNumber } from 'ethers';
import { ANY_ADDRESS, ZERO_HASH } from 'utils';
import { renderHook } from '@testing-library/react-hooks';
import { useProposalVotesOfVoter } from './useProposalVotesOfVoter';

const mockBigNumber = BigNumber.from(1);

let mockUseContractReadReturnValue;

jest.mock('wagmi', () => ({
  useContractRead: () => mockUseContractReadReturnValue,
  useContractEvent: () => jest.fn(),
}));

describe('useProposalVotesOfVoter', () => {
  it('returns option and voting power', async () => {
    mockUseContractReadReturnValue = {
      data: {
        option: mockBigNumber,
        votingPower: mockBigNumber,
      },
    };
    const { result } = renderHook(() =>
      useProposalVotesOfVoter(ANY_ADDRESS, ZERO_HASH, ANY_ADDRESS)
    );

    expect(result.current.data.option).toBe('1');
    expect(result.current.data.votingPower).toBe(mockBigNumber);
  });

  it("returns null if there's no voting power", () => {
    mockUseContractReadReturnValue = {
      data: {
        option: mockBigNumber,
        votingPower: null,
      },
    };

    const { result } = renderHook(() =>
      useProposalVotesOfVoter(ANY_ADDRESS, ZERO_HASH, ANY_ADDRESS)
    );

    expect(result.current.data.option).toBeNull();
    expect(result.current.data.votingPower).toBeNull();
  });

  it("returns null if there's no option", () => {
    mockUseContractReadReturnValue = {
      data: {
        option: null,
        votingPower: mockBigNumber,
      },
    };

    const { result } = renderHook(() =>
      useProposalVotesOfVoter(ANY_ADDRESS, ZERO_HASH, ANY_ADDRESS)
    );

    expect(result.current.data.option).toBeNull();
    expect(result.current.data.votingPower).toBeNull();
  });

  it("returns null if there's no voting power and no option", () => {
    mockUseContractReadReturnValue = {
      data: {
        option: null,
        votingPower: null,
      },
    };

    const { result } = renderHook(() =>
      useProposalVotesOfVoter(ANY_ADDRESS, ZERO_HASH, ANY_ADDRESS)
    );

    expect(result.current.data.option).toBeNull();
    expect(result.current.data.votingPower).toBeNull();
  });
});
