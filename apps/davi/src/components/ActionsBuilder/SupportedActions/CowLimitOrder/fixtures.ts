import { DecodedCall, SupportedAction } from 'components/ActionsBuilder/types';
import { BigNumber, utils } from 'ethers';
import { MOCK_ADDRESS } from 'hooks/Guilds/ens/fixtures';
import CowSettlement from 'contracts/CowSettlement.json';

const CowSettlementContract = new utils.Interface(CowSettlement.abi);

export const limitOrderDecodedCallMock: DecodedCall = {
  from: '0x0000000000000000000000000000000000000000',
  callType: SupportedAction.COW_SWAP_LIMIT_ORDER,
  function: CowSettlementContract.getFunction('setPreSignature'),
  to: '0xfFb1cd0F95368DDd06D556161c5D3d9f0f4Fe6d2',
  value: BigNumber.from(0),
  args: {
    orderUid: '',
    signed: '',
  },
  optionalProps: {
    sellAmount: BigNumber.from('5000000000000000000'),
    buyToken: MOCK_ADDRESS,
    sellToken: MOCK_ADDRESS,
    functionSignature: '',
  },
};
