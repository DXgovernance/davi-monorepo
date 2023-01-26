import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BiInfinite } from 'react-icons/bi';
import { ZERO_ADDRESS } from 'utils';
import { useHookStoreProvider } from 'stores';
import { TokenWithPermission } from 'types/types';
import { Heading } from 'components/primitives/Typography';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import {
  MainContainer,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Permissions.styled';
import { Loading } from 'components/primitives/Loading';

interface IAssetPermissionRow {
  token: TokenWithPermission;
}

const AssetPermissionRow = ({ token }: IAssetPermissionRow) => {
  const { valueAllowed, fromTime } = token.permission;
  const formattedValue = useBigNumberToNumber(
    valueAllowed,
    token?.decimals,
    3
  ).toString();

  const tokenValueAllowed = useMemo(() => {
    if (fromTime?.toString() === '0') return '0';
    if (valueAllowed?.toString() === '0') return <BiInfinite size={20} />;
    return formattedValue;
  }, [valueAllowed, fromTime, formattedValue]);

  return (
    <TableRow>
      <TableCell alignment="left">{token.symbol}</TableCell>
      <TableCell alignment="left">{token.address ?? ZERO_ADDRESS}</TableCell>
      <TableCell alignment="right">{tokenValueAllowed}</TableCell>
    </TableRow>
  );
};

const Permissions = () => {
  const {
    hooks: {
      fetchers: { useGetAllTokensPermissions },
    },
  } = useHookStoreProvider();
  const { t } = useTranslation();
  const { guildId } = useTypedParams();
  const { data: erc20TokensWithPermissions } =
    useGetAllTokensPermissions(guildId);

  return (
    <MainContainer>
      <Heading size={2}>Permissions tab TODO</Heading>
      <Table>
        <TableHead>
          <tr>
            <TableHeader alignment={'left'}>{t('asset')}</TableHeader>
            <TableHeader alignment={'left'}>{t('assetAddress')}</TableHeader>
            <TableHeader alignment={'right'}>{t('allowedAmount')}</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {erc20TokensWithPermissions ? (
            erc20TokensWithPermissions?.map(token => {
              return <AssetPermissionRow token={token} key={token.address} />;
            })
          ) : (
            <TableRow>
              <TableCell alignment={'left'}>
                <Loading loading text />
              </TableCell>
              <TableCell alignment={'left'}>
                <Loading loading text />
              </TableCell>
              <TableCell alignment={'right'}>
                <Loading loading text />
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </MainContainer>
  );
};

export default Permissions;
