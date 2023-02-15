// import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { FetcherHooksInterface } from 'stores/types';
import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';

type IUseDAOToken = FetcherHooksInterface['useDAOToken'];

export const useDAOToken: IUseDAOToken = daoId => {
  const { data, isLoading, isError } = useContractRead({
    address: daoId,
    abi: BaseERC20Guild.abi,
    functionName: 'getToken',
  });
  return { data, isLoading, isError };
};
