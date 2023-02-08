import { useEffect, useMemo, useState } from 'react';
import { BiInfinite } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';

import { getBlockExplorerUrl } from 'provider';
import { getNetworkById, MAINNET_ID, shortenAddress } from 'utils';
import { FetcherHooksInterface } from 'stores/types';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { useDecodedCall } from 'hooks/Guilds/contracts/useDecodedCall';
import { Call } from 'components/ActionsBuilder/types';
import { Loading } from 'components/primitives/Loading';
import { Box } from 'components/primitives/Layout';
import { Toggle } from 'components/primitives/Forms/Toggle';
import { ExternalLink } from 'components/primitives/Links/ExternalLink';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToggleContainer,
  ToggleLabel,
} from './Permissions.styled';

interface IFunctionCallPermissions {
  functionCallPermissions: ReturnType<
    FetcherHooksInterface['useGetAllPermissions']
  >;
}

interface IFunctionCallRow {
  functionCall: IFunctionCallPermissions['functionCallPermissions']['data'][0];
  showAdvancedView: boolean;
}

const FunctionCallPermissionRow = ({
  functionCall,
  showAdvancedView,
}: IFunctionCallRow) => {
  const { chain } = useNetwork();

  const nativeAsssetDecimals = getNetworkById(chain?.id).nativeAsset.decimals;

  const formattedValueAllowed = useBigNumberToNumber(
    functionCall?.valueAllowed,
    nativeAsssetDecimals,
    3
  );

  const functionCallValueAllowed = useMemo(() => {
    return functionCall?.valueAllowed?.toString() === '0' ? (
      <BiInfinite size={20} />
    ) : (
      formattedValueAllowed
    );
  }, [formattedValueAllowed, functionCall?.valueAllowed]);

  const { ensName } = useENSAvatar(functionCall.to, MAINNET_ID);

  const dataForDecodedCall: Call = {
    from: functionCall.from,
    to: functionCall.to,
    value: functionCall.valueAllowed,
    data: functionCall.functionSignature,
  };

  const { decodedCall } = useDecodedCall(dataForDecodedCall);

  const functionNameDisplay = useMemo(() => {
    if (!decodedCall || !decodedCall.function) {
      return functionCall.functionSignature;
    } else {
      const functionName = decodedCall.function.name;
      const functionSignature = functionCall.functionSignature;
      const functionArgs = decodedCall?.function?.inputs?.reduce(
        (inputString, currentInput, index) => {
          if (index === 0) return currentInput.type;
          return `${inputString},${currentInput.type}`;
        },
        ''
      );

      if (showAdvancedView) {
        return (
          <>
            <Box> {functionName}</Box>
            <Box margin={'5px 0'}>({functionArgs})</Box>
            <Box>{functionSignature}</Box>
          </>
        );
      } else {
        return functionName;
      }
    }
  }, [decodedCall, functionCall?.functionSignature, showAdvancedView]);

  const contractDisplay = useMemo(() => {
    const contractUrl = getBlockExplorerUrl(chain, functionCall?.to, 'address');
    return (
      <ExternalLink href={contractUrl}>
        {ensName && <Box>{ensName}</Box>}
        {(!ensName || showAdvancedView) && (
          <Box>{shortenAddress(functionCall?.to)}</Box>
        )}
      </ExternalLink>
    );
  }, [chain, ensName, functionCall?.to, showAdvancedView]);

  return (
    <TableRow>
      <TableCell width={'34%'} alignment="left">
        {contractDisplay}
      </TableCell>
      <TableCell width={'33%'} alignment="left">
        {functionNameDisplay}
      </TableCell>
      <TableCell width={'33%'} alignment="right">
        {functionCallValueAllowed}
      </TableCell>
    </TableRow>
  );
};

const FunctionCallPermissions = ({
  functionCallPermissions,
}: IFunctionCallPermissions) => {
  const { t } = useTranslation();
  const [showAdvancedView, setShowAdvancedView] = useState(false);

  const [dataState, setDataState] = useState<
    'loading' | 'error' | 'permissionsData' | 'noPermissions'
  >(functionCallPermissions?.data?.length > 0 ? 'permissionsData' : 'loading');

  useEffect(() => {
    if (functionCallPermissions.isError) return setDataState('error');
    if (functionCallPermissions.isLoading || !functionCallPermissions)
      return setDataState('loading');
    if (functionCallPermissions.data.length > 0)
      return setDataState('permissionsData');
    if (functionCallPermissions.data.length === 0)
      return setDataState('noPermissions');
    else return setDataState('permissionsData');
  }, [functionCallPermissions]);

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
        <>
          <Table>
            <TableHead>
              <tr>
                <TableHeader alignment={'left'}>
                  {t('actionBuilder.inputs.contract')}
                </TableHeader>
                <TableHeader alignment={'left'}>
                  {t('actionBuilder.permissions.function')}
                </TableHeader>
                <TableHeader alignment={'right'}>
                  {t('actionBuilder.permissions.allowedAmount')}
                </TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {functionCallPermissions?.data?.map(functionCall => {
                return (
                  <FunctionCallPermissionRow
                    functionCall={functionCall}
                    showAdvancedView={showAdvancedView}
                    key={functionCall?.id}
                  />
                );
              })}
            </tbody>
          </Table>
          <ToggleContainer>
            <ToggleLabel>
              {t('actionBuilder.advanced.advancedView')}
            </ToggleLabel>
            <Toggle
              value={showAdvancedView}
              onChange={() => setShowAdvancedView(!showAdvancedView)}
              small
              name="toggle-advanced-view"
            />
          </ToggleContainer>
        </>
      )}
    </>
  );
};

export default FunctionCallPermissions;
