import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useHookStoreProvider } from 'stores';

export const useTokenData = () => {
  const {
    hooks: {
      fetchers: { useGuildConfig },
    },
  } = useHookStoreProvider();
  const { guildId } = useTypedParams();
  const { data } = useGuildConfig(guildId);
  const { data: tokenData } = useERC20Info(data?.token);
  return {
    tokenData,
  };
};
