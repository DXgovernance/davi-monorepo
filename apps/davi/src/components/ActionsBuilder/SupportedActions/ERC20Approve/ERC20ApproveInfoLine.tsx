import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import { IoSwapVerticalOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { useMemo } from 'react';

const ERC20ApproveInfoLine: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const { t } = useTranslation();

  const { chain } = useNetwork();
  const { tokens } = useTokenList(chain?.id, true);

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    const token = tokens.find(token => token.address === decodedCall.to);

    return {
      token,
    };
  }, [decodedCall, tokens]);

  return (
    <>
      <Segment>
        <IoSwapVerticalOutline size={16} />
      </Segment>
      <Segment>
        {t('actionBuilder.approval.erc20Approval', {
          tokenSymbol: parsedData?.token?.symbol,
        })}
      </Segment>
    </>
  );
};

export default ERC20ApproveInfoLine;
