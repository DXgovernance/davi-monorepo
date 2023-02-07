// @ts-nocheck
import {
  GraphQLResolveInfo,
  SelectionSetNode,
  FieldNode,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from '@graphql-mesh/cache-localforage';
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from '@graphql-mesh/graphql';
import BareMerger from '@graphql-mesh/merger-bare';
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import {
  getMesh,
  ExecuteMeshFn,
  SubscribeMeshFn,
  MeshContext as BaseMeshContext,
  MeshInstance,
} from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { DxgovGuildSubgraphTypes } from './sources/dxgov-guild-subgraph/types';
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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
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
  isToken: Scalars['Boolean'];
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
  isToken?: InputMaybe<Scalars['Boolean']>;
  isToken_not?: InputMaybe<Scalars['Boolean']>;
  isToken_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isToken_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  | 'isToken'
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
  votingPowerForProposalCreation_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPowerForProposalExecution?: InputMaybe<Scalars['BigInt']>;
  votingPowerForProposalExecution_not?: InputMaybe<Scalars['BigInt']>;
  votingPowerForProposalExecution_gt?: InputMaybe<Scalars['BigInt']>;
  votingPowerForProposalExecution_lt?: InputMaybe<Scalars['BigInt']>;
  votingPowerForProposalExecution_gte?: InputMaybe<Scalars['BigInt']>;
  votingPowerForProposalExecution_lte?: InputMaybe<Scalars['BigInt']>;
  votingPowerForProposalExecution_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPowerForProposalExecution_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  executionTransactionHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  executionTransactionHash_starts_with?: InputMaybe<Scalars['String']>;
  executionTransactionHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  executionTransactionHash_not_starts_with?: InputMaybe<Scalars['String']>;
  executionTransactionHash_not_starts_with_nocase?: InputMaybe<
    Scalars['String']
  >;
  executionTransactionHash_ends_with?: InputMaybe<Scalars['String']>;
  executionTransactionHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  executionTransactionHash_not_ends_with?: InputMaybe<Scalars['String']>;
  executionTransactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Action: ResolverTypeWrapper<Action>;
  Action_filter: Action_filter;
  Action_orderBy: Action_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Guild: ResolverTypeWrapper<Guild>;
  GuildPermission: ResolverTypeWrapper<GuildPermission>;
  GuildPermission_filter: GuildPermission_filter;
  GuildPermission_orderBy: GuildPermission_orderBy;
  GuildType: GuildType;
  Guild_filter: Guild_filter;
  Guild_orderBy: Guild_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Member: ResolverTypeWrapper<Member>;
  Member_filter: Member_filter;
  Member_orderBy: Member_orderBy;
  Option: ResolverTypeWrapper<Option>;
  Option_filter: Option_filter;
  Option_orderBy: Option_orderBy;
  OrderDirection: OrderDirection;
  Proposal: ResolverTypeWrapper<Proposal>;
  ProposalStateLog: ResolverTypeWrapper<ProposalStateLog>;
  ProposalStateLog_filter: ProposalStateLog_filter;
  ProposalStateLog_orderBy: ProposalStateLog_orderBy;
  Proposal_filter: Proposal_filter;
  Proposal_orderBy: Proposal_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<Token>;
  TokenType: TokenType;
  Token_filter: Token_filter;
  Token_orderBy: Token_orderBy;
  Vote: ResolverTypeWrapper<Vote>;
  Vote_filter: Vote_filter;
  Vote_orderBy: Vote_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Action: Action;
  Action_filter: Action_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  Guild: Guild;
  GuildPermission: GuildPermission;
  GuildPermission_filter: GuildPermission_filter;
  Guild_filter: Guild_filter;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Member: Member;
  Member_filter: Member_filter;
  Option: Option;
  Option_filter: Option_filter;
  Proposal: Proposal;
  ProposalStateLog: ProposalStateLog;
  ProposalStateLog_filter: ProposalStateLog_filter;
  Proposal_filter: Proposal_filter;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Token: Token;
  Token_filter: Token_filter;
  Vote: Vote;
  Vote_filter: Vote_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = {};

export type entityDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = entityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = subgraphIdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = derivedFromDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ActionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Action'] = ResolversParentTypes['Action']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  optionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type GuildResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Guild'] = ResolversParentTypes['Guild']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType>;
  permissionRegistry?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  proposalTime?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  lockTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  timeForExecution?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  votingPowerForProposalCreation?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  votingPowerForProposalExecution?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  voteGas?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  maxGasPrice?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  maxActiveProposals?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  minimumMembersForProposalCreation?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  minimumTokensLockedForProposalCreation?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes['GuildType']>, ParentType, ContextType>;
  permissions?: Resolver<
    Array<ResolversTypes['GuildPermission']>,
    ParentType,
    ContextType,
    RequireFields<GuildpermissionsArgs, 'skip' | 'first'>
  >;
  proposals?: Resolver<
    Maybe<Array<ResolversTypes['Proposal']>>,
    ParentType,
    ContextType,
    RequireFields<GuildproposalsArgs, 'skip' | 'first'>
  >;
  members?: Resolver<
    Maybe<Array<ResolversTypes['Member']>>,
    ParentType,
    ContextType,
    RequireFields<GuildmembersArgs, 'skip' | 'first'>
  >;
  isActive?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  bytecodeHash?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GuildPermissionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['GuildPermission'] = ResolversParentTypes['GuildPermission']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  functionSignature?: Resolver<
    ResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  isToken?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  valueAllowed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fromTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  allowed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  guild?: Resolver<Maybe<ResolversTypes['Guild']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokensLocked?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OptionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Option'] = ResolversParentTypes['Option']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proposalId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  actions?: Resolver<
    Maybe<Array<ResolversTypes['Action']>>,
    ParentType,
    ContextType,
    RequireFields<OptionactionsArgs, 'skip' | 'first'>
  >;
  voteAmount?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  votes?: Resolver<
    Array<ResolversTypes['Vote']>,
    ParentType,
    ContextType,
    RequireFields<OptionvotesArgs, 'skip' | 'first'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Proposal'] = ResolversParentTypes['Proposal']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  to?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  data?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  value?: Resolver<
    Maybe<Array<ResolversTypes['BigInt']>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contractState?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  guildId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalVotes?: Resolver<
    Maybe<Array<ResolversTypes['BigInt']>>,
    ParentType,
    ContextType
  >;
  votes?: Resolver<
    Maybe<Array<ResolversTypes['Vote']>>,
    ParentType,
    ContextType,
    RequireFields<ProposalvotesArgs, 'skip' | 'first'>
  >;
  options?: Resolver<
    Maybe<Array<ResolversTypes['Option']>>,
    ParentType,
    ContextType,
    RequireFields<ProposaloptionsArgs, 'skip' | 'first'>
  >;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  executionTransactionHash?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  statesLog?: Resolver<
    Maybe<Array<ResolversTypes['ProposalStateLog']>>,
    ParentType,
    ContextType,
    RequireFields<ProposalstatesLogArgs, 'skip' | 'first'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalStateLogResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['ProposalStateLog'] = ResolversParentTypes['ProposalStateLog']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  proposal?: Resolver<
    Maybe<ResolversTypes['Proposal']>,
    ParentType,
    ContextType,
    RequireFields<QueryproposalArgs, 'id' | 'subgraphError'>
  >;
  proposals?: Resolver<
    Array<ResolversTypes['Proposal']>,
    ParentType,
    ContextType,
    RequireFields<QueryproposalsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  proposalStateLog?: Resolver<
    Maybe<ResolversTypes['ProposalStateLog']>,
    ParentType,
    ContextType,
    RequireFields<QueryproposalStateLogArgs, 'id' | 'subgraphError'>
  >;
  proposalStateLogs?: Resolver<
    Array<ResolversTypes['ProposalStateLog']>,
    ParentType,
    ContextType,
    RequireFields<
      QueryproposalStateLogsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  option?: Resolver<
    Maybe<ResolversTypes['Option']>,
    ParentType,
    ContextType,
    RequireFields<QueryoptionArgs, 'id' | 'subgraphError'>
  >;
  options?: Resolver<
    Array<ResolversTypes['Option']>,
    ParentType,
    ContextType,
    RequireFields<QueryoptionsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  action?: Resolver<
    Maybe<ResolversTypes['Action']>,
    ParentType,
    ContextType,
    RequireFields<QueryactionArgs, 'id' | 'subgraphError'>
  >;
  actions?: Resolver<
    Array<ResolversTypes['Action']>,
    ParentType,
    ContextType,
    RequireFields<QueryactionsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  vote?: Resolver<
    Maybe<ResolversTypes['Vote']>,
    ParentType,
    ContextType,
    RequireFields<QueryvoteArgs, 'id' | 'subgraphError'>
  >;
  votes?: Resolver<
    Array<ResolversTypes['Vote']>,
    ParentType,
    ContextType,
    RequireFields<QueryvotesArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  member?: Resolver<
    Maybe<ResolversTypes['Member']>,
    ParentType,
    ContextType,
    RequireFields<QuerymemberArgs, 'id' | 'subgraphError'>
  >;
  members?: Resolver<
    Array<ResolversTypes['Member']>,
    ParentType,
    ContextType,
    RequireFields<QuerymembersArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  guild?: Resolver<
    Maybe<ResolversTypes['Guild']>,
    ParentType,
    ContextType,
    RequireFields<QueryguildArgs, 'id' | 'subgraphError'>
  >;
  guilds?: Resolver<
    Array<ResolversTypes['Guild']>,
    ParentType,
    ContextType,
    RequireFields<QueryguildsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  token?: Resolver<
    Maybe<ResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>
  >;
  tokens?: Resolver<
    Array<ResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  guildPermission?: Resolver<
    Maybe<ResolversTypes['GuildPermission']>,
    ParentType,
    ContextType,
    RequireFields<QueryguildPermissionArgs, 'id' | 'subgraphError'>
  >;
  guildPermissions?: Resolver<
    Array<ResolversTypes['GuildPermission']>,
    ParentType,
    ContextType,
    RequireFields<QueryguildPermissionsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  _meta?: Resolver<
    Maybe<ResolversTypes['_Meta_']>,
    ParentType,
    ContextType,
    Partial<Query_metaArgs>
  >;
}>;

export type SubscriptionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  proposal?: SubscriptionResolver<
    Maybe<ResolversTypes['Proposal']>,
    'proposal',
    ParentType,
    ContextType,
    RequireFields<SubscriptionproposalArgs, 'id' | 'subgraphError'>
  >;
  proposals?: SubscriptionResolver<
    Array<ResolversTypes['Proposal']>,
    'proposals',
    ParentType,
    ContextType,
    RequireFields<SubscriptionproposalsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  proposalStateLog?: SubscriptionResolver<
    Maybe<ResolversTypes['ProposalStateLog']>,
    'proposalStateLog',
    ParentType,
    ContextType,
    RequireFields<SubscriptionproposalStateLogArgs, 'id' | 'subgraphError'>
  >;
  proposalStateLogs?: SubscriptionResolver<
    Array<ResolversTypes['ProposalStateLog']>,
    'proposalStateLogs',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionproposalStateLogsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  option?: SubscriptionResolver<
    Maybe<ResolversTypes['Option']>,
    'option',
    ParentType,
    ContextType,
    RequireFields<SubscriptionoptionArgs, 'id' | 'subgraphError'>
  >;
  options?: SubscriptionResolver<
    Array<ResolversTypes['Option']>,
    'options',
    ParentType,
    ContextType,
    RequireFields<SubscriptionoptionsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  action?: SubscriptionResolver<
    Maybe<ResolversTypes['Action']>,
    'action',
    ParentType,
    ContextType,
    RequireFields<SubscriptionactionArgs, 'id' | 'subgraphError'>
  >;
  actions?: SubscriptionResolver<
    Array<ResolversTypes['Action']>,
    'actions',
    ParentType,
    ContextType,
    RequireFields<SubscriptionactionsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  vote?: SubscriptionResolver<
    Maybe<ResolversTypes['Vote']>,
    'vote',
    ParentType,
    ContextType,
    RequireFields<SubscriptionvoteArgs, 'id' | 'subgraphError'>
  >;
  votes?: SubscriptionResolver<
    Array<ResolversTypes['Vote']>,
    'votes',
    ParentType,
    ContextType,
    RequireFields<SubscriptionvotesArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  member?: SubscriptionResolver<
    Maybe<ResolversTypes['Member']>,
    'member',
    ParentType,
    ContextType,
    RequireFields<SubscriptionmemberArgs, 'id' | 'subgraphError'>
  >;
  members?: SubscriptionResolver<
    Array<ResolversTypes['Member']>,
    'members',
    ParentType,
    ContextType,
    RequireFields<SubscriptionmembersArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  guild?: SubscriptionResolver<
    Maybe<ResolversTypes['Guild']>,
    'guild',
    ParentType,
    ContextType,
    RequireFields<SubscriptionguildArgs, 'id' | 'subgraphError'>
  >;
  guilds?: SubscriptionResolver<
    Array<ResolversTypes['Guild']>,
    'guilds',
    ParentType,
    ContextType,
    RequireFields<SubscriptionguildsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  token?: SubscriptionResolver<
    Maybe<ResolversTypes['Token']>,
    'token',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>
  >;
  tokens?: SubscriptionResolver<
    Array<ResolversTypes['Token']>,
    'tokens',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontokensArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  guildPermission?: SubscriptionResolver<
    Maybe<ResolversTypes['GuildPermission']>,
    'guildPermission',
    ParentType,
    ContextType,
    RequireFields<SubscriptionguildPermissionArgs, 'id' | 'subgraphError'>
  >;
  guildPermissions?: SubscriptionResolver<
    Array<ResolversTypes['GuildPermission']>,
    'guildPermissions',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionguildPermissionsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  _meta?: SubscriptionResolver<
    Maybe<ResolversTypes['_Meta_']>,
    '_meta',
    ParentType,
    ContextType,
    Partial<Subscription_metaArgs>
  >;
}>;

export type TokenResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TokenType'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  guildAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  proposalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  voter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votingPower?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']
> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']
> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Action?: ActionResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Guild?: GuildResolvers<ContextType>;
  GuildPermission?: GuildPermissionResolvers<ContextType>;
  Member?: MemberResolvers<ContextType>;
  Option?: OptionResolvers<ContextType>;
  Proposal?: ProposalResolvers<ContextType>;
  ProposalStateLog?: ProposalStateLogResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = DxgovGuildSubgraphTypes.Context & BaseMeshContext;

import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(
  pathModule.dirname(fileURLToPath(import.meta.url)),
  '..'
);

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (
    pathModule.isAbsolute(moduleId)
      ? pathModule.relative(baseDir, moduleId)
      : moduleId
  )
    .split('\\')
    .join('/')
    .replace(baseDir + '/', '');
  switch (relativeModuleId) {
    case '.graphclient/sources/dxgov-guild-subgraph/introspectionSchema':
      return import('./sources/dxgov-guild-subgraph/introspectionSchema') as T;

    default:
      return Promise.reject(
        new Error(`Cannot find module '${relativeModuleId}'.`)
      );
  }
};

const rootStore = new MeshStore(
  '.graphclient',
  new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
    fileType: 'ts',
  }),
  {
    readonly: true,
    validate: false,
  }
);

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any;
export async function getMeshOptions(): Promise<GetMeshOptions> {
  const pubsub = new PubSub();
  const sourcesStore = rootStore.child('sources');
  const logger = new DefaultLogger('GraphClient');
  const cache = new (MeshCache as any)({
    ...({} as any),
    importFn,
    store: rootStore.child('cache'),
    pubsub,
    logger,
  } as any);

  const sources: MeshResolvedSource[] = [];
  const transforms: MeshTransform[] = [];
  const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
  const dxgovGuildSubgraphTransforms = [];
  const additionalTypeDefs = [] as any[];
  const dxgovGuildSubgraphHandler = new GraphqlHandler({
    name: 'dxgov-guild-subgraph',
    config: {
      endpoint: 'http://127.0.0.1:8000/subgraphs/name/mprasanjith/dxdao',
    },
    baseDir,
    cache,
    pubsub,
    store: sourcesStore.child('dxgov-guild-subgraph'),
    logger: logger.child('dxgov-guild-subgraph'),
    importFn,
  });
  sources[0] = {
    name: 'dxgov-guild-subgraph',
    handler: dxgovGuildSubgraphHandler,
    transforms: dxgovGuildSubgraphTransforms,
  };
  const additionalResolvers = [] as any[];
  const merger = new (BareMerger as any)({
    cache,
    pubsub,
    logger: logger.child('bareMerger'),
    store: rootStore.child('bareMerger'),
  });

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
        {
          document: GetAllPermissionsDocument,
          get rawSDL() {
            return printWithCache(GetAllPermissionsDocument);
          },
          location: 'GetAllPermissionsDocument.graphql',
        },
        {
          document: GetAllTokenPermissionsDocument,
          get rawSDL() {
            return printWithCache(GetAllTokenPermissionsDocument);
          },
          location: 'GetAllTokenPermissionsDocument.graphql',
        },
        {
          document: GetAllFunctionCallPermissionsDocument,
          get rawSDL() {
            return printWithCache(GetAllFunctionCallPermissionsDocument);
          },
          location: 'GetAllFunctionCallPermissionsDocument.graphql',
        },
        {
          document: GetMemberListDocument,
          get rawSDL() {
            return printWithCache(GetMemberListDocument);
          },
          location: 'GetMemberListDocument.graphql',
        },
        {
          document: GetNumberOfActiveProposalsDocument,
          get rawSDL() {
            return printWithCache(GetNumberOfActiveProposalsDocument);
          },
          location: 'GetNumberOfActiveProposalsDocument.graphql',
        },
        {
          document: GetGuildConfigDocument,
          get rawSDL() {
            return printWithCache(GetGuildConfigDocument);
          },
          location: 'GetGuildConfigDocument.graphql',
        },
      ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  });
}

let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions()
      .then(meshOptions => getMesh(meshOptions))
      .then(mesh => {
        const id = mesh.pubsub.subscribe('destroy', () => {
          meshInstance$ = undefined;
          mesh.pubsub.unsubscribe(id);
        });
        return mesh;
      });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) =>
  getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) =>
  getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(
  globalContext?: TGlobalContext
) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) =>
    sdkRequesterFactory(globalContext)
  );
  return getSdk<TOperationContext, TGlobalContext>((...args) =>
    sdkRequester$.then(sdkRequester => sdkRequester(...args))
  );
}
export type getAllPermissionsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type getAllPermissionsQuery = {
  guild?: Maybe<
    Pick<Guild, 'name'> & {
      permissions: Array<
        Pick<
          GuildPermission,
          | 'id'
          | 'isToken'
          | 'to'
          | 'valueAllowed'
          | 'from'
          | 'fromTime'
          | 'functionSignature'
          | 'allowed'
        >
      >;
    }
  >;
};

export type getAllTokenPermissionsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type getAllTokenPermissionsQuery = {
  guild?: Maybe<
    Pick<Guild, 'name'> & {
      permissions: Array<
        Pick<
          GuildPermission,
          | 'id'
          | 'isToken'
          | 'to'
          | 'valueAllowed'
          | 'from'
          | 'fromTime'
          | 'functionSignature'
          | 'allowed'
        >
      >;
    }
  >;
};

export type getAllFunctionCallPermissionsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type getAllFunctionCallPermissionsQuery = {
  guild?: Maybe<
    Pick<Guild, 'name'> & {
      permissions: Array<
        Pick<
          GuildPermission,
          | 'id'
          | 'isToken'
          | 'to'
          | 'valueAllowed'
          | 'from'
          | 'fromTime'
          | 'functionSignature'
          | 'allowed'
        >
      >;
    }
  >;
};

export type getMemberListQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type getMemberListQuery = {
  guild?: Maybe<{
    members?: Maybe<Array<Pick<Member, 'id' | 'address' | 'tokensLocked'>>>;
  }>;
};

export type getNumberOfActiveProposalsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type getNumberOfActiveProposalsQuery = {
  guild?: Maybe<
    Pick<Guild, 'id' | 'name'> & {
      proposals?: Maybe<Array<Pick<Proposal, 'id'>>>;
    }
  >;
};

export type getGuildConfigQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type getGuildConfigQuery = {
  guild?: Maybe<
    Pick<
      Guild,
      | 'id'
      | 'name'
      | 'permissionRegistry'
      | 'proposalTime'
      | 'timeForExecution'
      | 'maxActiveProposals'
      | 'votingPowerForProposalCreation'
      | 'votingPowerForProposalExecution'
      | 'lockTime'
      | 'voteGas'
      | 'maxGasPrice'
      | 'minimumMembersForProposalCreation'
      | 'minimumTokensLockedForProposalCreation'
    > & { token?: Maybe<Pick<Token, 'id'>> }
  >;
};

export const getAllPermissionsDocument = gql`
  query getAllPermissions($id: ID!) {
    guild(id: $id) {
      name
      permissions {
        id
        isToken
        to
        valueAllowed
        from
        fromTime
        functionSignature
        allowed
      }
    }
  }
` as unknown as DocumentNode<
  getAllPermissionsQuery,
  getAllPermissionsQueryVariables
>;
export const getAllTokenPermissionsDocument = gql`
  query getAllTokenPermissions($id: ID!) {
    guild(id: $id) {
      name
      permissions(where: { isToken: true }) {
        id
        isToken
        to
        valueAllowed
        from
        fromTime
        functionSignature
        allowed
      }
    }
  }
` as unknown as DocumentNode<
  getAllTokenPermissionsQuery,
  getAllTokenPermissionsQueryVariables
>;
export const getAllFunctionCallPermissionsDocument = gql`
  query getAllFunctionCallPermissions($id: ID!) {
    guild(id: $id) {
      name
      permissions(where: { isToken: false }) {
        id
        isToken
        to
        valueAllowed
        from
        fromTime
        functionSignature
        allowed
      }
    }
  }
` as unknown as DocumentNode<
  getAllFunctionCallPermissionsQuery,
  getAllFunctionCallPermissionsQueryVariables
>;
export const getMemberListDocument = gql`
  query getMemberList($id: ID!) {
    guild(id: $id) {
      members {
        id
        address
        tokensLocked
      }
    }
  }
` as unknown as DocumentNode<getMemberListQuery, getMemberListQueryVariables>;
export const getNumberOfActiveProposalsDocument = gql`
  query getNumberOfActiveProposals($id: ID!) {
    guild(id: $id) {
      id
      name
      proposals {
        id
      }
    }
  }
` as unknown as DocumentNode<
  getNumberOfActiveProposalsQuery,
  getNumberOfActiveProposalsQueryVariables
>;
export const getGuildConfigDocument = gql`
  query getGuildConfig($id: ID!) {
    guild(id: $id) {
      id
      name
      token {
        id
      }
      permissionRegistry
      proposalTime
      timeForExecution
      maxActiveProposals
      votingPowerForProposalCreation
      votingPowerForProposalExecution
      lockTime
      voteGas
      maxGasPrice
      minimumMembersForProposalCreation
      minimumTokensLockedForProposalCreation
    }
  }
` as unknown as DocumentNode<getGuildConfigQuery, getGuildConfigQueryVariables>;

export type Requester<C = {}, E = unknown> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getAllPermissions(
      variables: getAllPermissionsQueryVariables,
      options?: C
    ): Promise<getAllPermissionsQuery> {
      return requester<getAllPermissionsQuery, getAllPermissionsQueryVariables>(
        getAllPermissionsDocument,
        variables,
        options
      ) as Promise<getAllPermissionsQuery>;
    },
    getAllTokenPermissions(
      variables: getAllTokenPermissionsQueryVariables,
      options?: C
    ): Promise<getAllTokenPermissionsQuery> {
      return requester<
        getAllTokenPermissionsQuery,
        getAllTokenPermissionsQueryVariables
      >(
        getAllTokenPermissionsDocument,
        variables,
        options
      ) as Promise<getAllTokenPermissionsQuery>;
    },
    getAllFunctionCallPermissions(
      variables: getAllFunctionCallPermissionsQueryVariables,
      options?: C
    ): Promise<getAllFunctionCallPermissionsQuery> {
      return requester<
        getAllFunctionCallPermissionsQuery,
        getAllFunctionCallPermissionsQueryVariables
      >(
        getAllFunctionCallPermissionsDocument,
        variables,
        options
      ) as Promise<getAllFunctionCallPermissionsQuery>;
    },
    getMemberList(
      variables: getMemberListQueryVariables,
      options?: C
    ): Promise<getMemberListQuery> {
      return requester<getMemberListQuery, getMemberListQueryVariables>(
        getMemberListDocument,
        variables,
        options
      ) as Promise<getMemberListQuery>;
    },
    getNumberOfActiveProposals(
      variables: getNumberOfActiveProposalsQueryVariables,
      options?: C
    ): Promise<getNumberOfActiveProposalsQuery> {
      return requester<
        getNumberOfActiveProposalsQuery,
        getNumberOfActiveProposalsQueryVariables
      >(
        getNumberOfActiveProposalsDocument,
        variables,
        options
      ) as Promise<getNumberOfActiveProposalsQuery>;
    },
    getGuildConfig(
      variables: getGuildConfigQueryVariables,
      options?: C
    ): Promise<getGuildConfigQuery> {
      return requester<getGuildConfigQuery, getGuildConfigQueryVariables>(
        getGuildConfigDocument,
        variables,
        options
      ) as Promise<getGuildConfigQuery>;
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
