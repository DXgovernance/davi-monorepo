import ProposalTypes from './ProposalTypes';
import { render } from 'utils/tests';
import { testProps } from './fixtures';

const mockChainId = 123456;
jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: mockChainId } }),
}));

jest.mock('provider', () => ({
  getBlockExplorerUrl: () => null,
}));

describe('ProposalTypes', () => {
  const props = testProps;

  it('Should match snapshot', () => {
    const { container } = render(<ProposalTypes {...props} />);
    expect(container).toMatchSnapshot();
  });
  it('Should display proposalTypes', () => {
    const { getAllByText } = render(<ProposalTypes {...props} />);
    props.data.forEach(({ title }) => {
      expect(getAllByText(title)[0]).toBeVisible();
    });
  });
});
