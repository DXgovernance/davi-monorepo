import { useEffect, useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';

import { useHookStoreProvider } from 'stores';
import useMiniSearch from 'hooks/useMiniSearch';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { Heading } from 'components/primitives/Typography';
import { Loading } from 'components/primitives/Loading';
import { Input } from 'components/primitives/Forms/Input';
import { BlockExplorerLink } from 'components/primitives/Links';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import {
  MainContainer,
  StyledDivider,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Members.styled';
import { Box } from 'components/primitives/Layout';

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

// TODO: make logic to display when the subgraph data isn't available

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
          <BlockExplorerLink
            address={address}
            showAvatar
            fetchTokenData={false}
          />
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
      fetchers: { useTotalLocked, useGuildConfig, useGetMemberList },
    },
  } = useHookStoreProvider();

  const { data: memberList, isLoading: isMemberListLoading } =
    useGetMemberList(daoAddress);
  const { data: totalTokensLocked } = useTotalLocked(daoAddress);
  const { data: guildConfig } = useGuildConfig(daoAddress);
  const { data: guildToken } = useERC20Info(guildConfig?.token);

  const [searchQuery, setSearchQuery] = useState('');
  const { instance, buildIndex, query } = useMiniSearch<IMemberDataIndexable>({
    fields: ['address'],
    searchOptions: {
      fuzzy: 2,
      prefix: true,
    },
  });

  useEffect(() => {
    if (memberList && instance?.documentCount !== memberList?.length) {
      buildIndex(memberList);
    }
  }, [buildIndex, memberList, instance]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return query({ queries: [searchQuery] });
  }, [searchQuery, query]);

  return (
    <>
      <Input
        icon={<FiSearch />}
        placeholder={t('searchMemberOrAddress')}
        value={searchQuery}
        onChange={e => setSearchQuery(e?.target?.value)}
      />
      <MainContainer>
        <Heading size={2}>{t('members')}</Heading>
        <StyledDivider />

        {!isMemberListLoading ? (
          <Table>
            <TableHead>
              <tr>
                <TableHeader alignment={'left'}>{t('member')}</TableHeader>
                <TableHeader alignment={'right'}>
                  {guildToken?.symbol ?? ''}
                  {` ${t('amount')}`}
                </TableHeader>
                <TableHeader alignment={'right'}>
                  {t('votingPower')}
                </TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {(searchQuery ? searchResults : memberList)?.map(member => {
                return (
                  <MemberRow
                    address={member?.address}
                    tokensLocked={member?.tokensLocked}
                    totalTokensLocked={totalTokensLocked}
                    tokenSymbol={guildToken?.symbol}
                    decimals={guildToken?.decimals}
                    key={member?.address}
                  />
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Box margin={'20px 0px'}>
            <Loading loading text />
          </Box>
        )}
      </MainContainer>
    </>
  );
};

export default Members;
