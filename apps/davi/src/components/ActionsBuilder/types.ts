import { BigNumber } from 'ethers';
import { utils } from 'ethers';
import {
  RichContractData,
  RichContractFunction,
} from 'hooks/Guilds/contracts/useRichContractRegistry';

export enum SupportedAction {
  NATIVE_TRANSFER = 'NATIVE_TRANSFER',
  ERC20_APPROVE = 'ERC20_APPROVE',
  ERC20_TRANSFER = 'ERC20_TRANSFER',
  REP_MINT = 'REP_MINT',
  GENERIC_CALL = 'GENERIC_CALL', // rich contract generated action type
  SET_PERMISSIONS = 'SET_PERMISSIONS',
  ENS_UPDATE_CONTENT = 'ENS_UPDATE_CONTENT',
  RAW_TRANSACTION = 'RAW_TRANSACTION',
  SET_GUILD_CONFIG = 'SET_GUILD_CONFIG',
  COW_SWAP_LIMIT_ORDER = 'COW_SWAP_LIMIT_ORDER',
}

export interface Call {
  from: string;
  to: string;
  data?: string;
  value: BigNumber | string;
  approval?: ApproveSendTokens;
  functionName?: string;
  approvalCall?: Call;
  optionalProps?: Record<string, any>;
}

export interface DecodedCall {
  callType: SupportedAction;
  from: string;
  to: string;
  value: BigNumber | string;
  function?: utils.FunctionFragment;
  args: Record<string, any>;
  richData?: RichContractData;
  richFunctionData?: RichContractFunction;
  functionName?: string;
  functionTitle?: string;
  optionalProps?: Record<string, any>;
}

export interface DecodedAction {
  id: string;
  decodedCall: DecodedCall;
  contract: utils.Interface;
  approval?: ApproveSendTokens;
  simulationResult?: any;
  actionDenied?: boolean;
}

export interface Option {
  id: string;
  label: string;
  color: string;
  actions?: Call[];
  decodedActions?: DecodedAction[];
  permissions?: Permission[];
  totalVotes?: BigNumber;
  votePercentage?: number;
}

export interface ApproveSendTokens extends DecodedCall {
  amount?: BigNumber | string;
  token?: string;
  simulationResult?: any;
}

export interface Permission {
  from: string;
  to: string;
  functionSignature: string;
  callType?: SupportedAction;
}
