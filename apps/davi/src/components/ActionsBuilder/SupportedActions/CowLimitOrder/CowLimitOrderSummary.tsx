import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AmountContainer,
  DetailBody,
  DetailHeader,
  OrderViewContainer,
  SummaryRow,
} from './CowLimitOrderSummary.styled';
import { SummaryProps } from './types';
import { BlockExplorerLink } from 'components/primitives/Links';
import { SupportedAction } from 'components/ActionsBuilder/types';
import { Segment } from '../common/infoLine';
import { FiArrowRight } from 'react-icons/fi';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { BigNumber } from 'ethers';
import { useNetwork } from 'wagmi';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { CowQuote, useCow } from 'hooks/Guilds/cow/useCow';
import moment from 'moment';
import useTimeDifferenceHumanized from 'hooks/Guilds/time/useTimeDifferenceHumanized';

const CowLimitOrderSummary = ({ decodedCall }: SummaryProps) => {
  const { t } = useTranslation();

  const { chain } = useNetwork();
  const { tokens } = useTokenList(chain?.id, false);
  const [order, setOrder] = useState<CowQuote>(null);

  const findTokenByAddress = useCallback(
    (address: string) => {
      return tokens.find(
        token => token.address?.toLowerCase() === address?.toLowerCase()
      );
    },
    [tokens]
  );

  const { getOrder } = useCow();

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;
    return {
      orderId: decodedCall.args.orderUid,
    };
  }, [decodedCall]);

  useEffect(() => {
    if (!parsedData?.orderId) return;

    const fetchOrder = async () => {
      try {
        const order = await getOrder(parsedData?.orderId);
        setOrder(order);
      } catch (error) {
        console.log('error retrieving order', error);
      }
    };

    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedData?.orderId]);

  const roundedBuyBalance = useBigNumberToNumber(
    order?.buyAmount ? BigNumber.from(order?.buyAmount) : null,
    order?.buyToken ? findTokenByAddress(order?.buyToken).decimals : null,
    6
  );

  const roundedSellBalance = useBigNumberToNumber(
    order?.sellAmount ? BigNumber.from(order?.sellAmount) : null,
    order?.sellToken ? findTokenByAddress(order?.sellToken)?.decimals : null,
    6
  );

  const roundedFee = useBigNumberToNumber(
    order?.feeAmount ? BigNumber.from(order?.feeAmount) : null,
    order?.sellToken ? findTokenByAddress(order?.sellToken)?.decimals : null,
    6
  );

  const isLimitOrder = useMemo(() => {
    return decodedCall?.callType === SupportedAction.COW_SWAP_LIMIT_ORDER;
  }, [decodedCall?.callType]);

  const validToMoment = moment.unix(order?.validTo);

  const expTimeHumanized = useTimeDifferenceHumanized(validToMoment);
  /**
   * With the existing action builder architecture, the limit order approval also uses this summary view
   */
  if (!isLimitOrder) {
    return null;
  }

  return (
    <>
      <DetailHeader>
        {`${t('actionBuilder.action.executeLimitOrder')}`}
      </DetailHeader>

      <OrderViewContainer>
        <SummaryRow>
          <Segment>
            <AmountContainer>{roundedSellBalance}</AmountContainer>
            <BlockExplorerLink address={order?.sellToken} showAvatar />
          </Segment>
          <Segment>
            <FiArrowRight />
          </Segment>
          <Segment>
            <AmountContainer>{roundedBuyBalance}</AmountContainer>
            <BlockExplorerLink address={order?.buyToken} showAvatar />
          </Segment>
        </SummaryRow>
        <SummaryRow>Fee: {roundedFee}</SummaryRow>
        <SummaryRow>Expires in: {expTimeHumanized}</SummaryRow>
      </OrderViewContainer>

      <OrderViewContainer>
        <DetailBody>
          <BlockExplorerLink address={decodedCall?.to} showAvatar />
        </DetailBody>
      </OrderViewContainer>
    </>
  );
};

export default CowLimitOrderSummary;
