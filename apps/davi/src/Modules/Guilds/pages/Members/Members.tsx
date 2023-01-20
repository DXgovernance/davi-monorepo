import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';

import { useHookStoreProvider } from 'stores';
import { Heading } from 'components/primitives/Typography';
import { Divider } from 'components/Divider';
import { IconHolder } from 'components/AddressButton/AddressButton.styled';
import { Avatar } from 'components/Avatar';
import { Loading } from 'components/primitives/Loading';
import { Flex } from 'components/primitives/Layout';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';

import {
  AddressSpan,
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

// TODO: Implement searching

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
  const { ensName, imageUrl } = useENSAvatar(address);

  return (
    <TableRow>
      <TableCell width="auto">
        <Flex direction="row" justifyContent="flex-start">
          <IconHolder>
            <Avatar src={imageUrl} defaultSeed={address} />
          </IconHolder>
          <AddressSpan>
            {address ? ensName || address : <Loading loading text />}
          </AddressSpan>
        </Flex>
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

  return (
    <MainContainer>
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
          {fakeData.map(member => {
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
