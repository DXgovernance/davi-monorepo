import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import {
  ANY_FUNC_SIGNATURE,
  ERC20_APPROVE_SIGNATURE,
  ERC20_TRANSFER_SIGNATURE,
  getChainIcon,
  getNetworkById,
  resolveUri,
  tokenList,
  ZERO_ADDRESS,
} from 'utils';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TokenNameAndSymbol,
} from './Permissions.styled';
import { Avatar } from 'components/Avatar';
import { BlockExplorerLink } from 'components/primitives/Links';
import { BiInfinite } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { Loading } from 'components/primitives/Loading';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { FetcherHooksInterface } from 'stores/types';

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
  const { t } = useTranslation();
  const { chain } = useNetwork();
  const { tokenAddress } = token;
  const { data: tokenInfo } = useERC20Info(tokenAddress);
  const tokenUri = useMemo(() => {
    if (tokenAddress === ZERO_ADDRESS) {
      return `${window.location.origin}${getChainIcon(chain?.id)}`;
    } else {
      const tokenData = tokenList?.tokens?.find(token => {
        if (token?.address === tokenAddress) return true;
        return false;
      });
      return tokenData?.logoURI;
    }
  }, [chain?.id, tokenAddress]);

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
    const fromTime = token?.fromTime?.toString();
    const canTransfer =
      fromTime === '0' || fromTime === undefined ? false : true;

    if (hasApproval && canTransfer) return `${t('approve')} & ${t('transfer')}`;
    else if (hasApproval) return t('approve');
    else if (canTransfer) return t('transfer');
    return null;
  }, [t, token?.fromTime, token?.hasApproval]);

  return (
    <TableRow>
      <TableCell alignment="left">
        <TokenNameAndSymbol>
          <Avatar
            src={resolveUri(tokenUri)}
            defaultSeed={tokenAddress}
            size={24}
          />

          {tokenSymbol}
        </TokenNameAndSymbol>
      </TableCell>
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

interface IAssetPermissions {
  tokenPermissions: ReturnType<FetcherHooksInterface['useGetAllPermissions']>;
}

const AssetPermissions = ({ tokenPermissions }: IAssetPermissions) => {
  const { t } = useTranslation();

  const parsedPermissions = useMemo(() => {
    interface IPermissions {
      [key: string]: ITokenPermission;
    }

    const result: IPermissions = {};

    tokenPermissions?.data?.forEach(token => {
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
  }, [tokenPermissions]);

  return (
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
        {tokenPermissions ? (
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
  );
};

export default AssetPermissions;
