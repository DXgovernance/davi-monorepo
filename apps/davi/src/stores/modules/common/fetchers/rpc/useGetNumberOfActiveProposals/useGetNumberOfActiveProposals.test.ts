import { useGetNumberOfActiveProposals } from './useGetNumberOfActiveProposals';
import {
  MOCK_BIG_NUMBER,
  MOCK_GUILD_ADDRESS,
} from 'Modules/Guilds/Hooks/fixtures';
import { ZERO_ADDRESS } from 'utils';

jest.mock('hooks/Guilds/tokens/useTokenList', () => ({
  useTokenList: () => [],
}));

jest.mock('stores/modules/common/fetchers/rpc', () => ({
  useProposalCalls: () => ({ options: [] }),
}));

jest.mock('stores', () => ({
  useHookStoreProvider: () => ({
    hooks: {
      fetchers: {
        useVotingPowerOf: jest.fn(),
        useIsProposalCreationAllowed: jest.fn(),
        useSnapshotId: jest.fn(),
        useProposalCalls: jest.fn(),
        useGuildConfig: () => jest.fn(),
      },
    },
  }),
}));

const mockAddress = ZERO_ADDRESS;
jest.mock('wagmi', () => ({
  useContractEvent: () => jest.fn(),
  useContractRead: () => ({ data: MOCK_BIG_NUMBER }),
  useAccount: () => ({ address: mockAddress }),
  chain: {
    mainnet: {},
  },
}));

jest.mock('provider/ReadOnlyConnector', () => ({
  READ_ONLY_CONNECTOR_ID: 'readOnly',
}));

jest.mock('contexts/Guilds/orbis', () => ({}));

describe('useGuildActiveProposals', () => {
  it('should return active Guild proposals', () => {
    const { data } = useGetNumberOfActiveProposals(MOCK_GUILD_ADDRESS);
    expect(data).toBe(MOCK_BIG_NUMBER);
  });
});
