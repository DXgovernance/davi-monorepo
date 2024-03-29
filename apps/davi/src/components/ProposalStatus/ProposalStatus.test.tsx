import { ProposalStatus } from './ProposalStatus';
import { render } from '../../utils/tests';
import { ProposalStatusProps } from './types';
import { ProposalState } from 'types/types.guilds.d';
import moment from 'moment';

jest.mock('stores', () => ({
  useHookStoreProvider: () => ({
    hooks: {
      fetchers: {
        useGuildConfig: () => jest.fn(),
      },
    },
  }),
}));

const validProps: ProposalStatusProps = {
  status: ProposalState.Active,
  endTime: { detail: 'endedTimeAgo', moment: moment('2022-05-09T08:00:00') },
};

const invalidProps: ProposalStatusProps = {
  status: null,
  endTime: null,
};

test('ProposalStatus votes', async () => {
  const { container } = render(<ProposalStatus {...validProps} />);

  expect(container).toMatchSnapshot();
});

test('ProposalStatus loading', async () => {
  const { container } = render(<ProposalStatus {...invalidProps} />);

  expect(container).toMatchSnapshot();
});
