import { useMemo } from 'react';
import { TokenList } from '@uniswap/token-lists';
import useIPFSFile from '../ipfs/useIPFSFile';
import useNetworkConfig from 'hooks/Guilds/useNetworkConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { getChainIcon } from 'utils';
import { useNetwork } from 'wagmi';
import { useENSContentHash } from '../ens/useENSPublicResolverContract';
import { TokenInfoWithType } from 'types/types';

export const useTokenList = (
  chainId?: number,
  includeNativeToken: boolean = false
) => {
  const { ipfsHash } = useENSContentHash('tokens.projectdavi.eth', 1);
  const tokenList = useIPFSFile<TokenList>(ipfsHash);

  const { chainName } = useTypedParams();
  const config = useNetworkConfig(chainId);
  const { chains } = useNetwork();
  const tokens = useMemo(() => {
    let list: TokenInfoWithType[] =
      tokenList.data?.tokens?.map(token => ({
        ...token,
        type: 'ERC20',
      })) || [];

    if (chainId) {
      list = list.filter(token => token.chainId === chainId);
    }
    if (
      (chainName === 'localhost' || chainName === 'goerli') &&
      config?.tokens
    ) {
      // for localhost, we add the tokens from local config file
      config?.tokens?.forEach(token => {
        list.push({
          ...token,
          chainId,
          type: 'ERC20',
        });
      });
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, tokenList]);

  const nativeToken: TokenInfoWithType = useMemo(() => {
    const chain = chains.find(chain => chain?.id === chainId);
    if (includeNativeToken && chain?.nativeCurrency) {
      return {
        type: 'NATIVE',
        name: chain.nativeCurrency?.name,
        symbol: chain.nativeCurrency?.symbol,
        address: null,
        chainId: chain.id,
        decimals: chain.nativeCurrency?.decimals,
        logoURI: `${window.location.origin}${getChainIcon(chain.id)}`,
      };
    }

    return null;
  }, [chains, chainId, includeNativeToken]);

  return { tokens: nativeToken ? [nativeToken, ...tokens] : tokens };
};
