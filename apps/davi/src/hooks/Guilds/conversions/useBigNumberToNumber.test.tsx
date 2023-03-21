import { renderHook } from '@testing-library/react';
import { BigNumber } from 'ethers';
import useBigNumberToNumber, {
  bigNumberToNumber,
} from './useBigNumberToNumber';

const mockBigNumber = BigNumber.from('1000000000000000000');

describe('bigNumberToNumber', () => {
  it('should return null if no number is provided', () => {
    expect(bigNumberToNumber(undefined, 18)).toEqual(null);
  });

  it('should return null if no decimals are provided', () => {
    expect(bigNumberToNumber(mockBigNumber, undefined)).toEqual(null);
  });

  it('should return a number if a number and decimals are provided', () => {
    expect(bigNumberToNumber(mockBigNumber, 18)).toEqual(1);
  });

  it('should return zero if number is zero', () => {
    expect(bigNumberToNumber(BigNumber.from(0), 18)).toEqual(0);
  });

  it('should return a number if decimals are zero', () => {
    expect(bigNumberToNumber(BigNumber.from(1), 0)).toEqual(1);
  });
});

describe('useBigNumberToNumber', () => {
  it('should return null if no number is provided', () => {
    const { result } = renderHook(() => useBigNumberToNumber(undefined, 18));
    expect(result.current).toEqual(null);
  });

  it('should return null if no decimals are provided', () => {
    const { result } = renderHook(() =>
      useBigNumberToNumber(mockBigNumber, undefined)
    );
    expect(result.current).toEqual(null);
  });

  it('should return a number if a number and decimals are provided', () => {
    const { result } = renderHook(() =>
      useBigNumberToNumber(mockBigNumber, 18)
    );
    expect(result.current).toEqual(1);
  });

  it('should return zero if number is zero', () => {
    const { result } = renderHook(() =>
      useBigNumberToNumber(BigNumber.from(0), 18)
    );
    expect(result.current).toEqual(0);
  });

  it('should return a number if decimals are zero', () => {
    const { result } = renderHook(() =>
      useBigNumberToNumber(BigNumber.from(1), 0)
    );
    expect(result.current).toEqual(1);
  });
});
