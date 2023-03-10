import { shortenAddress } from './address';
import { ANY_ADDRESS } from './constants';

const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('shortenAddress', () => {
  test('should return a shorten address if everything is correct (default digits)', () => {
    const result = shortenAddress(ANY_ADDRESS);
    expect(result).toBe('0xaAaA...aaAa');
  });

  test('should return a shorten address if everything is correct (2 digits)', () => {
    const result = shortenAddress(ANY_ADDRESS, 2);
    expect(result).toBe('0xaA...Aa');
  });

  test('should return null and log error if address is undefined', () => {
    const result = shortenAddress(undefined);
    expect(result).toBeNull();
    expect(consoleError).toBeCalled();
  });

  test('should return null and log error if parameter is not an address', () => {
    const result = shortenAddress('0xNotAnAddress');
    expect(result).toBeNull();
    expect(consoleError).toBeCalled();
  });
});
