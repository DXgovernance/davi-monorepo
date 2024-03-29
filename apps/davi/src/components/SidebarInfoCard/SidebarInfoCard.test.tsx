import SidebarInfoCard from './SidebarInfoCard';
import { render } from 'utils/tests';
import { BigNumber } from 'ethers';

jest.mock('stores', () => ({
  useHookStoreProvider: () => ({
    hooks: {
      fetchers: {
        useGuildConfig: () => jest.fn(),
      },
    },
  }),
}));

describe('SidebarInfoCard', () => {
  const mockProposalTime = BigNumber.from(2);
  it('matches information card snapshot', () => {
    const container = render(
      <SidebarInfoCard quorum={1} proposalTime={mockProposalTime} />
    );
    expect(container).toMatchSnapshot();
  });
});
