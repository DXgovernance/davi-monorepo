import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { Loading } from 'components/primitives/Loading';
import {
  AssetNameContainer,
  Container,
  NoRecordsContainer,
  StyledDivider,
  StyledHeading,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  AssetIcon,
  AssetIconWrapper,
} from './Treasury.styled';
import { useAllERC20Balances } from 'hooks/Guilds/erc20/useAllERC20Balances';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { Result, ResultState } from 'components/Result';

interface IAssetRow {
  assetName: string;
  tokenBalance: BigNumber;
  decimals: number;
  logoURI: string;
}

const AssetRow = ({
  assetName,
  tokenBalance,
  decimals,
  logoURI,
}: IAssetRow) => {
  const roundedBalance = useBigNumberToNumber(tokenBalance, decimals ?? 18, 3);

  return (
    roundedBalance > 0 && (
      <>
        <TableRow>
          <TableCell width="auto" alignment="left">
            <AssetNameContainer>
              <AssetIconWrapper>
                {logoURI && <AssetIcon src={logoURI} alt={'Icon'} />}
              </AssetIconWrapper>
              <span>{assetName}</span>
            </AssetNameContainer>
          </TableCell>
          <TableCell alignment={'right'} width="20%">
            {roundedBalance}
          </TableCell>
        </TableRow>
      </>
    )
  );
};

const Treasury = ({ subDaoAddress = null }) => {
  const { t } = useTranslation();
  const { guildId: daoAddress } = useTypedParams();

  const treasuryAddress = subDaoAddress ?? daoAddress;

  const {
    data,
    isLoading: isBalancesLoading,
    isError: isErrorRetrievingBalances,
    error,
  } = useAllERC20Balances(treasuryAddress, true);

  /**
   * Setting up a key and filter out tokens with zero balances
   */
  const tokens = useMemo(() => {
    return data
      .map(token => {
        return {
          ...token,
          id: token.type === 'NATIVE' ? 'NATIVE' : token?.address,
        };
      })
      .filter(token => !token?.balance?.isZero());
  }, [data]);

  const PageContainer = ({ children }) => (
    <Container>
      <StyledHeading size={1}>{t('treasury.treasury')}</StyledHeading>
      <StyledDivider />
      {children}
    </Container>
  );

  if (isBalancesLoading) {
    return (
      <PageContainer>
        <NoRecordsContainer>
          <Loading loading text skeletonProps={{ height: '100px' }} />
        </NoRecordsContainer>
      </PageContainer>
    );
  }

  if (isErrorRetrievingBalances) {
    return (
      <PageContainer>
        <Result
          title={t('treasury.errorLoadingTreasuries')}
          subtitle={error?.message}
          state={ResultState.ERROR}
        />
      </PageContainer>
    );
  }

  if (!tokens || tokens?.length === 0) {
    return (
      <PageContainer>
        <NoRecordsContainer>
          {t('treasury.noTreasuryAssets')}
        </NoRecordsContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeader alignment={'left'}>{t('treasury.asset')}</TableHeader>
            <TableHeader alignment={'right'}>
              {` ${t('treasury.tokenAmount')}`}
            </TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {tokens?.map(token => {
            return (
              <AssetRow
                key={token?.id}
                assetName={token?.name}
                tokenBalance={token?.balance}
                decimals={token?.decimals}
                logoURI={token?.logoURI}
              />
            );
          })}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default Treasury;
