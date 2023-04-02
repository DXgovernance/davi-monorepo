import { renderHook } from '@testing-library/react';
import { BigNumber } from 'ethers';
import useBigNumberToString, {
  bigNumberToString,
} from './useBigNumberToString';

const mockBigNumber = BigNumber.from(1);

describe('bigNumberToString', () => {
  it('should convert a BigNumber to a string', () => {
    expect(bigNumberToString(mockBigNumber)).toEqual('1');
  });

  it('should return the number if decimal places is zero', () => {
    expect(bigNumberToString(mockBigNumber, 0)).toEqual('1');
  });

  it('should return the number if decimal places are specified', () => {
    expect(bigNumberToString(BigNumber.from(100), 2)).toEqual('1.0');
  });

  it('should return zero if the number is zero', () => {
    expect(bigNumberToString(BigNumber.from(0))).toEqual('0');
  });

  it('should return null if the value is null', () => {
    expect(bigNumberToString(null)).toEqual(null);
  });
});

describe('useBigNumberToString', () => {
  it('should convert a BigNumber to a string', () => {
    const { result } = renderHook(() => useBigNumberToString(mockBigNumber));

    expect(result.current).toEqual('1');
  });

  it('should return the number if decimal places is zero', () => {
    const { result } = renderHook(() => useBigNumberToString(mockBigNumber, 0));

    expect(result.current).toEqual('1');
  });

  it('should return the number if decimal places are specified', () => {
    const { result } = renderHook(() =>
      useBigNumberToString(BigNumber.from(100), 2)
    );

    expect(result.current).toEqual('1.0');
  });

  it('should return zero if the number is zero', () => {
    const { result } = renderHook(() =>
      useBigNumberToString(BigNumber.from(0))
    );

    expect(result.current).toEqual('0');
  });

  it('should return null if the value is null', () => {
    const { result } = renderHook(() => useBigNumberToString(null));

    expect(result.current).toEqual(null);
  });
});
