import useENS from './useENS';
import wagmi, { useEnsName, useEnsAddress } from 'wagmi';
import { MOCK_ENS_NAME, MOCK_ADDRESS } from './fixtures';

jest.mock('wagmi', () => ({
  useEnsName: () => ({
    data: '',
    isLoading: false,
    isError: false,
  }),
  useEnsAddress: () => ({
    data: '',
    isLoading: false,
    isError: false,
  }),
}));

describe('useENS', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should return the resolved ens name', () => {
    const mockEnsName: any = MOCK_ENS_NAME;
    jest.spyOn(wagmi, 'useEnsName').mockImplementationOnce(() => ({
      ...useEnsName(mockEnsName),
      data: mockEnsName,
      isLoading: false,
      isError: false,
    }));
    const { address, name } = useENS(mockEnsName);
    expect(address).toMatchInlineSnapshot(`""`);
    expect(name).toMatchInlineSnapshot(`"wagmi.eth"`);
  });

  it('should return a valid address', () => {
    const mockAddress: any = MOCK_ADDRESS;
    const mockEnsName: any = MOCK_ENS_NAME;
    jest.spyOn(wagmi, 'useEnsAddress').mockImplementationOnce(() => ({
      ...useEnsAddress(mockAddress),
      data: mockAddress,
      isLoading: false,
      isError: false,
    }));
    jest.spyOn(wagmi, 'useEnsName').mockImplementationOnce(() => ({
      ...useEnsAddress(mockEnsName),
      data: mockEnsName,
      isLoading: false,
      isError: false,
    }));

    const { address, name } = useENS(mockAddress);
    expect(address).toMatchInlineSnapshot(
      `"0x0000000000000000000000000000000000000000"`
    );
    expect(name).toMatchInlineSnapshot(`"wagmi.eth"`);
  });
});
