import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BiInfinite } from 'react-icons/bi';
import { BigNumber } from 'ethers';
import { useNetwork } from 'wagmi';
import {
  ZERO_ADDRESS,
  getNetworkById,
  ERC20_TRANSFER_SIGNATURE,
  ERC20_APPROVE_SIGNATURE,
  ANY_FUNC_SIGNATURE,
} from 'utils';
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
import { fakeDataTokens } from './fakeData';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';

interface ITokenPermission {
  tokenAddress: string;
  hasApproval: boolean;
  fromTime?: BigNumber;
  valueAllowed?: BigNumber;
}

interface IAssetPermissionRow {
  token: ITokenPermission;
}

const AssetPermissionRow = ({ token }: IAssetPermissionRow) => {
  const { chain } = useNetwork();
  const { tokenAddress } = token;
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

  const tokenPermissions = useMemo(() => {
    const hasApproval = token?.hasApproval;
    const canTransfer = token?.fromTime?.toString() !== '0';

    if (hasApproval && canTransfer) return 'Approve & Transfer';
    else if (hasApproval) return 'Approve';
    else if (canTransfer) return 'Transfer';
    else return 'ERROR';
  }, [token?.fromTime, token?.hasApproval]);

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
      <TableCell alignment="right">{tokenPermissions}</TableCell>
    </TableRow>
  );
};

const Permissions = () => {
  const { t } = useTranslation();

  const permissions = fakeDataTokens;

  const parsedPermissions = useMemo(() => {
    interface IPermissions {
      [key: string]: ITokenPermission;
    }

    const result: IPermissions = {};

    // This assumes that the data returns only tokens
    permissions.forEach(token => {
      const tokenAddress = token.to;

      if (!result[tokenAddress]) {
        result[tokenAddress] = {
          tokenAddress,
          hasApproval: false,
        };
      }

      switch (token.functionSignature) {
        case ERC20_APPROVE_SIGNATURE:
          result[tokenAddress].hasApproval = true;
          break;
        case ERC20_TRANSFER_SIGNATURE:
          result[tokenAddress].fromTime = token.fromTime;
          result[tokenAddress].valueAllowed = token.valueAllowed;
          break;
        case ANY_FUNC_SIGNATURE:
          result[tokenAddress].fromTime = token.fromTime;
          result[tokenAddress].valueAllowed = token.valueAllowed;
          result[tokenAddress].hasApproval = true;
          break;
        default:
          break;
      }
    });

    return result;
  }, [permissions]);

  return (
    <MainContainer>
      <Heading size={2}>Permissions tab TODO</Heading>
      <Table>
        <TableHead>
          <tr>
            <TableHeader alignment={'left'}>{t('asset')}</TableHeader>
            <TableHeader alignment={'left'}>{t('assetAddress')}</TableHeader>
            <TableHeader alignment={'right'}>{t('allowedAmount')}</TableHeader>
            <TableHeader alignment={'right'}>
              {t('permissions.permissions')}
            </TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {permissions ? (
            Object.keys(parsedPermissions)?.map(tokenAddress => {
              const currentValue = parsedPermissions[tokenAddress];
              return (
                <AssetPermissionRow token={currentValue} key={tokenAddress} />
              );
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
