import { MOCK_BIG_NUMBER } from 'Modules/Guilds/Hooks/fixtures';
import { ZERO_ADDRESS, ZERO_HASH } from 'utils';
import { useCreateProposal } from './useCreateProposal';
import { renderHook } from '@testing-library/react-hooks';

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

let mockReturnCid = '0x0';
jest.mock('hooks/Guilds/ipfs/useIPFSNode', () => ({
  __esModule: true,
  default: () => ({
    add: () => mockReturnCid,
    pin: jest.fn(),
  }),
}));

let mockReturnIpfsHash = '0x0';
jest.mock('hooks/Guilds/ipfs/usePinataIPFS', () => ({
  __esModule: true,
  default: () => ({
    pinToPinata: () => ({
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
    },
  }),
}));

describe('useCreateProposal', () => {
  it('should create a transaction if the data is valid', async () => {
    const { result } = renderHook(() => useCreateProposal(ZERO_ADDRESS));

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

  it('should throw error if the IPFS hash and the CID are not the same, and skipMetadataUpload is false', async () => {
    const { result } = renderHook(() => useCreateProposal(ZERO_ADDRESS));

    const {
      title,
      description,
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      skipMetadataUpload,
      otherFields,
      handleMetadataUploadError,
      cb,
    } = proposalData;

    mockReturnCid = 'otherCID';

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

    expect(mockCreateTransaction).not.toHaveBeenCalled();
  });

  it('should create proposal if the IPFS hash and the CID are not the same, but skipMetadataUpload is true', async () => {
    const { result } = renderHook(() => useCreateProposal(ZERO_ADDRESS));

    const {
      title,
      description,
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      otherFields,
      handleMetadataUploadError,
      cb,
    } = proposalData;

    const skipMetadataUpload = true;
    mockReturnCid = 'otherCID';

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
});
