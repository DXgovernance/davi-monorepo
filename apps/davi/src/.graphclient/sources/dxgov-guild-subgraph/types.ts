// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace DxgovGuildSubgraphTypes {
  export type Maybe<T> = T | null;
  export type InputMaybe<T> = Maybe<T>;
  export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
  };
  export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
  };
  export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
  };
  /** All built-in and custom scalars, mapped to their actual values */
  export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: any;
    BigInt: any;
    Bytes: any;
  };

  export type Action = {
    id: Scalars['ID'];
    optionId: Scalars['String'];
    to: Scalars['String'];
    data: Scalars['String'];
    value: Scalars['BigInt'];
    from: Scalars['String'];
  };

  export type Action_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    optionId?: InputMaybe<Scalars['String']>;
    optionId_not?: InputMaybe<Scalars['String']>;
    optionId_gt?: InputMaybe<Scalars['String']>;
    optionId_lt?: InputMaybe<Scalars['String']>;
    optionId_gte?: InputMaybe<Scalars['String']>;
    optionId_lte?: InputMaybe<Scalars['String']>;
    optionId_in?: InputMaybe<Array<Scalars['String']>>;
    optionId_not_in?: InputMaybe<Array<Scalars['String']>>;
    optionId_contains?: InputMaybe<Scalars['String']>;
    optionId_contains_nocase?: InputMaybe<Scalars['String']>;
    optionId_not_contains?: InputMaybe<Scalars['String']>;
    optionId_not_contains_nocase?: InputMaybe<Scalars['String']>;
    optionId_starts_with?: InputMaybe<Scalars['String']>;
    optionId_starts_with_nocase?: InputMaybe<Scalars['String']>;
    optionId_not_starts_with?: InputMaybe<Scalars['String']>;
    optionId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    optionId_ends_with?: InputMaybe<Scalars['String']>;
    optionId_ends_with_nocase?: InputMaybe<Scalars['String']>;
    optionId_not_ends_with?: InputMaybe<Scalars['String']>;
    optionId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    to?: InputMaybe<Scalars['String']>;
    to_not?: InputMaybe<Scalars['String']>;
    to_gt?: InputMaybe<Scalars['String']>;
    to_lt?: InputMaybe<Scalars['String']>;
    to_gte?: InputMaybe<Scalars['String']>;
    to_lte?: InputMaybe<Scalars['String']>;
    to_in?: InputMaybe<Array<Scalars['String']>>;
    to_not_in?: InputMaybe<Array<Scalars['String']>>;
    to_contains?: InputMaybe<Scalars['String']>;
    to_contains_nocase?: InputMaybe<Scalars['String']>;
    to_not_contains?: InputMaybe<Scalars['String']>;
    to_not_contains_nocase?: InputMaybe<Scalars['String']>;
    to_starts_with?: InputMaybe<Scalars['String']>;
    to_starts_with_nocase?: InputMaybe<Scalars['String']>;
    to_not_starts_with?: InputMaybe<Scalars['String']>;
    to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    to_ends_with?: InputMaybe<Scalars['String']>;
    to_ends_with_nocase?: InputMaybe<Scalars['String']>;
    to_not_ends_with?: InputMaybe<Scalars['String']>;
    to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    data?: InputMaybe<Scalars['String']>;
    data_not?: InputMaybe<Scalars['String']>;
    data_gt?: InputMaybe<Scalars['String']>;
    data_lt?: InputMaybe<Scalars['String']>;
    data_gte?: InputMaybe<Scalars['String']>;
    data_lte?: InputMaybe<Scalars['String']>;
    data_in?: InputMaybe<Array<Scalars['String']>>;
    data_not_in?: InputMaybe<Array<Scalars['String']>>;
    data_contains?: InputMaybe<Scalars['String']>;
    data_contains_nocase?: InputMaybe<Scalars['String']>;
    data_not_contains?: InputMaybe<Scalars['String']>;
    data_not_contains_nocase?: InputMaybe<Scalars['String']>;
    data_starts_with?: InputMaybe<Scalars['String']>;
    data_starts_with_nocase?: InputMaybe<Scalars['String']>;
    data_not_starts_with?: InputMaybe<Scalars['String']>;
    data_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    data_ends_with?: InputMaybe<Scalars['String']>;
    data_ends_with_nocase?: InputMaybe<Scalars['String']>;
    data_not_ends_with?: InputMaybe<Scalars['String']>;
    data_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    value?: InputMaybe<Scalars['BigInt']>;
    value_not?: InputMaybe<Scalars['BigInt']>;
    value_gt?: InputMaybe<Scalars['BigInt']>;
    value_lt?: InputMaybe<Scalars['BigInt']>;
    value_gte?: InputMaybe<Scalars['BigInt']>;
    value_lte?: InputMaybe<Scalars['BigInt']>;
    value_in?: InputMaybe<Array<Scalars['BigInt']>>;
    value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    from?: InputMaybe<Scalars['String']>;
    from_not?: InputMaybe<Scalars['String']>;
    from_gt?: InputMaybe<Scalars['String']>;
    from_lt?: InputMaybe<Scalars['String']>;
    from_gte?: InputMaybe<Scalars['String']>;
    from_lte?: InputMaybe<Scalars['String']>;
    from_in?: InputMaybe<Array<Scalars['String']>>;
    from_not_in?: InputMaybe<Array<Scalars['String']>>;
    from_contains?: InputMaybe<Scalars['String']>;
    from_contains_nocase?: InputMaybe<Scalars['String']>;
    from_not_contains?: InputMaybe<Scalars['String']>;
    from_not_contains_nocase?: InputMaybe<Scalars['String']>;
    from_starts_with?: InputMaybe<Scalars['String']>;
    from_starts_with_nocase?: InputMaybe<Scalars['String']>;
    from_not_starts_with?: InputMaybe<Scalars['String']>;
    from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    from_ends_with?: InputMaybe<Scalars['String']>;
    from_ends_with_nocase?: InputMaybe<Scalars['String']>;
    from_not_ends_with?: InputMaybe<Scalars['String']>;
    from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Action_orderBy =
    | 'id'
    | 'optionId'
    | 'to'
    | 'data'
    | 'value'
    | 'from';

  export type BlockChangedFilter = {
    number_gte: Scalars['Int'];
  };

  export type Block_height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
  };

  export type Guild = {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    token?: Maybe<Token>;
    permissionRegistry?: Maybe<Scalars['String']>;
    proposalTime?: Maybe<Scalars['BigInt']>;
    lockTime?: Maybe<Scalars['BigInt']>;
    timeForExecution?: Maybe<Scalars['BigInt']>;
    votingPowerForProposalCreation?: Maybe<Scalars['BigInt']>;
    votingPowerForProposalExecution?: Maybe<Scalars['BigInt']>;
    voteGas?: Maybe<Scalars['BigInt']>;
    maxGasPrice?: Maybe<Scalars['BigInt']>;
    maxActiveProposals?: Maybe<Scalars['BigInt']>;
    minimumMembersForProposalCreation?: Maybe<Scalars['BigInt']>;
    minimumTokensLockedForProposalCreation?: Maybe<Scalars['BigInt']>;
    type?: Maybe<GuildType>;
    permissions: Array<GuildPermission>;
    proposals?: Maybe<Array<Proposal>>;
    members?: Maybe<Array<Member>>;
    isActive?: Maybe<Scalars['Boolean']>;
    bytecodeHash?: Maybe<Scalars['String']>;
  };

  export type GuildpermissionsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<GuildPermission_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<GuildPermission_filter>;
  };

  export type GuildproposalsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Proposal_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Proposal_filter>;
  };

  export type GuildmembersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Member_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Member_filter>;
  };

  export type GuildPermission = {
    id: Scalars['ID'];
    from: Scalars['String'];
    to: Scalars['String'];
    functionSignature: Scalars['Bytes'];
    valueAllowed: Scalars['BigInt'];
    fromTime: Scalars['BigInt'];
    allowed: Scalars['Boolean'];
    guild?: Maybe<Guild>;
  };

  export type GuildPermission_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    from?: InputMaybe<Scalars['String']>;
    from_not?: InputMaybe<Scalars['String']>;
    from_gt?: InputMaybe<Scalars['String']>;
    from_lt?: InputMaybe<Scalars['String']>;
    from_gte?: InputMaybe<Scalars['String']>;
    from_lte?: InputMaybe<Scalars['String']>;
    from_in?: InputMaybe<Array<Scalars['String']>>;
    from_not_in?: InputMaybe<Array<Scalars['String']>>;
    from_contains?: InputMaybe<Scalars['String']>;
    from_contains_nocase?: InputMaybe<Scalars['String']>;
    from_not_contains?: InputMaybe<Scalars['String']>;
    from_not_contains_nocase?: InputMaybe<Scalars['String']>;
    from_starts_with?: InputMaybe<Scalars['String']>;
    from_starts_with_nocase?: InputMaybe<Scalars['String']>;
    from_not_starts_with?: InputMaybe<Scalars['String']>;
    from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    from_ends_with?: InputMaybe<Scalars['String']>;
    from_ends_with_nocase?: InputMaybe<Scalars['String']>;
    from_not_ends_with?: InputMaybe<Scalars['String']>;
    from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    to?: InputMaybe<Scalars['String']>;
    to_not?: InputMaybe<Scalars['String']>;
    to_gt?: InputMaybe<Scalars['String']>;
    to_lt?: InputMaybe<Scalars['String']>;
    to_gte?: InputMaybe<Scalars['String']>;
    to_lte?: InputMaybe<Scalars['String']>;
    to_in?: InputMaybe<Array<Scalars['String']>>;
    to_not_in?: InputMaybe<Array<Scalars['String']>>;
    to_contains?: InputMaybe<Scalars['String']>;
    to_contains_nocase?: InputMaybe<Scalars['String']>;
    to_not_contains?: InputMaybe<Scalars['String']>;
    to_not_contains_nocase?: InputMaybe<Scalars['String']>;
    to_starts_with?: InputMaybe<Scalars['String']>;
    to_starts_with_nocase?: InputMaybe<Scalars['String']>;
    to_not_starts_with?: InputMaybe<Scalars['String']>;
    to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    to_ends_with?: InputMaybe<Scalars['String']>;
    to_ends_with_nocase?: InputMaybe<Scalars['String']>;
    to_not_ends_with?: InputMaybe<Scalars['String']>;
    to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    functionSignature?: InputMaybe<Scalars['Bytes']>;
    functionSignature_not?: InputMaybe<Scalars['Bytes']>;
    functionSignature_in?: InputMaybe<Array<Scalars['Bytes']>>;
    functionSignature_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    functionSignature_contains?: InputMaybe<Scalars['Bytes']>;
    functionSignature_not_contains?: InputMaybe<Scalars['Bytes']>;
    valueAllowed?: InputMaybe<Scalars['BigInt']>;
    valueAllowed_not?: InputMaybe<Scalars['BigInt']>;
    valueAllowed_gt?: InputMaybe<Scalars['BigInt']>;
    valueAllowed_lt?: InputMaybe<Scalars['BigInt']>;
    valueAllowed_gte?: InputMaybe<Scalars['BigInt']>;
    valueAllowed_lte?: InputMaybe<Scalars['BigInt']>;
    valueAllowed_in?: InputMaybe<Array<Scalars['BigInt']>>;
    valueAllowed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    fromTime?: InputMaybe<Scalars['BigInt']>;
    fromTime_not?: InputMaybe<Scalars['BigInt']>;
    fromTime_gt?: InputMaybe<Scalars['BigInt']>;
    fromTime_lt?: InputMaybe<Scalars['BigInt']>;
    fromTime_gte?: InputMaybe<Scalars['BigInt']>;
    fromTime_lte?: InputMaybe<Scalars['BigInt']>;
    fromTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
    fromTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    allowed?: InputMaybe<Scalars['Boolean']>;
    allowed_not?: InputMaybe<Scalars['Boolean']>;
    allowed_in?: InputMaybe<Array<Scalars['Boolean']>>;
    allowed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    guild?: InputMaybe<Scalars['String']>;
    guild_not?: InputMaybe<Scalars['String']>;
    guild_gt?: InputMaybe<Scalars['String']>;
    guild_lt?: InputMaybe<Scalars['String']>;
    guild_gte?: InputMaybe<Scalars['String']>;
    guild_lte?: InputMaybe<Scalars['String']>;
    guild_in?: InputMaybe<Array<Scalars['String']>>;
    guild_not_in?: InputMaybe<Array<Scalars['String']>>;
    guild_contains?: InputMaybe<Scalars['String']>;
    guild_contains_nocase?: InputMaybe<Scalars['String']>;
    guild_not_contains?: InputMaybe<Scalars['String']>;
    guild_not_contains_nocase?: InputMaybe<Scalars['String']>;
    guild_starts_with?: InputMaybe<Scalars['String']>;
    guild_starts_with_nocase?: InputMaybe<Scalars['String']>;
    guild_not_starts_with?: InputMaybe<Scalars['String']>;
    guild_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    guild_ends_with?: InputMaybe<Scalars['String']>;
    guild_ends_with_nocase?: InputMaybe<Scalars['String']>;
    guild_not_ends_with?: InputMaybe<Scalars['String']>;
    guild_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    guild_?: InputMaybe<Guild_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type GuildPermission_orderBy =
    | 'id'
    | 'from'
    | 'to'
    | 'functionSignature'
    | 'valueAllowed'
    | 'fromTime'
    | 'allowed'
    | 'guild';

  export type GuildType =
    | 'ERC20Guild'
    | 'DXDGuild'
    | 'SnapshotRepERC20Guild'
    | 'SnapshotERC20Guild';

  export type Guild_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    name?: InputMaybe<Scalars['String']>;
    name_not?: InputMaybe<Scalars['String']>;
    name_gt?: InputMaybe<Scalars['String']>;
    name_lt?: InputMaybe<Scalars['String']>;
    name_gte?: InputMaybe<Scalars['String']>;
    name_lte?: InputMaybe<Scalars['String']>;
    name_in?: InputMaybe<Array<Scalars['String']>>;
    name_not_in?: InputMaybe<Array<Scalars['String']>>;
    name_contains?: InputMaybe<Scalars['String']>;
    name_contains_nocase?: InputMaybe<Scalars['String']>;
    name_not_contains?: InputMaybe<Scalars['String']>;
    name_not_contains_nocase?: InputMaybe<Scalars['String']>;
    name_starts_with?: InputMaybe<Scalars['String']>;
    name_starts_with_nocase?: InputMaybe<Scalars['String']>;
    name_not_starts_with?: InputMaybe<Scalars['String']>;
    name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    name_ends_with?: InputMaybe<Scalars['String']>;
    name_ends_with_nocase?: InputMaybe<Scalars['String']>;
    name_not_ends_with?: InputMaybe<Scalars['String']>;
    name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    token?: InputMaybe<Scalars['String']>;
    token_not?: InputMaybe<Scalars['String']>;
    token_gt?: InputMaybe<Scalars['String']>;
    token_lt?: InputMaybe<Scalars['String']>;
    token_gte?: InputMaybe<Scalars['String']>;
    token_lte?: InputMaybe<Scalars['String']>;
    token_in?: InputMaybe<Array<Scalars['String']>>;
    token_not_in?: InputMaybe<Array<Scalars['String']>>;
    token_contains?: InputMaybe<Scalars['String']>;
    token_contains_nocase?: InputMaybe<Scalars['String']>;
    token_not_contains?: InputMaybe<Scalars['String']>;
    token_not_contains_nocase?: InputMaybe<Scalars['String']>;
    token_starts_with?: InputMaybe<Scalars['String']>;
    token_starts_with_nocase?: InputMaybe<Scalars['String']>;
    token_not_starts_with?: InputMaybe<Scalars['String']>;
    token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    token_ends_with?: InputMaybe<Scalars['String']>;
    token_ends_with_nocase?: InputMaybe<Scalars['String']>;
    token_not_ends_with?: InputMaybe<Scalars['String']>;
    token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    token_?: InputMaybe<Token_filter>;
    permissionRegistry?: InputMaybe<Scalars['String']>;
    permissionRegistry_not?: InputMaybe<Scalars['String']>;
    permissionRegistry_gt?: InputMaybe<Scalars['String']>;
    permissionRegistry_lt?: InputMaybe<Scalars['String']>;
    permissionRegistry_gte?: InputMaybe<Scalars['String']>;
    permissionRegistry_lte?: InputMaybe<Scalars['String']>;
    permissionRegistry_in?: InputMaybe<Array<Scalars['String']>>;
    permissionRegistry_not_in?: InputMaybe<Array<Scalars['String']>>;
    permissionRegistry_contains?: InputMaybe<Scalars['String']>;
    permissionRegistry_contains_nocase?: InputMaybe<Scalars['String']>;
    permissionRegistry_not_contains?: InputMaybe<Scalars['String']>;
    permissionRegistry_not_contains_nocase?: InputMaybe<Scalars['String']>;
    permissionRegistry_starts_with?: InputMaybe<Scalars['String']>;
    permissionRegistry_starts_with_nocase?: InputMaybe<Scalars['String']>;
    permissionRegistry_not_starts_with?: InputMaybe<Scalars['String']>;
    permissionRegistry_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    permissionRegistry_ends_with?: InputMaybe<Scalars['String']>;
    permissionRegistry_ends_with_nocase?: InputMaybe<Scalars['String']>;
    permissionRegistry_not_ends_with?: InputMaybe<Scalars['String']>;
    permissionRegistry_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    proposalTime?: InputMaybe<Scalars['BigInt']>;
    proposalTime_not?: InputMaybe<Scalars['BigInt']>;
    proposalTime_gt?: InputMaybe<Scalars['BigInt']>;
    proposalTime_lt?: InputMaybe<Scalars['BigInt']>;
    proposalTime_gte?: InputMaybe<Scalars['BigInt']>;
    proposalTime_lte?: InputMaybe<Scalars['BigInt']>;
    proposalTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
    proposalTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lockTime?: InputMaybe<Scalars['BigInt']>;
    lockTime_not?: InputMaybe<Scalars['BigInt']>;
    lockTime_gt?: InputMaybe<Scalars['BigInt']>;
    lockTime_lt?: InputMaybe<Scalars['BigInt']>;
    lockTime_gte?: InputMaybe<Scalars['BigInt']>;
    lockTime_lte?: InputMaybe<Scalars['BigInt']>;
    lockTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lockTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timeForExecution?: InputMaybe<Scalars['BigInt']>;
    timeForExecution_not?: InputMaybe<Scalars['BigInt']>;
    timeForExecution_gt?: InputMaybe<Scalars['BigInt']>;
    timeForExecution_lt?: InputMaybe<Scalars['BigInt']>;
    timeForExecution_gte?: InputMaybe<Scalars['BigInt']>;
    timeForExecution_lte?: InputMaybe<Scalars['BigInt']>;
    timeForExecution_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timeForExecution_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    votingPowerForProposalCreation?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalCreation_not?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalCreation_gt?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalCreation_lt?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalCreation_gte?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalCreation_lte?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalCreation_in?: InputMaybe<Array<Scalars['BigInt']>>;
    votingPowerForProposalCreation_not_in?: InputMaybe<
      Array<Scalars['BigInt']>
    >;
    votingPowerForProposalExecution?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalExecution_not?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalExecution_gt?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalExecution_lt?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalExecution_gte?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalExecution_lte?: InputMaybe<Scalars['BigInt']>;
    votingPowerForProposalExecution_in?: InputMaybe<Array<Scalars['BigInt']>>;
    votingPowerForProposalExecution_not_in?: InputMaybe<
      Array<Scalars['BigInt']>
    >;
    voteGas?: InputMaybe<Scalars['BigInt']>;
    voteGas_not?: InputMaybe<Scalars['BigInt']>;
    voteGas_gt?: InputMaybe<Scalars['BigInt']>;
    voteGas_lt?: InputMaybe<Scalars['BigInt']>;
    voteGas_gte?: InputMaybe<Scalars['BigInt']>;
    voteGas_lte?: InputMaybe<Scalars['BigInt']>;
    voteGas_in?: InputMaybe<Array<Scalars['BigInt']>>;
    voteGas_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    maxGasPrice?: InputMaybe<Scalars['BigInt']>;
    maxGasPrice_not?: InputMaybe<Scalars['BigInt']>;
    maxGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
    maxGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
    maxGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
    maxGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
    maxGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
    maxGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    maxActiveProposals?: InputMaybe<Scalars['BigInt']>;
    maxActiveProposals_not?: InputMaybe<Scalars['BigInt']>;
    maxActiveProposals_gt?: InputMaybe<Scalars['BigInt']>;
    maxActiveProposals_lt?: InputMaybe<Scalars['BigInt']>;
    maxActiveProposals_gte?: InputMaybe<Scalars['BigInt']>;
    maxActiveProposals_lte?: InputMaybe<Scalars['BigInt']>;
    maxActiveProposals_in?: InputMaybe<Array<Scalars['BigInt']>>;
    maxActiveProposals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    minimumMembersForProposalCreation?: InputMaybe<Scalars['BigInt']>;
    minimumMembersForProposalCreation_not?: InputMaybe<Scalars['BigInt']>;
    minimumMembersForProposalCreation_gt?: InputMaybe<Scalars['BigInt']>;
    minimumMembersForProposalCreation_lt?: InputMaybe<Scalars['BigInt']>;
    minimumMembersForProposalCreation_gte?: InputMaybe<Scalars['BigInt']>;
    minimumMembersForProposalCreation_lte?: InputMaybe<Scalars['BigInt']>;
    minimumMembersForProposalCreation_in?: InputMaybe<Array<Scalars['BigInt']>>;
    minimumMembersForProposalCreation_not_in?: InputMaybe<
      Array<Scalars['BigInt']>
    >;
    minimumTokensLockedForProposalCreation?: InputMaybe<Scalars['BigInt']>;
    minimumTokensLockedForProposalCreation_not?: InputMaybe<Scalars['BigInt']>;
    minimumTokensLockedForProposalCreation_gt?: InputMaybe<Scalars['BigInt']>;
    minimumTokensLockedForProposalCreation_lt?: InputMaybe<Scalars['BigInt']>;
    minimumTokensLockedForProposalCreation_gte?: InputMaybe<Scalars['BigInt']>;
    minimumTokensLockedForProposalCreation_lte?: InputMaybe<Scalars['BigInt']>;
    minimumTokensLockedForProposalCreation_in?: InputMaybe<
      Array<Scalars['BigInt']>
    >;
    minimumTokensLockedForProposalCreation_not_in?: InputMaybe<
      Array<Scalars['BigInt']>
    >;
    type?: InputMaybe<GuildType>;
    type_not?: InputMaybe<GuildType>;
    type_in?: InputMaybe<Array<GuildType>>;
    type_not_in?: InputMaybe<Array<GuildType>>;
    permissions_?: InputMaybe<GuildPermission_filter>;
    proposals?: InputMaybe<Array<Scalars['String']>>;
    proposals_not?: InputMaybe<Array<Scalars['String']>>;
    proposals_contains?: InputMaybe<Array<Scalars['String']>>;
    proposals_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    proposals_not_contains?: InputMaybe<Array<Scalars['String']>>;
    proposals_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    proposals_?: InputMaybe<Proposal_filter>;
    members?: InputMaybe<Array<Scalars['String']>>;
    members_not?: InputMaybe<Array<Scalars['String']>>;
    members_contains?: InputMaybe<Array<Scalars['String']>>;
    members_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    members_not_contains?: InputMaybe<Array<Scalars['String']>>;
    members_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    members_?: InputMaybe<Member_filter>;
    isActive?: InputMaybe<Scalars['Boolean']>;
    isActive_not?: InputMaybe<Scalars['Boolean']>;
    isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
    isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    bytecodeHash?: InputMaybe<Scalars['String']>;
    bytecodeHash_not?: InputMaybe<Scalars['String']>;
    bytecodeHash_gt?: InputMaybe<Scalars['String']>;
    bytecodeHash_lt?: InputMaybe<Scalars['String']>;
    bytecodeHash_gte?: InputMaybe<Scalars['String']>;
    bytecodeHash_lte?: InputMaybe<Scalars['String']>;
    bytecodeHash_in?: InputMaybe<Array<Scalars['String']>>;
    bytecodeHash_not_in?: InputMaybe<Array<Scalars['String']>>;
    bytecodeHash_contains?: InputMaybe<Scalars['String']>;
    bytecodeHash_contains_nocase?: InputMaybe<Scalars['String']>;
    bytecodeHash_not_contains?: InputMaybe<Scalars['String']>;
    bytecodeHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
    bytecodeHash_starts_with?: InputMaybe<Scalars['String']>;
    bytecodeHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
    bytecodeHash_not_starts_with?: InputMaybe<Scalars['String']>;
    bytecodeHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    bytecodeHash_ends_with?: InputMaybe<Scalars['String']>;
    bytecodeHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
    bytecodeHash_not_ends_with?: InputMaybe<Scalars['String']>;
    bytecodeHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Guild_orderBy =
    | 'id'
    | 'name'
    | 'token'
    | 'permissionRegistry'
    | 'proposalTime'
    | 'lockTime'
    | 'timeForExecution'
    | 'votingPowerForProposalCreation'
    | 'votingPowerForProposalExecution'
    | 'voteGas'
    | 'maxGasPrice'
    | 'maxActiveProposals'
    | 'minimumMembersForProposalCreation'
    | 'minimumTokensLockedForProposalCreation'
    | 'type'
    | 'permissions'
    | 'proposals'
    | 'members'
    | 'isActive'
    | 'bytecodeHash';

  export type Member = {
    id: Scalars['ID'];
    address: Scalars['String'];
    tokensLocked: Scalars['BigInt'];
  };

  export type Member_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    address?: InputMaybe<Scalars['String']>;
    address_not?: InputMaybe<Scalars['String']>;
    address_gt?: InputMaybe<Scalars['String']>;
    address_lt?: InputMaybe<Scalars['String']>;
    address_gte?: InputMaybe<Scalars['String']>;
    address_lte?: InputMaybe<Scalars['String']>;
    address_in?: InputMaybe<Array<Scalars['String']>>;
    address_not_in?: InputMaybe<Array<Scalars['String']>>;
    address_contains?: InputMaybe<Scalars['String']>;
    address_contains_nocase?: InputMaybe<Scalars['String']>;
    address_not_contains?: InputMaybe<Scalars['String']>;
    address_not_contains_nocase?: InputMaybe<Scalars['String']>;
    address_starts_with?: InputMaybe<Scalars['String']>;
    address_starts_with_nocase?: InputMaybe<Scalars['String']>;
    address_not_starts_with?: InputMaybe<Scalars['String']>;
    address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    address_ends_with?: InputMaybe<Scalars['String']>;
    address_ends_with_nocase?: InputMaybe<Scalars['String']>;
    address_not_ends_with?: InputMaybe<Scalars['String']>;
    address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    tokensLocked?: InputMaybe<Scalars['BigInt']>;
    tokensLocked_not?: InputMaybe<Scalars['BigInt']>;
    tokensLocked_gt?: InputMaybe<Scalars['BigInt']>;
    tokensLocked_lt?: InputMaybe<Scalars['BigInt']>;
    tokensLocked_gte?: InputMaybe<Scalars['BigInt']>;
    tokensLocked_lte?: InputMaybe<Scalars['BigInt']>;
    tokensLocked_in?: InputMaybe<Array<Scalars['BigInt']>>;
    tokensLocked_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Member_orderBy = 'id' | 'address' | 'tokensLocked';

  export type Option = {
    id: Scalars['ID'];
    label?: Maybe<Scalars['String']>;
    proposalId?: Maybe<Scalars['String']>;
    actions?: Maybe<Array<Action>>;
    voteAmount?: Maybe<Scalars['BigInt']>;
    votes: Array<Vote>;
  };

  export type OptionactionsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Action_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Action_filter>;
  };

  export type OptionvotesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Vote_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Vote_filter>;
  };

  export type Option_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    label?: InputMaybe<Scalars['String']>;
    label_not?: InputMaybe<Scalars['String']>;
    label_gt?: InputMaybe<Scalars['String']>;
    label_lt?: InputMaybe<Scalars['String']>;
    label_gte?: InputMaybe<Scalars['String']>;
    label_lte?: InputMaybe<Scalars['String']>;
    label_in?: InputMaybe<Array<Scalars['String']>>;
    label_not_in?: InputMaybe<Array<Scalars['String']>>;
    label_contains?: InputMaybe<Scalars['String']>;
    label_contains_nocase?: InputMaybe<Scalars['String']>;
    label_not_contains?: InputMaybe<Scalars['String']>;
    label_not_contains_nocase?: InputMaybe<Scalars['String']>;
    label_starts_with?: InputMaybe<Scalars['String']>;
    label_starts_with_nocase?: InputMaybe<Scalars['String']>;
    label_not_starts_with?: InputMaybe<Scalars['String']>;
    label_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    label_ends_with?: InputMaybe<Scalars['String']>;
    label_ends_with_nocase?: InputMaybe<Scalars['String']>;
    label_not_ends_with?: InputMaybe<Scalars['String']>;
    label_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    proposalId?: InputMaybe<Scalars['String']>;
    proposalId_not?: InputMaybe<Scalars['String']>;
    proposalId_gt?: InputMaybe<Scalars['String']>;
    proposalId_lt?: InputMaybe<Scalars['String']>;
    proposalId_gte?: InputMaybe<Scalars['String']>;
    proposalId_lte?: InputMaybe<Scalars['String']>;
    proposalId_in?: InputMaybe<Array<Scalars['String']>>;
    proposalId_not_in?: InputMaybe<Array<Scalars['String']>>;
    proposalId_contains?: InputMaybe<Scalars['String']>;
    proposalId_contains_nocase?: InputMaybe<Scalars['String']>;
    proposalId_not_contains?: InputMaybe<Scalars['String']>;
    proposalId_not_contains_nocase?: InputMaybe<Scalars['String']>;
    proposalId_starts_with?: InputMaybe<Scalars['String']>;
    proposalId_starts_with_nocase?: InputMaybe<Scalars['String']>;
    proposalId_not_starts_with?: InputMaybe<Scalars['String']>;
    proposalId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    proposalId_ends_with?: InputMaybe<Scalars['String']>;
    proposalId_ends_with_nocase?: InputMaybe<Scalars['String']>;
    proposalId_not_ends_with?: InputMaybe<Scalars['String']>;
    proposalId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    actions?: InputMaybe<Array<Scalars['String']>>;
    actions_not?: InputMaybe<Array<Scalars['String']>>;
    actions_contains?: InputMaybe<Array<Scalars['String']>>;
    actions_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    actions_not_contains?: InputMaybe<Array<Scalars['String']>>;
    actions_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    actions_?: InputMaybe<Action_filter>;
    voteAmount?: InputMaybe<Scalars['BigInt']>;
    voteAmount_not?: InputMaybe<Scalars['BigInt']>;
    voteAmount_gt?: InputMaybe<Scalars['BigInt']>;
    voteAmount_lt?: InputMaybe<Scalars['BigInt']>;
    voteAmount_gte?: InputMaybe<Scalars['BigInt']>;
    voteAmount_lte?: InputMaybe<Scalars['BigInt']>;
    voteAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    voteAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    votes?: InputMaybe<Array<Scalars['String']>>;
    votes_not?: InputMaybe<Array<Scalars['String']>>;
    votes_contains?: InputMaybe<Array<Scalars['String']>>;
    votes_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    votes_not_contains?: InputMaybe<Array<Scalars['String']>>;
    votes_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    votes_?: InputMaybe<Vote_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Option_orderBy =
    | 'id'
    | 'label'
    | 'proposalId'
    | 'actions'
    | 'voteAmount'
    | 'votes';

  /** Defines the order direction, either ascending or descending */
  export type OrderDirection = 'asc' | 'desc';

  export type Proposal = {
    id: Scalars['ID'];
    creator: Scalars['String'];
    startTime: Scalars['BigInt'];
    endTime: Scalars['BigInt'];
    to?: Maybe<Array<Scalars['String']>>;
    data?: Maybe<Array<Scalars['String']>>;
    value?: Maybe<Array<Scalars['BigInt']>>;
    title: Scalars['String'];
    contentHash: Scalars['String'];
    contractState: Scalars['BigInt'];
    guildId: Scalars['String'];
    totalVotes?: Maybe<Array<Scalars['BigInt']>>;
    votes?: Maybe<Array<Vote>>;
    options?: Maybe<Array<Option>>;
    metadata?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    executionTransactionHash?: Maybe<Scalars['String']>;
    statesLog?: Maybe<Array<ProposalStateLog>>;
  };

  export type ProposalvotesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Vote_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Vote_filter>;
  };

  export type ProposaloptionsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Option_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Option_filter>;
  };

  export type ProposalstatesLogArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<ProposalStateLog_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ProposalStateLog_filter>;
  };

  export type ProposalStateLog = {
    id: Scalars['ID'];
    state: Scalars['BigInt'];
    timestamp: Scalars['BigInt'];
    transactionHash: Scalars['String'];
  };

  export type ProposalStateLog_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    state?: InputMaybe<Scalars['BigInt']>;
    state_not?: InputMaybe<Scalars['BigInt']>;
    state_gt?: InputMaybe<Scalars['BigInt']>;
    state_lt?: InputMaybe<Scalars['BigInt']>;
    state_gte?: InputMaybe<Scalars['BigInt']>;
    state_lte?: InputMaybe<Scalars['BigInt']>;
    state_in?: InputMaybe<Array<Scalars['BigInt']>>;
    state_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['String']>;
    transactionHash_not?: InputMaybe<Scalars['String']>;
    transactionHash_gt?: InputMaybe<Scalars['String']>;
    transactionHash_lt?: InputMaybe<Scalars['String']>;
    transactionHash_gte?: InputMaybe<Scalars['String']>;
    transactionHash_lte?: InputMaybe<Scalars['String']>;
    transactionHash_in?: InputMaybe<Array<Scalars['String']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['String']>>;
    transactionHash_contains?: InputMaybe<Scalars['String']>;
    transactionHash_contains_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_not_contains?: InputMaybe<Scalars['String']>;
    transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_starts_with?: InputMaybe<Scalars['String']>;
    transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_not_starts_with?: InputMaybe<Scalars['String']>;
    transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_ends_with?: InputMaybe<Scalars['String']>;
    transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_not_ends_with?: InputMaybe<Scalars['String']>;
    transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type ProposalStateLog_orderBy =
    | 'id'
    | 'state'
    | 'timestamp'
    | 'transactionHash';

  export type Proposal_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    creator?: InputMaybe<Scalars['String']>;
    creator_not?: InputMaybe<Scalars['String']>;
    creator_gt?: InputMaybe<Scalars['String']>;
    creator_lt?: InputMaybe<Scalars['String']>;
    creator_gte?: InputMaybe<Scalars['String']>;
    creator_lte?: InputMaybe<Scalars['String']>;
    creator_in?: InputMaybe<Array<Scalars['String']>>;
    creator_not_in?: InputMaybe<Array<Scalars['String']>>;
    creator_contains?: InputMaybe<Scalars['String']>;
    creator_contains_nocase?: InputMaybe<Scalars['String']>;
    creator_not_contains?: InputMaybe<Scalars['String']>;
    creator_not_contains_nocase?: InputMaybe<Scalars['String']>;
    creator_starts_with?: InputMaybe<Scalars['String']>;
    creator_starts_with_nocase?: InputMaybe<Scalars['String']>;
    creator_not_starts_with?: InputMaybe<Scalars['String']>;
    creator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    creator_ends_with?: InputMaybe<Scalars['String']>;
    creator_ends_with_nocase?: InputMaybe<Scalars['String']>;
    creator_not_ends_with?: InputMaybe<Scalars['String']>;
    creator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    startTime?: InputMaybe<Scalars['BigInt']>;
    startTime_not?: InputMaybe<Scalars['BigInt']>;
    startTime_gt?: InputMaybe<Scalars['BigInt']>;
    startTime_lt?: InputMaybe<Scalars['BigInt']>;
    startTime_gte?: InputMaybe<Scalars['BigInt']>;
    startTime_lte?: InputMaybe<Scalars['BigInt']>;
    startTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
    startTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    endTime?: InputMaybe<Scalars['BigInt']>;
    endTime_not?: InputMaybe<Scalars['BigInt']>;
    endTime_gt?: InputMaybe<Scalars['BigInt']>;
    endTime_lt?: InputMaybe<Scalars['BigInt']>;
    endTime_gte?: InputMaybe<Scalars['BigInt']>;
    endTime_lte?: InputMaybe<Scalars['BigInt']>;
    endTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
    endTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    to?: InputMaybe<Array<Scalars['String']>>;
    to_not?: InputMaybe<Array<Scalars['String']>>;
    to_contains?: InputMaybe<Array<Scalars['String']>>;
    to_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    to_not_contains?: InputMaybe<Array<Scalars['String']>>;
    to_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    data?: InputMaybe<Array<Scalars['String']>>;
    data_not?: InputMaybe<Array<Scalars['String']>>;
    data_contains?: InputMaybe<Array<Scalars['String']>>;
    data_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    data_not_contains?: InputMaybe<Array<Scalars['String']>>;
    data_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    value?: InputMaybe<Array<Scalars['BigInt']>>;
    value_not?: InputMaybe<Array<Scalars['BigInt']>>;
    value_contains?: InputMaybe<Array<Scalars['BigInt']>>;
    value_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
    value_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
    value_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
    title?: InputMaybe<Scalars['String']>;
    title_not?: InputMaybe<Scalars['String']>;
    title_gt?: InputMaybe<Scalars['String']>;
    title_lt?: InputMaybe<Scalars['String']>;
    title_gte?: InputMaybe<Scalars['String']>;
    title_lte?: InputMaybe<Scalars['String']>;
    title_in?: InputMaybe<Array<Scalars['String']>>;
    title_not_in?: InputMaybe<Array<Scalars['String']>>;
    title_contains?: InputMaybe<Scalars['String']>;
    title_contains_nocase?: InputMaybe<Scalars['String']>;
    title_not_contains?: InputMaybe<Scalars['String']>;
    title_not_contains_nocase?: InputMaybe<Scalars['String']>;
    title_starts_with?: InputMaybe<Scalars['String']>;
    title_starts_with_nocase?: InputMaybe<Scalars['String']>;
    title_not_starts_with?: InputMaybe<Scalars['String']>;
    title_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    title_ends_with?: InputMaybe<Scalars['String']>;
    title_ends_with_nocase?: InputMaybe<Scalars['String']>;
    title_not_ends_with?: InputMaybe<Scalars['String']>;
    title_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    contentHash?: InputMaybe<Scalars['String']>;
    contentHash_not?: InputMaybe<Scalars['String']>;
    contentHash_gt?: InputMaybe<Scalars['String']>;
    contentHash_lt?: InputMaybe<Scalars['String']>;
    contentHash_gte?: InputMaybe<Scalars['String']>;
    contentHash_lte?: InputMaybe<Scalars['String']>;
    contentHash_in?: InputMaybe<Array<Scalars['String']>>;
    contentHash_not_in?: InputMaybe<Array<Scalars['String']>>;
    contentHash_contains?: InputMaybe<Scalars['String']>;
    contentHash_contains_nocase?: InputMaybe<Scalars['String']>;
    contentHash_not_contains?: InputMaybe<Scalars['String']>;
    contentHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
    contentHash_starts_with?: InputMaybe<Scalars['String']>;
    contentHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
    contentHash_not_starts_with?: InputMaybe<Scalars['String']>;
    contentHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    contentHash_ends_with?: InputMaybe<Scalars['String']>;
    contentHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
    contentHash_not_ends_with?: InputMaybe<Scalars['String']>;
    contentHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    contractState?: InputMaybe<Scalars['BigInt']>;
    contractState_not?: InputMaybe<Scalars['BigInt']>;
    contractState_gt?: InputMaybe<Scalars['BigInt']>;
    contractState_lt?: InputMaybe<Scalars['BigInt']>;
    contractState_gte?: InputMaybe<Scalars['BigInt']>;
    contractState_lte?: InputMaybe<Scalars['BigInt']>;
    contractState_in?: InputMaybe<Array<Scalars['BigInt']>>;
    contractState_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    guildId?: InputMaybe<Scalars['String']>;
    guildId_not?: InputMaybe<Scalars['String']>;
    guildId_gt?: InputMaybe<Scalars['String']>;
    guildId_lt?: InputMaybe<Scalars['String']>;
    guildId_gte?: InputMaybe<Scalars['String']>;
    guildId_lte?: InputMaybe<Scalars['String']>;
    guildId_in?: InputMaybe<Array<Scalars['String']>>;
    guildId_not_in?: InputMaybe<Array<Scalars['String']>>;
    guildId_contains?: InputMaybe<Scalars['String']>;
    guildId_contains_nocase?: InputMaybe<Scalars['String']>;
    guildId_not_contains?: InputMaybe<Scalars['String']>;
    guildId_not_contains_nocase?: InputMaybe<Scalars['String']>;
    guildId_starts_with?: InputMaybe<Scalars['String']>;
    guildId_starts_with_nocase?: InputMaybe<Scalars['String']>;
    guildId_not_starts_with?: InputMaybe<Scalars['String']>;
    guildId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    guildId_ends_with?: InputMaybe<Scalars['String']>;
    guildId_ends_with_nocase?: InputMaybe<Scalars['String']>;
    guildId_not_ends_with?: InputMaybe<Scalars['String']>;
    guildId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    totalVotes?: InputMaybe<Array<Scalars['BigInt']>>;
    totalVotes_not?: InputMaybe<Array<Scalars['BigInt']>>;
    totalVotes_contains?: InputMaybe<Array<Scalars['BigInt']>>;
    totalVotes_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
    totalVotes_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
    totalVotes_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
    votes?: InputMaybe<Array<Scalars['String']>>;
    votes_not?: InputMaybe<Array<Scalars['String']>>;
    votes_contains?: InputMaybe<Array<Scalars['String']>>;
    votes_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    votes_not_contains?: InputMaybe<Array<Scalars['String']>>;
    votes_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    votes_?: InputMaybe<Vote_filter>;
    options?: InputMaybe<Array<Scalars['String']>>;
    options_not?: InputMaybe<Array<Scalars['String']>>;
    options_contains?: InputMaybe<Array<Scalars['String']>>;
    options_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    options_not_contains?: InputMaybe<Array<Scalars['String']>>;
    options_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    options_?: InputMaybe<Option_filter>;
    metadata?: InputMaybe<Scalars['String']>;
    metadata_not?: InputMaybe<Scalars['String']>;
    metadata_gt?: InputMaybe<Scalars['String']>;
    metadata_lt?: InputMaybe<Scalars['String']>;
    metadata_gte?: InputMaybe<Scalars['String']>;
    metadata_lte?: InputMaybe<Scalars['String']>;
    metadata_in?: InputMaybe<Array<Scalars['String']>>;
    metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
    metadata_contains?: InputMaybe<Scalars['String']>;
    metadata_contains_nocase?: InputMaybe<Scalars['String']>;
    metadata_not_contains?: InputMaybe<Scalars['String']>;
    metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
    metadata_starts_with?: InputMaybe<Scalars['String']>;
    metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
    metadata_not_starts_with?: InputMaybe<Scalars['String']>;
    metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    metadata_ends_with?: InputMaybe<Scalars['String']>;
    metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
    metadata_not_ends_with?: InputMaybe<Scalars['String']>;
    metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    description_not?: InputMaybe<Scalars['String']>;
    description_gt?: InputMaybe<Scalars['String']>;
    description_lt?: InputMaybe<Scalars['String']>;
    description_gte?: InputMaybe<Scalars['String']>;
    description_lte?: InputMaybe<Scalars['String']>;
    description_in?: InputMaybe<Array<Scalars['String']>>;
    description_not_in?: InputMaybe<Array<Scalars['String']>>;
    description_contains?: InputMaybe<Scalars['String']>;
    description_contains_nocase?: InputMaybe<Scalars['String']>;
    description_not_contains?: InputMaybe<Scalars['String']>;
    description_not_contains_nocase?: InputMaybe<Scalars['String']>;
    description_starts_with?: InputMaybe<Scalars['String']>;
    description_starts_with_nocase?: InputMaybe<Scalars['String']>;
    description_not_starts_with?: InputMaybe<Scalars['String']>;
    description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    description_ends_with?: InputMaybe<Scalars['String']>;
    description_ends_with_nocase?: InputMaybe<Scalars['String']>;
    description_not_ends_with?: InputMaybe<Scalars['String']>;
    description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    executionTransactionHash?: InputMaybe<Scalars['String']>;
    executionTransactionHash_not?: InputMaybe<Scalars['String']>;
    executionTransactionHash_gt?: InputMaybe<Scalars['String']>;
    executionTransactionHash_lt?: InputMaybe<Scalars['String']>;
    executionTransactionHash_gte?: InputMaybe<Scalars['String']>;
    executionTransactionHash_lte?: InputMaybe<Scalars['String']>;
    executionTransactionHash_in?: InputMaybe<Array<Scalars['String']>>;
    executionTransactionHash_not_in?: InputMaybe<Array<Scalars['String']>>;
    executionTransactionHash_contains?: InputMaybe<Scalars['String']>;
    executionTransactionHash_contains_nocase?: InputMaybe<Scalars['String']>;
    executionTransactionHash_not_contains?: InputMaybe<Scalars['String']>;
    executionTransactionHash_not_contains_nocase?: InputMaybe<
      Scalars['String']
    >;
    executionTransactionHash_starts_with?: InputMaybe<Scalars['String']>;
    executionTransactionHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
    executionTransactionHash_not_starts_with?: InputMaybe<Scalars['String']>;
    executionTransactionHash_not_starts_with_nocase?: InputMaybe<
      Scalars['String']
    >;
    executionTransactionHash_ends_with?: InputMaybe<Scalars['String']>;
    executionTransactionHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
    executionTransactionHash_not_ends_with?: InputMaybe<Scalars['String']>;
    executionTransactionHash_not_ends_with_nocase?: InputMaybe<
      Scalars['String']
    >;
    statesLog?: InputMaybe<Array<Scalars['String']>>;
    statesLog_not?: InputMaybe<Array<Scalars['String']>>;
    statesLog_contains?: InputMaybe<Array<Scalars['String']>>;
    statesLog_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    statesLog_not_contains?: InputMaybe<Array<Scalars['String']>>;
    statesLog_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    statesLog_?: InputMaybe<ProposalStateLog_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Proposal_orderBy =
    | 'id'
    | 'creator'
    | 'startTime'
    | 'endTime'
    | 'to'
    | 'data'
    | 'value'
    | 'title'
    | 'contentHash'
    | 'contractState'
    | 'guildId'
    | 'totalVotes'
    | 'votes'
    | 'options'
    | 'metadata'
    | 'description'
    | 'executionTransactionHash'
    | 'statesLog';

  export type Query = {
    proposal?: Maybe<Proposal>;
    proposals: Array<Proposal>;
    proposalStateLog?: Maybe<ProposalStateLog>;
    proposalStateLogs: Array<ProposalStateLog>;
    option?: Maybe<Option>;
    options: Array<Option>;
    action?: Maybe<Action>;
    actions: Array<Action>;
    vote?: Maybe<Vote>;
    votes: Array<Vote>;
    member?: Maybe<Member>;
    members: Array<Member>;
    guild?: Maybe<Guild>;
    guilds: Array<Guild>;
    token?: Maybe<Token>;
    tokens: Array<Token>;
    guildPermission?: Maybe<GuildPermission>;
    guildPermissions: Array<GuildPermission>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
  };

  export type QueryproposalArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryproposalsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Proposal_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Proposal_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryproposalStateLogArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryproposalStateLogsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<ProposalStateLog_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ProposalStateLog_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryoptionArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryoptionsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Option_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Option_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryactionArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryactionsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Action_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Action_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryvoteArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryvotesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Vote_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Vote_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymemberArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymembersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Member_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Member_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryguildArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryguildsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Guild_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Guild_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerytokenArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerytokensArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Token_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Token_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryguildPermissionArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryguildPermissionsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<GuildPermission_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<GuildPermission_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type Query_metaArgs = {
    block?: InputMaybe<Block_height>;
  };

  export type Subscription = {
    proposal?: Maybe<Proposal>;
    proposals: Array<Proposal>;
    proposalStateLog?: Maybe<ProposalStateLog>;
    proposalStateLogs: Array<ProposalStateLog>;
    option?: Maybe<Option>;
    options: Array<Option>;
    action?: Maybe<Action>;
    actions: Array<Action>;
    vote?: Maybe<Vote>;
    votes: Array<Vote>;
    member?: Maybe<Member>;
    members: Array<Member>;
    guild?: Maybe<Guild>;
    guilds: Array<Guild>;
    token?: Maybe<Token>;
    tokens: Array<Token>;
    guildPermission?: Maybe<GuildPermission>;
    guildPermissions: Array<GuildPermission>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
  };

  export type SubscriptionproposalArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionproposalsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Proposal_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Proposal_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionproposalStateLogArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionproposalStateLogsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<ProposalStateLog_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ProposalStateLog_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionoptionArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionoptionsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Option_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Option_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionactionArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionactionsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Action_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Action_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionvoteArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionvotesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Vote_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Vote_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionmemberArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionmembersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Member_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Member_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionguildArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionguildsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Guild_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Guild_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptiontokenArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptiontokensArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Token_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Token_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionguildPermissionArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionguildPermissionsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<GuildPermission_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<GuildPermission_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type Subscription_metaArgs = {
    block?: InputMaybe<Block_height>;
  };

  export type Token = {
    id: Scalars['ID'];
    type: TokenType;
    name: Scalars['String'];
    symbol: Scalars['String'];
    decimals: Scalars['Int'];
    guildAddress: Scalars['String'];
  };

  export type TokenType = 'ERC20';

  export type Token_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    type?: InputMaybe<TokenType>;
    type_not?: InputMaybe<TokenType>;
    type_in?: InputMaybe<Array<TokenType>>;
    type_not_in?: InputMaybe<Array<TokenType>>;
    name?: InputMaybe<Scalars['String']>;
    name_not?: InputMaybe<Scalars['String']>;
    name_gt?: InputMaybe<Scalars['String']>;
    name_lt?: InputMaybe<Scalars['String']>;
    name_gte?: InputMaybe<Scalars['String']>;
    name_lte?: InputMaybe<Scalars['String']>;
    name_in?: InputMaybe<Array<Scalars['String']>>;
    name_not_in?: InputMaybe<Array<Scalars['String']>>;
    name_contains?: InputMaybe<Scalars['String']>;
    name_contains_nocase?: InputMaybe<Scalars['String']>;
    name_not_contains?: InputMaybe<Scalars['String']>;
    name_not_contains_nocase?: InputMaybe<Scalars['String']>;
    name_starts_with?: InputMaybe<Scalars['String']>;
    name_starts_with_nocase?: InputMaybe<Scalars['String']>;
    name_not_starts_with?: InputMaybe<Scalars['String']>;
    name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    name_ends_with?: InputMaybe<Scalars['String']>;
    name_ends_with_nocase?: InputMaybe<Scalars['String']>;
    name_not_ends_with?: InputMaybe<Scalars['String']>;
    name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    symbol?: InputMaybe<Scalars['String']>;
    symbol_not?: InputMaybe<Scalars['String']>;
    symbol_gt?: InputMaybe<Scalars['String']>;
    symbol_lt?: InputMaybe<Scalars['String']>;
    symbol_gte?: InputMaybe<Scalars['String']>;
    symbol_lte?: InputMaybe<Scalars['String']>;
    symbol_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_contains?: InputMaybe<Scalars['String']>;
    symbol_contains_nocase?: InputMaybe<Scalars['String']>;
    symbol_not_contains?: InputMaybe<Scalars['String']>;
    symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
    symbol_starts_with?: InputMaybe<Scalars['String']>;
    symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
    symbol_not_starts_with?: InputMaybe<Scalars['String']>;
    symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    symbol_ends_with?: InputMaybe<Scalars['String']>;
    symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
    symbol_not_ends_with?: InputMaybe<Scalars['String']>;
    symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    decimals?: InputMaybe<Scalars['Int']>;
    decimals_not?: InputMaybe<Scalars['Int']>;
    decimals_gt?: InputMaybe<Scalars['Int']>;
    decimals_lt?: InputMaybe<Scalars['Int']>;
    decimals_gte?: InputMaybe<Scalars['Int']>;
    decimals_lte?: InputMaybe<Scalars['Int']>;
    decimals_in?: InputMaybe<Array<Scalars['Int']>>;
    decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
    guildAddress?: InputMaybe<Scalars['String']>;
    guildAddress_not?: InputMaybe<Scalars['String']>;
    guildAddress_gt?: InputMaybe<Scalars['String']>;
    guildAddress_lt?: InputMaybe<Scalars['String']>;
    guildAddress_gte?: InputMaybe<Scalars['String']>;
    guildAddress_lte?: InputMaybe<Scalars['String']>;
    guildAddress_in?: InputMaybe<Array<Scalars['String']>>;
    guildAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
    guildAddress_contains?: InputMaybe<Scalars['String']>;
    guildAddress_contains_nocase?: InputMaybe<Scalars['String']>;
    guildAddress_not_contains?: InputMaybe<Scalars['String']>;
    guildAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
    guildAddress_starts_with?: InputMaybe<Scalars['String']>;
    guildAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
    guildAddress_not_starts_with?: InputMaybe<Scalars['String']>;
    guildAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    guildAddress_ends_with?: InputMaybe<Scalars['String']>;
    guildAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
    guildAddress_not_ends_with?: InputMaybe<Scalars['String']>;
    guildAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Token_orderBy =
    | 'id'
    | 'type'
    | 'name'
    | 'symbol'
    | 'decimals'
    | 'guildAddress';

  export type Vote = {
    id: Scalars['ID'];
    proposalId: Scalars['String'];
    option: Scalars['BigInt'];
    optionLabel?: Maybe<Scalars['String']>;
    voter: Scalars['String'];
    votingPower: Scalars['BigInt'];
    transactionHash: Scalars['String'];
  };

  export type Vote_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    proposalId?: InputMaybe<Scalars['String']>;
    proposalId_not?: InputMaybe<Scalars['String']>;
    proposalId_gt?: InputMaybe<Scalars['String']>;
    proposalId_lt?: InputMaybe<Scalars['String']>;
    proposalId_gte?: InputMaybe<Scalars['String']>;
    proposalId_lte?: InputMaybe<Scalars['String']>;
    proposalId_in?: InputMaybe<Array<Scalars['String']>>;
    proposalId_not_in?: InputMaybe<Array<Scalars['String']>>;
    proposalId_contains?: InputMaybe<Scalars['String']>;
    proposalId_contains_nocase?: InputMaybe<Scalars['String']>;
    proposalId_not_contains?: InputMaybe<Scalars['String']>;
    proposalId_not_contains_nocase?: InputMaybe<Scalars['String']>;
    proposalId_starts_with?: InputMaybe<Scalars['String']>;
    proposalId_starts_with_nocase?: InputMaybe<Scalars['String']>;
    proposalId_not_starts_with?: InputMaybe<Scalars['String']>;
    proposalId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    proposalId_ends_with?: InputMaybe<Scalars['String']>;
    proposalId_ends_with_nocase?: InputMaybe<Scalars['String']>;
    proposalId_not_ends_with?: InputMaybe<Scalars['String']>;
    proposalId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    option?: InputMaybe<Scalars['BigInt']>;
    option_not?: InputMaybe<Scalars['BigInt']>;
    option_gt?: InputMaybe<Scalars['BigInt']>;
    option_lt?: InputMaybe<Scalars['BigInt']>;
    option_gte?: InputMaybe<Scalars['BigInt']>;
    option_lte?: InputMaybe<Scalars['BigInt']>;
    option_in?: InputMaybe<Array<Scalars['BigInt']>>;
    option_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    optionLabel?: InputMaybe<Scalars['String']>;
    optionLabel_not?: InputMaybe<Scalars['String']>;
    optionLabel_gt?: InputMaybe<Scalars['String']>;
    optionLabel_lt?: InputMaybe<Scalars['String']>;
    optionLabel_gte?: InputMaybe<Scalars['String']>;
    optionLabel_lte?: InputMaybe<Scalars['String']>;
    optionLabel_in?: InputMaybe<Array<Scalars['String']>>;
    optionLabel_not_in?: InputMaybe<Array<Scalars['String']>>;
    optionLabel_contains?: InputMaybe<Scalars['String']>;
    optionLabel_contains_nocase?: InputMaybe<Scalars['String']>;
    optionLabel_not_contains?: InputMaybe<Scalars['String']>;
    optionLabel_not_contains_nocase?: InputMaybe<Scalars['String']>;
    optionLabel_starts_with?: InputMaybe<Scalars['String']>;
    optionLabel_starts_with_nocase?: InputMaybe<Scalars['String']>;
    optionLabel_not_starts_with?: InputMaybe<Scalars['String']>;
    optionLabel_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    optionLabel_ends_with?: InputMaybe<Scalars['String']>;
    optionLabel_ends_with_nocase?: InputMaybe<Scalars['String']>;
    optionLabel_not_ends_with?: InputMaybe<Scalars['String']>;
    optionLabel_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    voter?: InputMaybe<Scalars['String']>;
    voter_not?: InputMaybe<Scalars['String']>;
    voter_gt?: InputMaybe<Scalars['String']>;
    voter_lt?: InputMaybe<Scalars['String']>;
    voter_gte?: InputMaybe<Scalars['String']>;
    voter_lte?: InputMaybe<Scalars['String']>;
    voter_in?: InputMaybe<Array<Scalars['String']>>;
    voter_not_in?: InputMaybe<Array<Scalars['String']>>;
    voter_contains?: InputMaybe<Scalars['String']>;
    voter_contains_nocase?: InputMaybe<Scalars['String']>;
    voter_not_contains?: InputMaybe<Scalars['String']>;
    voter_not_contains_nocase?: InputMaybe<Scalars['String']>;
    voter_starts_with?: InputMaybe<Scalars['String']>;
    voter_starts_with_nocase?: InputMaybe<Scalars['String']>;
    voter_not_starts_with?: InputMaybe<Scalars['String']>;
    voter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    voter_ends_with?: InputMaybe<Scalars['String']>;
    voter_ends_with_nocase?: InputMaybe<Scalars['String']>;
    voter_not_ends_with?: InputMaybe<Scalars['String']>;
    voter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    votingPower?: InputMaybe<Scalars['BigInt']>;
    votingPower_not?: InputMaybe<Scalars['BigInt']>;
    votingPower_gt?: InputMaybe<Scalars['BigInt']>;
    votingPower_lt?: InputMaybe<Scalars['BigInt']>;
    votingPower_gte?: InputMaybe<Scalars['BigInt']>;
    votingPower_lte?: InputMaybe<Scalars['BigInt']>;
    votingPower_in?: InputMaybe<Array<Scalars['BigInt']>>;
    votingPower_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['String']>;
    transactionHash_not?: InputMaybe<Scalars['String']>;
    transactionHash_gt?: InputMaybe<Scalars['String']>;
    transactionHash_lt?: InputMaybe<Scalars['String']>;
    transactionHash_gte?: InputMaybe<Scalars['String']>;
    transactionHash_lte?: InputMaybe<Scalars['String']>;
    transactionHash_in?: InputMaybe<Array<Scalars['String']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['String']>>;
    transactionHash_contains?: InputMaybe<Scalars['String']>;
    transactionHash_contains_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_not_contains?: InputMaybe<Scalars['String']>;
    transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_starts_with?: InputMaybe<Scalars['String']>;
    transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_not_starts_with?: InputMaybe<Scalars['String']>;
    transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_ends_with?: InputMaybe<Scalars['String']>;
    transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
    transactionHash_not_ends_with?: InputMaybe<Scalars['String']>;
    transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Vote_orderBy =
    | 'id'
    | 'proposalId'
    | 'option'
    | 'optionLabel'
    | 'voter'
    | 'votingPower'
    | 'transactionHash';

  export type _Block_ = {
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
    /** Integer representation of the timestamp stored in blocks for the chain */
    timestamp?: Maybe<Scalars['Int']>;
  };

  /** The type for the top-level _meta field */
  export type _Meta_ = {
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_;
    /** The deployment ID */
    deployment: Scalars['String'];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean'];
  };

  export type _SubgraphErrorPolicy_ =
    /** Data will be returned even if the subgraph has indexing errors */
    | 'allow'
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    | 'deny';

  export type QuerySdk = {
    /** null **/
    proposal: InContextSdkMethod<
      Query['proposal'],
      QueryproposalArgs,
      MeshContext
    >;
    /** null **/
    proposals: InContextSdkMethod<
      Query['proposals'],
      QueryproposalsArgs,
      MeshContext
    >;
    /** null **/
    proposalStateLog: InContextSdkMethod<
      Query['proposalStateLog'],
      QueryproposalStateLogArgs,
      MeshContext
    >;
    /** null **/
    proposalStateLogs: InContextSdkMethod<
      Query['proposalStateLogs'],
      QueryproposalStateLogsArgs,
      MeshContext
    >;
    /** null **/
    option: InContextSdkMethod<Query['option'], QueryoptionArgs, MeshContext>;
    /** null **/
    options: InContextSdkMethod<
      Query['options'],
      QueryoptionsArgs,
      MeshContext
    >;
    /** null **/
    action: InContextSdkMethod<Query['action'], QueryactionArgs, MeshContext>;
    /** null **/
    actions: InContextSdkMethod<
      Query['actions'],
      QueryactionsArgs,
      MeshContext
    >;
    /** null **/
    vote: InContextSdkMethod<Query['vote'], QueryvoteArgs, MeshContext>;
    /** null **/
    votes: InContextSdkMethod<Query['votes'], QueryvotesArgs, MeshContext>;
    /** null **/
    member: InContextSdkMethod<Query['member'], QuerymemberArgs, MeshContext>;
    /** null **/
    members: InContextSdkMethod<
      Query['members'],
      QuerymembersArgs,
      MeshContext
    >;
    /** null **/
    guild: InContextSdkMethod<Query['guild'], QueryguildArgs, MeshContext>;
    /** null **/
    guilds: InContextSdkMethod<Query['guilds'], QueryguildsArgs, MeshContext>;
    /** null **/
    token: InContextSdkMethod<Query['token'], QuerytokenArgs, MeshContext>;
    /** null **/
    tokens: InContextSdkMethod<Query['tokens'], QuerytokensArgs, MeshContext>;
    /** null **/
    guildPermission: InContextSdkMethod<
      Query['guildPermission'],
      QueryguildPermissionArgs,
      MeshContext
    >;
    /** null **/
    guildPermissions: InContextSdkMethod<
      Query['guildPermissions'],
      QueryguildPermissionsArgs,
      MeshContext
    >;
    /** Access to subgraph metadata **/
    _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>;
  };

  export type MutationSdk = {};

  export type SubscriptionSdk = {
    /** null **/
    proposal: InContextSdkMethod<
      Subscription['proposal'],
      SubscriptionproposalArgs,
      MeshContext
    >;
    /** null **/
    proposals: InContextSdkMethod<
      Subscription['proposals'],
      SubscriptionproposalsArgs,
      MeshContext
    >;
    /** null **/
    proposalStateLog: InContextSdkMethod<
      Subscription['proposalStateLog'],
      SubscriptionproposalStateLogArgs,
      MeshContext
    >;
    /** null **/
    proposalStateLogs: InContextSdkMethod<
      Subscription['proposalStateLogs'],
      SubscriptionproposalStateLogsArgs,
      MeshContext
    >;
    /** null **/
    option: InContextSdkMethod<
      Subscription['option'],
      SubscriptionoptionArgs,
      MeshContext
    >;
    /** null **/
    options: InContextSdkMethod<
      Subscription['options'],
      SubscriptionoptionsArgs,
      MeshContext
    >;
    /** null **/
    action: InContextSdkMethod<
      Subscription['action'],
      SubscriptionactionArgs,
      MeshContext
    >;
    /** null **/
    actions: InContextSdkMethod<
      Subscription['actions'],
      SubscriptionactionsArgs,
      MeshContext
    >;
    /** null **/
    vote: InContextSdkMethod<
      Subscription['vote'],
      SubscriptionvoteArgs,
      MeshContext
    >;
    /** null **/
    votes: InContextSdkMethod<
      Subscription['votes'],
      SubscriptionvotesArgs,
      MeshContext
    >;
    /** null **/
    member: InContextSdkMethod<
      Subscription['member'],
      SubscriptionmemberArgs,
      MeshContext
    >;
    /** null **/
    members: InContextSdkMethod<
      Subscription['members'],
      SubscriptionmembersArgs,
      MeshContext
    >;
    /** null **/
    guild: InContextSdkMethod<
      Subscription['guild'],
      SubscriptionguildArgs,
      MeshContext
    >;
    /** null **/
    guilds: InContextSdkMethod<
      Subscription['guilds'],
      SubscriptionguildsArgs,
      MeshContext
    >;
    /** null **/
    token: InContextSdkMethod<
      Subscription['token'],
      SubscriptiontokenArgs,
      MeshContext
    >;
    /** null **/
    tokens: InContextSdkMethod<
      Subscription['tokens'],
      SubscriptiontokensArgs,
      MeshContext
    >;
    /** null **/
    guildPermission: InContextSdkMethod<
      Subscription['guildPermission'],
      SubscriptionguildPermissionArgs,
      MeshContext
    >;
    /** null **/
    guildPermissions: InContextSdkMethod<
      Subscription['guildPermissions'],
      SubscriptionguildPermissionsArgs,
      MeshContext
    >;
    /** Access to subgraph metadata **/
    _meta: InContextSdkMethod<
      Subscription['_meta'],
      Subscription_metaArgs,
      MeshContext
    >;
  };

  export type Context = {
    ['dxgov-guild-subgraph']: {
      Query: QuerySdk;
      Mutation: MutationSdk;
      Subscription: SubscriptionSdk;
    };
  };
}
