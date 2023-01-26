import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BiInfinite } from 'react-icons/bi';
import { ZERO_ADDRESS, getNetworkById } from 'utils';
import { Heading } from 'components/primitives/Typography';
import {
  MainContainer,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Permissions.styled';
import { Loading } from 'components/primitives/Loading';
import { BlockExplorerLink } from 'components/primitives/Links';
import { fakeDataTokens, ISubgraphPermissionData } from './fakeData';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useNetwork } from 'wagmi';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';

interface IAssetPermissionRow {
  token: ISubgraphPermissionData;
}

const AssetPermissionRow = ({ token }: IAssetPermissionRow) => {
  const { chain } = useNetwork();
  const tokenAddress = token.to;

  const { data: tokenInfo } = useERC20Info(tokenAddress);

  const tokenSymbol = useMemo(() => {
    return tokenInfo?.symbol ?? getNetworkById(chain?.id).nativeAsset.symbol;
  }, [chain?.id, tokenInfo?.symbol]);

  const decimals =
    tokenInfo?.decimals ?? getNetworkById(chain?.id).nativeAsset.decimals;

  const formattedValueAllowed = useBigNumberToNumber(
    token?.valueAllowed,
    decimals,
    3
  );

  const tokenValueAllowed = useMemo(() => {
    return token?.valueAllowed?.toString() === '0' ? (
      <BiInfinite size={20} />
    ) : (
      formattedValueAllowed
    );
  }, [token?.valueAllowed, formattedValueAllowed]);

  return (
    <TableRow>
      <TableCell alignment="left">{tokenSymbol}</TableCell>
      <TableCell alignment="left">
        <BlockExplorerLink
          shortAddress
          forceShowAddress
          address={tokenAddress ?? ZERO_ADDRESS}
        />
      </TableCell>
      <TableCell alignment="right">{tokenValueAllowed}</TableCell>
    </TableRow>
  );
};

const Permissions = () => {
  const { t } = useTranslation();

  const permissions = fakeDataTokens;

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
          {permissions ? (
            permissions?.map(token => {
              return <AssetPermissionRow token={token} key={token.id} />;
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
