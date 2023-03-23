import { BigNumber } from 'ethers';
import { calculateSpeedometerValue, calculateBNPercentage } from './utils';

describe('calculateSpeedometerValue', () => {
  it('should return 0 when totalStaked is not provided', () => {
    const totalStaked = null;
    const result = calculateSpeedometerValue(totalStaked);
    expect(result).toEqual(0);
  });

  it('should return 5000 when stakedFor and stakedAgainst are equal', () => {
    const totalStaked: [BigNumber, BigNumber] = [
      BigNumber.from(100),
      BigNumber.from(100),
    ];
    const result = calculateSpeedometerValue(totalStaked);
    expect(result).toEqual(5000);
  });

  it('should return 7500 when stakedFor is 2x stakedAgainst', () => {
    const totalStaked: [BigNumber, BigNumber] = [
      BigNumber.from(100),
      BigNumber.from(200),
    ];
    const result = calculateSpeedometerValue(totalStaked);
    expect(result).toEqual(7500);
  });

  it('should return 2500 when stakedAgainst is 2x stakedFor', () => {
    const totalStaked: [BigNumber, BigNumber] = [
      BigNumber.from(200),
      BigNumber.from(100),
    ];
    const result = calculateSpeedometerValue(totalStaked);
    expect(result).toEqual(2500);
  });

  it('should return 10000 when stakedAgainst is 0', () => {
    const totalStaked: [BigNumber, BigNumber] = [
      BigNumber.from(0),
      BigNumber.from(100),
    ];
    const result = calculateSpeedometerValue(totalStaked);
    expect(result).toEqual(10000);
  });

  it('should return 0 when stakedFor is 0', () => {
    const totalStaked: [BigNumber, BigNumber] = [
      BigNumber.from(100),
      BigNumber.from(0),
    ];
    const result = calculateSpeedometerValue(totalStaked);
    expect(result).toEqual(0);
  });

  it('should return 5650 if stakedAgainst is 272 and stakedFor is 314', () => {
    const totalStaked: [BigNumber, BigNumber] = [
      BigNumber.from(272),
      BigNumber.from(314),
    ];
    const result = calculateSpeedometerValue(totalStaked);
    expect(result).toEqual(5650);
  });
});

describe('calculateBNPercentage', () => {
  it('should return the percentage of a BigNumber when the percentage is a string', () => {
    const value = BigNumber.from(100);
    const percentage = '50';
    const result = calculateBNPercentage(value, percentage);
    expect(result).toEqual(BigNumber.from(50));
  });

  it('should return the percentage of a BigNumber when the percentage is a number', () => {
    const value = BigNumber.from(100);
    const percentage = 50;
    const result = calculateBNPercentage(value, percentage);
    expect(result).toEqual(BigNumber.from(50));
  });

  it('should return 0 then the value is 0', () => {
    const value = BigNumber.from(0);
    const percentage = 50;
    const result = calculateBNPercentage(value, percentage);
    expect(result).toEqual(BigNumber.from(0));
  });

  it('should return 0 when the percentage is 0', () => {
    const value = BigNumber.from(100);
    const percentage = 0;
    const result = calculateBNPercentage(value, percentage);
    expect(result).toEqual(BigNumber.from(0));
  });

  it("should handle a percentage that's not a whole number", () => {
    const value = BigNumber.from(100);
    const percentage = 50.5;
    const result = calculateBNPercentage(value, percentage);
    expect(result).toEqual(BigNumber.from(50));
  });

  it('should handle negative percentages', () => {
    const value = BigNumber.from(100);
    const percentage = -50;
    const result = calculateBNPercentage(value, percentage);
    expect(result).toEqual(BigNumber.from(-50));
  });
});
