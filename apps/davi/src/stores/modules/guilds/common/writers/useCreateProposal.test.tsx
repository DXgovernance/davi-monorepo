import { MOCK_BIG_NUMBER } from 'Modules/Guilds/Hooks/fixtures';
import { ZERO_ADDRESS, ZERO_HASH } from 'utils';
import { useCreateProposal } from './useCreateProposal';
import { renderHook } from '@testing-library/react-hooks';
import { mockChain } from 'components/Web3Modals/fixtures';

const proposalData = {
  title: 'proposal',
  description: 'proposal description',
  toArray: [ZERO_ADDRESS],
  dataArray: [ZERO_HASH],
  valueArray: [MOCK_BIG_NUMBER],
  totalOptions: 2,
  otherFields: {
    options: [{ label: 'option 1' }, { label: 'option 2' }],
  },
  skipMetadataUpload: false,
  handleMetadataUploadError: jest.fn(),
  cb: jest.fn(),
};

const mockCreateTransaction = jest.fn();
jest.mock('contexts/Guilds', () => ({
  useTransactions: () => ({
    createTransaction: () => mockCreateTransaction(),
  }),
}));

let mockReturnIpfsHash = '0x0';
jest.mock('hooks/Guilds/ipfs/useWeb3Storage', () => ({
  __esModule: true,
  default: () => ({
    pinToStorage: () => Promise.resolve(mockReturnIpfsHash),
  }),
}));

jest.mock('wagmi', () => ({
  useContractRead: () => ({ data: '' }),
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
      contentHash: '0x0',
    },
  }),
  useNetwork: () => ({ chain: mockChain, chains: [mockChain] }),
}));

jest.mock('hooks/Guilds/ipfs/usePinataIPFS', () => ({
  __esModule: true,
  default: () => ({
    pinToPinata: () =>
      Promise.resolve({
        IpfsHash: mockReturnIpfsHash,
      }),
  }),
}));

jest.mock('hooks/Guilds/contracts/useContract', () => ({
  useERC20Guild: () => jest.fn(),
}));

jest.mock('contexts/Guilds/orbis', () => ({
  useOrbisContext: () => ({
    orbis: {
      getPosts: () => ({
        data: [1, 2, 3],
      }),
      createPost: () => ({
        status: 200,
      }),
    },
  }),
}));

describe('useCreateProposal', () => {
  it('should create a transaction if the data is valid', async () => {
    const { result } = renderHook(() =>
      useCreateProposal(ZERO_ADDRESS, ZERO_ADDRESS)
    );

    const {
      title,
      description,
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      otherFields,
      skipMetadataUpload,
      handleMetadataUploadError,
      cb,
    } = proposalData;

    await result.current(
      title,
      description,
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      otherFields,
      skipMetadataUpload,
      handleMetadataUploadError,
      cb
    );

    expect(mockCreateTransaction).toHaveBeenCalled();
  });

  it('should throw error if some data is invalid', async () => {
    const { result } = renderHook(() => useCreateProposal(ZERO_ADDRESS));

    const {
      description,
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      otherFields,
      skipMetadataUpload,
      handleMetadataUploadError,
      cb,
    } = proposalData;

    const title = null;

    try {
      await result.current(
        title,
        description,
        toArray,
        dataArray,
        valueArray,
        totalOptions,
        otherFields,
        skipMetadataUpload,
        handleMetadataUploadError,
        cb
      );
    } catch {}

    expect(mockCreateTransaction).not.toHaveBeenCalled();
  });

  it('should throw error if options has no length', async () => {
    const { result } = renderHook(() => useCreateProposal(ZERO_ADDRESS));

    const {
      title,
      description,
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      skipMetadataUpload,
      handleMetadataUploadError,
      cb,
    } = proposalData;

    const otherFields = {
      options: [],
    };

    try {
      await result.current(
        title,
        description,
        toArray,
        dataArray,
        valueArray,
        totalOptions,
        otherFields,
        skipMetadataUpload,
        handleMetadataUploadError,
        cb
      );
    } catch {}
    expect(mockCreateTransaction).not.toHaveBeenCalled();
  });
});
