import { getOptionLabel } from './guildsProposals';

const mockMetadataWithData = {
  voteOptions: ['Against', 'First option', 'Second option'],
};

const mockMetadataEmpty = {
  voteOptions: [],
};

const mockT = key => key;

describe('guildsProposals', () => {
  describe('getOptionLabel', () => {
    it('should return the label for an option with label', () => {
      mockMetadataWithData.voteOptions.forEach((option, index) => {
        const result = getOptionLabel({
          metadata: mockMetadataWithData,
          optionKey: index,
          t: mockT,
        });
        expect(result).toBe(option);
      });
    });

    it('without labels, it should return "against" for the first option and "option" for the others', () => {
      mockMetadataWithData.voteOptions.forEach((option, index) => {
        const result = getOptionLabel({
          metadata: mockMetadataEmpty,
          optionKey: index,
          t: mockT,
        });
        if (index === 0) expect(result).toContain('against');
        else expect(result).toContain('option');
      });
    });
  });
});
