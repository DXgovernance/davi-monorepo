import { TokenWithBalance } from 'hooks/Guilds/erc20/useAllERC20Balances';
import { TokenInfoWithType } from 'types/types';

export type TokenWithBalanceIndexable = TokenWithBalance & { id: string };

export interface TokenPickerProps {
  walletAddress?: `0x${string}`;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: TokenInfoWithType) => void;
  showNativeToken?: boolean;
}
