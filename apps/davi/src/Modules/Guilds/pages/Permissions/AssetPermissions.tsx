import { useEffect, useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { BiInfinite } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';

import {
  ANY_FUNC_SIGNATURE,
  ERC20_APPROVE_SIGNATURE,
  ERC20_TRANSFER_SIGNATURE,
  getChainIcon,
  getNetworkById,
  resolveUri,
  ZERO_ADDRESS,
} from 'utils';
import { FetcherHooksInterface } from 'stores/types';
import { Avatar } from 'components/Avatar';
import { BlockExplorerLink } from 'components/primitives/Links';
import { Loading } from 'components/primitives/Loading';
import { Box } from 'components/primitives/Layout';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TokenNameAndSymbol,
} from './Permissions.styled';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';

interface IAssetPermissions {
  tokenPermissions: ReturnType<FetcherHooksInterface['useGetAllPermissions']>;
}

interface ITokenPermission {
  tokenAddress: string;
  hasApproval: boolean;
  fromTime?: BigNumber;
  valueAllowed?: BigNumber;
}

interface IAssetPermissionRow {
  token: ITokenPermission;
}

interface IParsedPermissions {
  [key: string]: ITokenPermission;
}

const AssetPermissionRow = ({ token }: IAssetPermissionRow) => {
  const { t } = useTranslation();
  const { chain } = useNetwork();
  const { tokenAddress } = token;
  const { data: tokenInfo } = useERC20Info(tokenAddress);
  const { tokens: tokenList } = useTokenList(chain?.id);

  const tokenUri = useMemo(() => {
    if (tokenAddress === ZERO_ADDRESS) {
      return `${window.location.origin}${getChainIcon(chain?.id)}`;
    } else {
      const tokenData = tokenList?.find(token => {
        if (token?.address === tokenAddress) return true;
        return false;
      });
      return tokenData?.logoURI;
    }
  }, [chain?.id, tokenAddress, tokenList]);

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

    if (hasApproval && canTransfer)
      return `${t('actionBuilder.approval.approve')} & ${t(
        'actionBuilder.transfer.transfer'
      )}`;
    else if (hasApproval) return t('actionBuilder.approval.approve');
    else if (canTransfer) return t('actionBuilder.transfer.transfer');
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

const AssetPermissions = ({ tokenPermissions }: IAssetPermissions) => {
  const { t } = useTranslation();

  const parsedPermissions = useMemo(() => {
    const result: IParsedPermissions = {};

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

  const [dataState, setDataState] = useState<
    'loading' | 'error' | 'permissionsData' | 'noPermissions'
  >(tokenPermissions?.data?.length > 0 ? 'permissionsData' : 'loading');

  useEffect(() => {
    if (tokenPermissions.isError) return setDataState('error');
    if (tokenPermissions.isLoading || !tokenPermissions)
      return setDataState('loading');
    if (tokenPermissions.data.length > 0)
      return setDataState('permissionsData');
    if (tokenPermissions.data.length === 0)
      return setDataState('noPermissions');
    else return setDataState('permissionsData');
  }, [tokenPermissions]);

  return (
    <>
      {dataState === 'error' && (
        <Box margin={'24px 0 0 0'}>
          {t('actionBuilder.permissions.dataNotAvailable')}.
        </Box>
      )}

      {dataState === 'loading' && (
        <Box margin={'24px 0 0 0'} data-testid={'loading'}>
          <Loading loading text />
        </Box>
      )}

      {dataState === 'noPermissions' && (
        <Box margin={'24px 0 0 0'} data-testid={'no-permissions-message'}>
          {t('actionBuilder.permissions.noPermissionsSet')}.
        </Box>
      )}

      {dataState === 'permissionsData' && (
        <Table>
          <TableHead>
            <tr>
              <TableHeader alignment={'left'}>
                {t('actionBuilder.inputs.asset')}
              </TableHeader>
              <TableHeader alignment={'left'}>
                {t('actionBuilder.inputs.address')}
              </TableHeader>
              <TableHeader alignment={'right'}>
                {t('actionBuilder.permissions.allowedAmount')}
              </TableHeader>
              <TableHeader alignment={'right'}>
                {t('actionBuilder.permissions.permissions')}
              </TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {Object.keys(parsedPermissions)?.map(tokenAddress => {
              const currentToken = parsedPermissions[tokenAddress];
              return (
                <AssetPermissionRow token={currentToken} key={tokenAddress} />
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AssetPermissions;
