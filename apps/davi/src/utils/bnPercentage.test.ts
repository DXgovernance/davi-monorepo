import { BigNumber } from 'ethers';
import { getBigNumberPercentage } from './bnPercentage';

describe('getBigNumberPercentage', () => {
  test('standard precision', () => {
    const result1 = getBigNumberPercentage(
      BigNumber.from('46681218000000000000'),
      BigNumber.from('116703045000000000002')
    );
    // 0.39999999999999999999
    expect(result1).toBe(40);

    const result2 = getBigNumberPercentage(
      BigNumber.from('38348164999999999932'),
      BigNumber.from('116703045000000000002')
    );
    // 0.32859609618583645295
    expect(result2).toBe(32.86);

    const result3 = getBigNumberPercentage(
      BigNumber.from('50000000000000000000'),
      BigNumber.from('100000000000000000000')
    );
    // 0.5
    expect(result3).toBe(50);

    const result4 = getBigNumberPercentage(
      BigNumber.from('38748164999999999932'),
      BigNumber.from('116703045000000000002')
    );
    // 0.33202359887010660202
    expect(result4).toBe(33.2);

    const zero = getBigNumberPercentage(
      BigNumber.from('0'),
      BigNumber.from('0')
    );
    expect(zero).toBe(0);

    const result5 = getBigNumberPercentage(
      BigNumber.from('52110000000000000000'),
      BigNumber.from('100000000000000000000')
    );
    // 0.5211
    expect(result5).toBe(52.11);
  });

  test('zero decimals precision', () => {
    const result1 = getBigNumberPercentage(
      BigNumber.from('46681218000000000000'),
      BigNumber.from('116703045000000000002'),
      0
    );
    // 0.39999999999999999999
    expect(result1).toBe(40);

    const result2 = getBigNumberPercentage(
      BigNumber.from('38348164999999999932'),
      BigNumber.from('116703045000000000002'),
      0
    );
    // 0.32859609618583645295
    expect(result2).toBe(33);

    const result3 = getBigNumberPercentage(
      BigNumber.from('50000000000000000000'),
      BigNumber.from('100000000000000000000'),
      0
    );
    // 0.5
    expect(result3).toBe(50);

    const result4 = getBigNumberPercentage(
      BigNumber.from('38748164999999999932'),
      BigNumber.from('116703045000000000002'),
      0
    );
    // 0.33202359887010660202
    expect(result4).toBe(33);

    const result5 = getBigNumberPercentage(
      BigNumber.from('52110000000000000000'),
      BigNumber.from('100000000000000000000'),
      0
    );
    // 0.5211
    expect(result5).toBe(52);
  });

  test('one decimal precision', () => {
    const result1 = getBigNumberPercentage(
      BigNumber.from('46681218000000000000'),
      BigNumber.from('116703045000000000002'),
      1
    );
    // 0.39999999999999999999
    expect(result1).toBe(40);

    const result2 = getBigNumberPercentage(
      BigNumber.from('38348164999999999932'),
      BigNumber.from('116703045000000000002'),
      1
    );
    // 0.32859609618583645295
    expect(result2).toBe(32.9);

    const result3 = getBigNumberPercentage(
      BigNumber.from('50000000000000000000'),
      BigNumber.from('100000000000000000000'),
      1
    );
    // 0.5
    expect(result3).toBe(50);

    const result4 = getBigNumberPercentage(
      BigNumber.from('38748164999999999932'),
      BigNumber.from('116703045000000000002'),
      1
    );
    // 0.33202359887010660202
    expect(result4).toBe(33.2);

    const result5 = getBigNumberPercentage(
      BigNumber.from('52110000000000000000'),
      BigNumber.from('100000000000000000000'),
      1
    );
    // 0.5211
    expect(result5).toBe(52.1);
  });

  test('two decimals precision', () => {
    const result1 = getBigNumberPercentage(
      BigNumber.from('46681218000000000000'),
      BigNumber.from('116703045000000000002'),
      2
    );
    // 0.39999999999999999999
    expect(result1).toBe(40);

    const result2 = getBigNumberPercentage(
      BigNumber.from('38348164999999999932'),
      BigNumber.from('116703045000000000002'),
      2
    );
    // 0.32859609618583645295
    expect(result2).toBe(32.86);

    const result3 = getBigNumberPercentage(
      BigNumber.from('50000000000000000000'),
      BigNumber.from('100000000000000000000'),
      2
    );
    // 0.5
    expect(result3).toBe(50);

    const result4 = getBigNumberPercentage(
      BigNumber.from('38748164999999999932'),
      BigNumber.from('116703045000000000002'),
      2
    );
    // 0.33202359887010660202
    expect(result4).toBe(33.2);

    const result5 = getBigNumberPercentage(
      BigNumber.from('52110000000000000000'),
      BigNumber.from('100000000000000000000'),
      2
    );
    // 0.5211
    expect(result5).toBe(52.11);
  });

  test('three decimals precision', () => {
    const result1 = getBigNumberPercentage(
      BigNumber.from('46681218000000000000'),
      BigNumber.from('116703045000000000002'),
      3
    );
    // 0.39999999999999999999
    expect(result1).toBe(40);

    const result2 = getBigNumberPercentage(
      BigNumber.from('38348164999999999932'),
      BigNumber.from('116703045000000000002'),
      3
    );
    // 0.32859609618583645295
    expect(result2).toBe(32.86);

    const result3 = getBigNumberPercentage(
      BigNumber.from('50000000000000000000'),
      BigNumber.from('100000000000000000000'),
      3
    );
    // 0.5
    expect(result3).toBe(50);

    const result4 = getBigNumberPercentage(
      BigNumber.from('38748164999999999932'),
      BigNumber.from('116703045000000000002'),
      3
    );
    // 0.33202359887010660202
    expect(result4).toBe(33.202);

    const result5 = getBigNumberPercentage(
      BigNumber.from('52110000000000000000'),
      BigNumber.from('100000000000000000000'),
      3
    );
    // 0.5211
    expect(result5).toBe(52.11);
  });

  test('four decimals precision', () => {
    const result1 = getBigNumberPercentage(
      BigNumber.from('46681218000000000000'),
      BigNumber.from('116703045000000000002'),
      4
    );
    // 0.39999999999999999999
    expect(result1).toBe(40);

    const result2 = getBigNumberPercentage(
      BigNumber.from('38348164999999999932'),
      BigNumber.from('116703045000000000002'),
      4
    );
    // 0.32859609618583645295
    expect(result2).toBe(32.8596);

    const result3 = getBigNumberPercentage(
      BigNumber.from('50000000000000000000'),
      BigNumber.from('100000000000000000000'),
      4
    );
    // 0.5
    expect(result3).toBe(50);

    const result4 = getBigNumberPercentage(
      BigNumber.from('38748164999999999932'),
      BigNumber.from('116703045000000000002'),
      4
    );
    // 0.33202359887010660202
    expect(result4).toBe(33.2024);

    const result5 = getBigNumberPercentage(
      BigNumber.from('52110000000000000000'),
      BigNumber.from('100000000000000000000'),
      4
    );
    // 0.5211
    expect(result5).toBe(52.11);
  });

  test('five decimals precision', () => {
    const result1 = getBigNumberPercentage(
      BigNumber.from('46681218000000000000'),
      BigNumber.from('116703045000000000002'),
      5
    );
    // 0.39999999999999999999
    expect(result1).toBe(40);

    const result2 = getBigNumberPercentage(
      BigNumber.from('38348164999999999932'),
      BigNumber.from('116703045000000000002'),
      5
    );
    // 0.32859609618583645295
    expect(result2).toBe(32.85961);

    const result3 = getBigNumberPercentage(
      BigNumber.from('50000000000000000000'),
      BigNumber.from('100000000000000000000'),
      5
    );
    // 0.5
    expect(result3).toBe(50);

    const result4 = getBigNumberPercentage(
      BigNumber.from('38748164999999999932'),
      BigNumber.from('116703045000000000002'),
      5
    );
    // 0.33202359887010660202
    expect(result4).toBe(33.20236);

    const result5 = getBigNumberPercentage(
      BigNumber.from('52110000000000000000'),
      BigNumber.from('100000000000000000000'),
      5
    );
    // 0.5211
    expect(result5).toBe(52.11);
  });
});
