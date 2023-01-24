import { useEffect, useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';

import { useHookStoreProvider } from 'stores';
import useMiniSearch from 'hooks/useMiniSearch';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { Heading } from 'components/primitives/Typography';
import { Divider } from 'components/Divider';
import { Loading } from 'components/primitives/Loading';
import { Input } from 'components/primitives/Forms/Input';
import { BlockExplorerLink } from 'components/primitives/Links';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import {
  MainContainer,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Members.styled';

interface IMemberData {
  address: `0x${string}`;
  tokensLocked: BigNumber;
}

interface IMemberDataIndexable extends IMemberData {
  id: string;
}

interface IMemberRow extends IMemberData {
  totalTokensLocked: BigNumber;
  tokenSymbol: string;
  decimals: number;
}

const fakeData: IMemberData[] = [
  {
    address: '0x0b17cf48420400e1D71F8231d4a8e43B3566BB5B',
    tokensLocked: BigNumber.from('20400000000000000000'),
  },
  {
    address: '0x95a223299319022a842D0DfE4851C145A2F615B9',
    tokensLocked: BigNumber.from('20400000000000000000'),
  },
  {
    address: '0x08EEc580AD41e9994599BaD7d2a74A9874A2852c',
    tokensLocked: BigNumber.from('20400000000000000000'),
  },
  {
    address: '0x3346987E123Ffb154229F1950981d46E9F5C90dE',
    tokensLocked: BigNumber.from('17340000000000000000'),
  },
  {
    address: '0x548872d38B4F29b59eb0b231C3F451539e9b5149',
    tokensLocked: BigNumber.from('13260000000000000000'),
  },
  {
    address: '0x4e91c9F086DB2Fd8aDb1888e9b18e17F70B7BdB6',
    tokensLocked: BigNumber.from('3059999999999999600'),
  },
  {
    address: '0x7958bA4a50498fAf40476D613D886F683c464bec',
    tokensLocked: BigNumber.from('9180000000000000000'),
  },
];

// TODO: add styling to match new design
// TODO: replace fake data with subgraph fetcher
// TODO: make logic to display when the subgraph data isn't available
// TODO: replace hardcoded hex codes with theme references in Members.styled
// TODO: make columns sortable?

const MemberRow = ({
  address,
  tokensLocked,
  totalTokensLocked,
  tokenSymbol,
  decimals,
}: IMemberRow) => {
  const roundedBalance = useBigNumberToNumber(tokensLocked, decimals ?? 18, 3);
  const votingPowerPercent = useVotingPowerPercent(
    tokensLocked,
    totalTokensLocked
  );

  return (
    <>
      <TableRow>
        <TableCell width="auto">
          <BlockExplorerLink address={address} showAvatar />
        </TableCell>
        <TableCell alignment={'right'} width="15%">
          {roundedBalance} {tokenSymbol ?? ''}
        </TableCell>
        <TableCell alignment={'right'} width="15%">
          {votingPowerPercent !== null ? (
            votingPowerPercent.toString()
          ) : (
            <Loading loading text skeletonProps={{ width: '40px' }} />
          )}{' '}
          %
        </TableCell>
      </TableRow>
    </>
  );
};

const Members = () => {
  const { t } = useTranslation();
  const { guildId: daoAddress } = useTypedParams();
  const {
    hooks: {
      fetchers: { useTotalLocked, useGuildConfig },
    },
  } = useHookStoreProvider();

  const { data: totalTokensLocked } = useTotalLocked(daoAddress);
  const { data: guildConfig } = useGuildConfig(daoAddress);
  const { data: guildToken } = useERC20Info(guildConfig?.token);

  const indexedMembers = useMemo(() => {
    return fakeData?.map(member => {
      return {
        ...member,
        id: member.address,
      };
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const { instance, buildIndex, query } = useMiniSearch<IMemberDataIndexable>({
    fields: ['address'],
    searchOptions: {
      fuzzy: 2,
      prefix: true,
    },
  });

  useEffect(() => {
    if (indexedMembers && instance?.documentCount !== indexedMembers?.length) {
      buildIndex(indexedMembers);
    }
  }, [buildIndex, indexedMembers, instance]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return query({ queries: [searchQuery] });
  }, [searchQuery, query]);

  return (
    <MainContainer>
      <Input
        icon={<FiSearch />}
        placeholder={t('searchMemberOrAddress')}
        value={searchQuery}
        onChange={e => setSearchQuery(e?.target?.value)}
      />
      <Heading size={2}>{t('members')}</Heading>
      <Divider />

      <Table>
        <TableHead>
          <tr>
            <TableHeader alignment={'left'}>{t('member')}</TableHeader>
            <TableHeader alignment={'right'}>
              {guildToken?.symbol ?? ''}
              {` ${t('amount')}`}
            </TableHeader>
            <TableHeader alignment={'right'}>{t('votingPower')}</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {(searchQuery ? searchResults : indexedMembers)?.map(member => {
            return (
              <MemberRow
                address={member.address}
                tokensLocked={member.tokensLocked}
                totalTokensLocked={totalTokensLocked}
                tokenSymbol={guildToken.symbol}
                decimals={guildToken.decimals}
                key={member.address}
              />
            );
          })}
        </tbody>
      </Table>
    </MainContainer>
  );
};

export default Members;
