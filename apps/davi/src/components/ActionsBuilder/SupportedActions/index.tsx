import { BigNumber, utils } from 'ethers';
import {
  DecodedAction,
  DecodedCall,
  SupportedAction,
  ApproveSendTokens,
} from 'components/ActionsBuilder/types';
import ENSPublicResolver from 'contracts/ENSPublicResolver.json';
import ERC20 from 'contracts/ERC20.json';
import BaseERC20Guild from 'contracts/BaseERC20Guild.json';
import CowSettlement from 'contracts/CowSettlement.json';
import ERC20SnapshotRep from 'contracts/ERC20SnapshotRep.json';
import PermissionRegistry from 'contracts/PermissionRegistry.json';
import ERC20TransferEditor from './ERC20Transfer/ERC20TransferEditor';
import ERC20TransferInfoLine from './ERC20Transfer/ERC20TransferInfoLine';
import GenericCallInfoLine from './GenericCall/GenericCallInfoLine';
import RepMintEditor from './RepMint/RepMintEditor';
import RepMintInfoLine from './RepMint/RepMintInfoLine';
import SetPermissionsEditor from './SetPermissions/SetPermissionsEditor';
import SetPermissionsInfoLine from './SetPermissions/SetPermissionsInfoLine';
import UpdateENSContentEditor from './UpdateENSContent/UpdateENSContentEditor';
import UpdateENSContentSummary from './UpdateENSContent/UpdateENSContentSummary';
import UpdateENSContentInfoLine from './UpdateENSContent/UpdateENSContentInfoLine';
import SetGuildConfigInfoLine from './SetGuildConfig/SetGuildConfigInfoLine';
import SetGuildConfigEditor from './SetGuildConfig/SetGuildConfigEditor';
import Summary from './common/Summary';
import RawTransactionEditor from './RawTransaction/RawTransactionEditor';
import RawTransactionInfoLine from './RawTransaction/RawTransactionInfoLine';
import CowLimitOrderEditor from './CowLimitOrder/CowLimitOrderEditor';
import CowLimitOrderInfoLine from './CowLimitOrder/CowLimitOrderInfoLine';
import ERC20ApproveInfoLine from './ERC20Approve/ERC20ApproveInfoLine';

export interface SupportedActionMetadata {
  title: string;
}
export interface ActionViewProps {
  decodedCall: DecodedCall;
  approveSpendTokens?: ApproveSendTokens;
  compact?: boolean;
  noAvatar?: boolean;
}

export interface ActionEditorProps extends ActionViewProps {
  updateCall?: (updatedCall: DecodedCall) => void;
  onSubmit: (decodedCall: DecodedCall[]) => void;
  isEdit?: boolean;
}

type SupportedActionViews = {
  infoLineView: React.FC<ActionViewProps>;
  summaryView?: React.FC<ActionViewProps>;
};

type SupportedActionEditors = {
  editor: React.FC<ActionEditorProps>;
};

export const supportedActions: Record<
  SupportedAction,
  SupportedActionViews & SupportedActionEditors & SupportedActionMetadata
> = {
  [SupportedAction.NATIVE_TRANSFER]: {
    title: 'Transfer',
    infoLineView: ERC20TransferInfoLine,
    summaryView: Summary,
    editor: ERC20TransferEditor,
  },
  [SupportedAction.ERC20_APPROVE]: {
    title: 'Approve',
    infoLineView: ERC20ApproveInfoLine,
    editor: null,
  },
  [SupportedAction.ERC20_TRANSFER]: {
    title: 'Transfer',
    infoLineView: ERC20TransferInfoLine,
    summaryView: Summary,
    editor: ERC20TransferEditor,
  },
  [SupportedAction.REP_MINT]: {
    title: 'Mint Reputation',
    infoLineView: RepMintInfoLine,
    summaryView: Summary,
    editor: RepMintEditor,
  },
  [SupportedAction.GENERIC_CALL]: {
    title: 'Generic Call',
    infoLineView: GenericCallInfoLine,
    summaryView: Summary,
    editor: () => <div>Generic Call Editor</div>,
  },
  [SupportedAction.SET_PERMISSIONS]: {
    title: 'Set permissions',
    infoLineView: SetPermissionsInfoLine,
    summaryView: Summary,
    editor: SetPermissionsEditor,
  },
  [SupportedAction.ENS_UPDATE_CONTENT]: {
    title: 'Update ENS content',
    infoLineView: UpdateENSContentInfoLine,
    summaryView: UpdateENSContentSummary,
    editor: UpdateENSContentEditor,
  },
  [SupportedAction.RAW_TRANSACTION]: {
    title: 'Raw Transaction',
    infoLineView: RawTransactionInfoLine,
    editor: RawTransactionEditor,
  },
  [SupportedAction.SET_GUILD_CONFIG]: {
    title: 'Set Guild Config',
    infoLineView: SetGuildConfigInfoLine,
    summaryView: Summary,
    editor: SetGuildConfigEditor,
  },
  [SupportedAction.COW_SWAP_LIMIT_ORDER]: {
    title: 'Limit Order',
    infoLineView: CowLimitOrderInfoLine,
    editor: CowLimitOrderEditor,
  },
};
const ERC20Contract = new utils.Interface(ERC20.abi);
const BaseERC20GuildContract = new utils.Interface(BaseERC20Guild.abi);
const ERC20SnapshotRepContract = new utils.Interface(ERC20SnapshotRep.abi);
const ENSPublicResolverContract = new utils.Interface(ENSPublicResolver.abi);
const PermissionRegistryContract = new utils.Interface(PermissionRegistry.abi);
const CowSettlementContract = new utils.Interface(CowSettlement.abi);

export const defaultValues: Record<SupportedAction, DecodedAction> = {
  [SupportedAction.NATIVE_TRANSFER]: {
    id: '',
    contract: null,
    decodedCall: {
      from: '',
      callType: SupportedAction.NATIVE_TRANSFER,
      function: null,
      to: '',
      value: '',
      args: null,
    },
  },
  [SupportedAction.ERC20_APPROVE]: {
    id: '',
    contract: ERC20Contract,
    decodedCall: {
      from: '',
      callType: SupportedAction.ERC20_APPROVE,
      function: ERC20Contract.getFunction('approve'),
      to: '',
      args: {
        spender: '',
        amount: '',
      },
      value: BigNumber.from(0),
      optionalProps: {
        functionSignature: ''
      },
    },
  },
  [SupportedAction.ERC20_TRANSFER]: {
    id: '',
    contract: ERC20Contract,
    decodedCall: {
      from: '',
      callType: SupportedAction.ERC20_TRANSFER,
      function: ERC20Contract.getFunction('transfer'),
      to: '',
      value: BigNumber.from(0),
      args: {
        recipient: '',
        amount: '',
      },
    },
  },
  [SupportedAction.REP_MINT]: {
    id: '',
    contract: ERC20SnapshotRepContract,
    decodedCall: {
      from: '',
      callType: SupportedAction.REP_MINT,
      function: ERC20SnapshotRepContract.getFunction('mint'),
      to: '',
      value: BigNumber.from(0),
      args: {
        to: '',
        amount: '',
      },
    },
  },
  [SupportedAction.GENERIC_CALL]: {
    id: '',
    contract: null,
    decodedCall: {
      from: '',
      callType: SupportedAction.GENERIC_CALL,
      function: null,
      to: '',
      args: {},
      value: '',
    },
  },
  [SupportedAction.SET_PERMISSIONS]: {
    id: '',
    contract: PermissionRegistryContract,
    decodedCall: {
      from: '',
      callType: SupportedAction.SET_PERMISSIONS,
      function: PermissionRegistryContract.getFunction('setETHPermission'),
      to: '',
      value: BigNumber.from(0),
      args: {
        to: '',
        functionSignature: '',
        valueAllowed: '',
        allowed: true,
      },
      optionalProps: {
        asset: '',
        functionName: '',
        tab: 0,
      },
    },
  },
  [SupportedAction.ENS_UPDATE_CONTENT]: {
    id: '',
    contract: ENSPublicResolverContract,
    decodedCall: {
      from: '',
      callType: SupportedAction.ENS_UPDATE_CONTENT,
      function: ENSPublicResolverContract.getFunction('setContenthash'),
      to: '',
      value: BigNumber.from(0),
      args: {
        node: '',
        hash: '',
      },
      optionalProps: {
        ensName: '',
        ipfsHash: '',
      },
    },
  },
  [SupportedAction.RAW_TRANSACTION]: {
    id: '',
    contract: null,
    decodedCall: {
      from: '',
      callType: SupportedAction.RAW_TRANSACTION,
      function: null,
      to: '',
      args: {},
      value: BigNumber.from(0),
      optionalProps: {
        data: '',
      },
    },
  },
  [SupportedAction.SET_GUILD_CONFIG]: {
    id: '',
    contract: BaseERC20GuildContract,
    decodedCall: {
      from: '',
      callType: SupportedAction.SET_GUILD_CONFIG,
      function: BaseERC20GuildContract.getFunction('setConfig'),
      to: '',
      value: BigNumber.from(0),
      args: {
        _proposalTime: '',
        _timeForExecution: '',
        _votingPowerPercentageForProposalExecution: '',
        _votingPowerPercentageForProposalCreation: '',
        _voteGas: '',
        _maxGasPrice: '',
        _maxActiveProposals: '',
        _lockTime: '',
        _minimumMembersForProposalCreation: '',
        _minimumTokensLockedForProposalCreation: '',
      },
      optionalProps: {},
    },
  },
  [SupportedAction.COW_SWAP_LIMIT_ORDER]: {
    id: '',
    contract: CowSettlementContract,
    decodedCall: {
      from: '',
      callType: SupportedAction.COW_SWAP_LIMIT_ORDER,
      function: CowSettlementContract.getFunction('setPreSignature'),
      to: '',
      args: {
        orderUid: '',
        signed: '',
      },
      value: BigNumber.from(0),
      optionalProps: {
        sellAmount: '',
        buyToken: '',
        sellToken: '',
        to: '',
        functionSignature: '',
      },
    },
  },
};

export const getInfoLineView = (actionType: SupportedAction) => {
  if (actionType == null) return null;

  return supportedActions[actionType].infoLineView;
};

export const getSummaryView = (actionType: SupportedAction) => {
  if (actionType == null) return null;

  return supportedActions[actionType].summaryView;
};

export const getEditor = (actionType: SupportedAction) => {
  if (actionType == null) return null;

  return supportedActions[actionType].editor;
};
