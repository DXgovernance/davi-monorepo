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
import { Box } from 'components/primitives/Layout';
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

interface IMemberData {
  id: string;
  address: `0x${string}`;
  tokensLocked: BigNumber;
}

interface IMemberRow extends Omit<IMemberData, 'id'> {
  totalTokensLocked: BigNumber;
  tokenSymbol: string;
  decimals: number;
}

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
        <TableCell>
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

  const {
    data: memberList,
    isLoading: isMemberListLoading,
    isError: memberListError,
  } = useGetMemberList(daoAddress);
  const { data: totalTokensLocked } = useTotalLocked(daoAddress);
  const { data: guildConfig } = useGuildConfig(daoAddress);
  const { data: guildToken } = useERC20Info(guildConfig?.token);

  const [searchQuery, setSearchQuery] = useState('');
  const { instance, buildIndex, query } = useMiniSearch<IMemberData>({
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

  const [dataState, setDataState] = useState<
    'loading' | 'error' | 'memberData' | 'noMembers'
  >('loading');
  useEffect(() => {
    if (memberListError) return setDataState('error');
    if (isMemberListLoading || !memberList) return setDataState('loading');
    if (memberList.length > 0) return setDataState('memberData');
    if (memberList.length === 0) return setDataState('noMembers');
    else return setDataState('memberData');
  }, [isMemberListLoading, memberList, memberListError]);

  return (
    <>
      {dataState === 'memberData' && (
        <Box margin={'0px 0px 20px 0px'}>
          <Input
            icon={<FiSearch />}
            placeholder={t('members.searchMemberOrAddress')}
            value={searchQuery}
            onChange={e => setSearchQuery(e?.target?.value)}
            data-testid={'search'}
          />
        </Box>
      )}
      <MainContainer>
        <Heading size={2}>{t('members.members')}</Heading>
        <StyledDivider />

        {dataState === 'error' && (
          <Box margin={'20px 0px'} data-testid={'error-message'}>
            {t('members.membersNotAvailable')}.
          </Box>
        )}

        {dataState === 'loading' && (
          <Box margin={'20px 0px'} data-testid={'loading'}>
            <Loading loading text />
          </Box>
        )}

        {dataState === 'noMembers' && (
          <Box margin={'20px 0px'} data-testid={'no-members-message'}>
            {t('members.noMembers')}.
          </Box>
        )}

        {dataState === 'memberData' && (
          <Table data-testid={'members-table'}>
            <TableHead>
              <tr>
                <TableHeader alignment={'left'}>
                  {t('members.member')}
                </TableHeader>
                <TableHeader alignment={'right'}>
                  {guildToken?.symbol ?? ''}
                  {` ${t('actionBuilder.inputs.amount')}`}
                </TableHeader>
                <TableHeader alignment={'right'}>
                  {t('voting.votingPower')}
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
        )}
      </MainContainer>
    </>
  );
};

export default Members;
