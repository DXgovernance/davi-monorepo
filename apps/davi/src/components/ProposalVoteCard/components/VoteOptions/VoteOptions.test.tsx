import { render } from 'utils/tests';
import VoteOptions from './VoteOptions';
import { mockVoteResults } from '../../fixture';

describe('VoteResults', () => {
  it('matches the snapshot', () => {
    const { container } = render(<VoteOptions {...mockVoteResults} />);
    expect(container).toMatchSnapshot();
  });
});
