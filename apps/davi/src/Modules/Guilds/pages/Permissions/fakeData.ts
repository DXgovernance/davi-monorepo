// !
// ! DELETE THIS FILE
// !

import { BigNumber } from 'ethers';
import {
  ANY_FUNC_SIGNATURE,
  ERC20_APPROVE_SIGNATURE,
  ERC20_TRANSFER_SIGNATURE,
  ZERO_ADDRESS,
} from 'utils';

export interface ISubgraphPermissionData {
  id: string;
  from: string;
  to: string;
  functionSignature: string;
  isToken: boolean;
  valueAllowed: BigNumber;
  fromTime: BigNumber;
  allowed: boolean;
  guild: string;
}

// Subgraph scheme
// type GuildPermission @entity {
//   id: ID!
//   from: String!
//   to: String!
//   functionSignature: Bytes!
//   isToken: Boolean!  //! <= New
//   valueAllowed: BigInt!
//   fromTime: BigInt!
//   allowed: Boolean!
//   guild: Guild
// }

const guildAddress = '0x3f842726188FcD932d43bcA291be28138228e6D9';

export const fakeDataTokens: ISubgraphPermissionData[] = [
  {
    // Native - xDAI
    id: '1',
    from: guildAddress,
    to: ZERO_ADDRESS,
    functionSignature: ANY_FUNC_SIGNATURE,
    isToken: true,
    valueAllowed: BigNumber.from('10000000000000000000000'),
    fromTime: BigNumber.from(1),
    allowed: true,
    guild: ZERO_ADDRESS,
  },
  {
    // WXDAI - approve
    id: '2',
    from: guildAddress,
    to: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    functionSignature: ERC20_APPROVE_SIGNATURE,
    isToken: true,
    valueAllowed: BigNumber.from(0),
    fromTime: BigNumber.from(1),
    allowed: true,
    guild: ZERO_ADDRESS,
  },
  {
    // WXDAI - transfer
    id: '3',
    from: guildAddress,
    to: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    functionSignature: ERC20_TRANSFER_SIGNATURE,
    isToken: true,
    valueAllowed: BigNumber.from(0),
    fromTime: BigNumber.from(1),
    allowed: true,
    guild: ZERO_ADDRESS,
  },
];

export const fakeDataFunctionCalls: ISubgraphPermissionData[] = [
  {
    // Random function signature
    id: '4',
    from: guildAddress,
    to: ZERO_ADDRESS,
    functionSignature: '0xbb29998e', // Random
    isToken: false,
    valueAllowed: BigNumber.from(0),
    fromTime: BigNumber.from(1),
    allowed: true,
    guild: ZERO_ADDRESS,
  },
];

/*
The idea is that we'll add an isToken boolean in the subgraph to filter
only the tokens, and only the function calls, so we don't have to do it
on the frontend.
*/
