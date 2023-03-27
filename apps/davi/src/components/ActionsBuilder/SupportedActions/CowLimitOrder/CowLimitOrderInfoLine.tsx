import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { useNetwork } from 'wagmi';
import { IoSwapVerticalOutline } from 'react-icons/io5';
import { CowQuote, useCow } from 'hooks/Guilds/cow/useCow';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';

const CowLimitOrderInfoLine: React.FC<ActionViewProps> = ({ decodedCall }) => {
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

  const { data: buyTokenInfo } = useERC20Info(order?.buyToken);
  const { data: sellTokenInfo } = useERC20Info(order?.sellToken);

  return (
    <>
      <Segment>
        <IoSwapVerticalOutline size={16} />
      </Segment>
      <Segment>
        {`${t('actionBuilder.config.limitOrder')} ${roundedSellBalance} ${
          sellTokenInfo?.symbol
        }`}
      </Segment>
      <Segment>
        <FiArrowRight />
      </Segment>
      <Segment>
        {roundedBuyBalance} {buyTokenInfo?.symbol}
      </Segment>
    </>
  );
};

export default CowLimitOrderInfoLine;
