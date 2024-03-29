import '@testing-library/jest-dom';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-i18next', () => {
  return {
    __esModule: true,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        language: 'en',
      },
    }),
    withTranslation: () => (key: string) => key,
  };
});

jest.mock('@ensdomains/content-hash', () => {
  return {
    fromIpfs: () => {
      return 'ipfs://';
    },
    decode: () => {
      return 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4';
    },
  };
});

