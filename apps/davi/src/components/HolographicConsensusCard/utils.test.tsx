import { BigNumber } from 'ethers';
import {
  mockProposalStakeDetails,
  mockProposalStakeDetailsEmpty,
} from './fixtures';
import {
  calculateSpeedometerValue,
  calculateBNPercentage,
  checkUserStakeOption,
} from './utils';

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

// write test cases for checkUserStakeOption
describe('checkUserStakeOption', () => {
  it("should return 'for' if the user staked for the proposal", () => {
    const userAddress = '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f';
    const result = checkUserStakeOption(userAddress, mockProposalStakeDetails);
    expect(result).toEqual('for');
  });

  it("should return 'against' if the user staked against the proposal", () => {
    const userAddress = '0x84eeb305da0a4309a696d43de9f79f04e66eb4f8';
    const result = checkUserStakeOption(userAddress, mockProposalStakeDetails);
    expect(result).toEqual('against');
  });

  it('should return null if the user did not stake for the proposal', () => {
    const userAddress = '0x9578e973bba0cc33bdbc93c7f77bb3fe6d47d68a';
    const result = checkUserStakeOption(userAddress, mockProposalStakeDetails);
    expect(result).toEqual(null);
  });

  it('should handle an empty stakeDetails', () => {
    const userAddress = '0x84eeb305da0a4309a696d43de9f79f04e66eb4f8';
    const result = checkUserStakeOption(
      userAddress,
      mockProposalStakeDetailsEmpty
    );
    expect(result).toEqual(null);
  });

  it('should handle lower and upper case addresses', () => {
    const userAddress = '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f';
    const userAddressUpper = userAddress.toUpperCase();
    const result = checkUserStakeOption(
      userAddressUpper,
      mockProposalStakeDetails
    );
    expect(result).toEqual('for');
  });
});
