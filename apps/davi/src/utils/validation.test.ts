import { MOCK_BIG_NUMBER } from 'Modules/Guilds/Hooks/fixtures';
import { ZERO_ADDRESS, ZERO_HASH } from './constants';
import { isEnsName, isValidGuildProposal } from './validations';

const guildProposalData = {
  toArray: [ZERO_ADDRESS],
  dataArray: [ZERO_HASH],
  valueArray: [MOCK_BIG_NUMBER],
  totalOptions: 2,
  title: 'test proposal',
  contentHash: ZERO_HASH,
};

jest.mock('i18next', () => {
  return {
    t: (key: string) => key,
  };
});

describe('ENS update validations', () => {
  describe('isEnsName validation', () => {
    describe('should return true', () => {
      it('should be a correct ENS name for a top level domain', () => {
        const name = 'name.eth';
        const { isValid } = isEnsName(name);
        expect(isValid).toEqual(true);
      });

      it('should be a correct ENS name for a subdomain', () => {
        const name = 'subdomain.name.eth';
        const { isValid } = isEnsName(name);
        expect(isValid).toEqual(true);
      });
    });

    describe('should catch validation errors', () => {
      it(`should return an error if there's a subdomain with no letters on it (two dots together)`, () => {
        const name = 'test..eth';
        const { isValid, validationError } = isEnsName(name);
        expect(isValid).toEqual(false);
        expect(validationError).toBe('ens.validation.domainNameInvalidLength');
      });

      it(`should return an error if the domain starts with a dot`, () => {
        const name = '.test.eth';
        const { isValid, validationError } = isEnsName(name);
        expect(isValid).toEqual(false);
        expect(validationError).toBe('ens.validation.domainNameInvalidLength');
      });

      it(`should return an error if the domain has spaces`, () => {
        const name = 'sub domain.test.eth';
        const { isValid, validationError } = isEnsName(name);
        expect(isValid).toEqual(false);
        expect(validationError).toBe(
          'ens.validation.domainNameCannotIncludeSpaces'
        );
      });

      it(`should return an error if the domain is more than two levels deep`, () => {
        const name = 'subsubdomain.subdomain.test.eth';
        const { isValid, validationError } = isEnsName(name);
        expect(isValid).toEqual(false);
        expect(validationError).toBe(
          'ens.validation.domainCannotBeMoreThanThreeLevels'
        );
      });
    });
  });
});

describe('isValidGuildProposal', () => {
  describe('valid results', () => {
    it('should be valid if every field is correct', () => {
      const { isValid, error } = isValidGuildProposal(guildProposalData);
      expect(isValid).toEqual(true);
      expect(error).toBeNull();
    });
  });

  describe('invalid results', () => {
    it("should be invalid if there's no title", () => {
      const data = { ...guildProposalData, title: '' };
      const { isValid, error } = isValidGuildProposal(data);
      expect(isValid).toEqual(false);
      expect(error).toBeTruthy();
    });

    it('should be invalid if total options is zero', () => {
      const data = { ...guildProposalData, totalOptions: 0 };
      const { isValid, error } = isValidGuildProposal(data);
      expect(isValid).toEqual(false);
      expect(error).toBeTruthy();
    });

    it('should be invalid if toArray has no elements', () => {
      const data = { ...guildProposalData, toArray: [] };
      const { isValid, error } = isValidGuildProposal(data);
      expect(isValid).toEqual(false);
      expect(error).toBeTruthy();
    });

    it('should be invalid if dataArray has no elements', () => {
      const data = { ...guildProposalData, dataArray: [] };
      const { isValid, error } = isValidGuildProposal(data);
      expect(isValid).toEqual(false);
      expect(error).toBeTruthy();
    });

    it('should be invalid if valueArray has no elements', () => {
      const data = { ...guildProposalData, valueArray: [] };
      const { isValid, error } = isValidGuildProposal(data);
      expect(isValid).toEqual(false);
      expect(error).toBeTruthy();
    });

    it('should be invalid if there is no content hash', () => {
      const data = { ...guildProposalData, contentHash: '' };
      const { isValid, error } = isValidGuildProposal(data);
      expect(isValid).toEqual(false);
      expect(error).toBeTruthy();
    });
  });
});
