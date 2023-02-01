import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useContractRead } from 'wagmi';

export const useDAOToken = (daoId: string) => {
  const { data, ...rest } = useContractRead({
    address: daoId,
    abi: BaseERC20Guild.abi,
    functionName: 'getToken',
  });
  return { data, ...rest };
};
