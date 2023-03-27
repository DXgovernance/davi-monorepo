import { ActionEditorProps } from '..';
import { Button } from 'components/primitives/Button';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'components/primitives/Forms/Input';
import { TokenAmountInput } from 'components/primitives/Forms/TokenAmountInput';
import { BigNumber, FixedNumber, utils } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import LimitOrder, {
  ValidateLimitOrderValues as LimitOrderValues,
} from './validateLimitOrder';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { CowQuote, useCow } from 'hooks/Guilds/cow/useCow';
import {
  FieldError,
  Spacer,
  SwapQuoteError,
  UnitPriceContainer,
} from './CowLimitOrderEditor.styled';
import { BiRefresh } from 'react-icons/bi';
import { ERC20_APPROVE_SIGNATURE, getNetworkById } from 'utils';
import { DecodedCall, SupportedAction } from 'components/ActionsBuilder/types';
import {
  settlementContractAddress,
  vaultRelayerContractAddress,
} from 'hooks/Guilds/cow/config';
import ERC20 from 'contracts/ERC20.json';
import { Loading } from 'components/primitives/Loading';
import { useDebounce } from 'hooks/Guilds/useDebounce';
import { TokenPickerInput } from 'components/TokenPickerInput';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { Box } from 'components/primitives/Layout';
import { formatUnits } from 'ethers/lib/utils';
import useStringToBigNumber from 'hooks/Guilds/conversions/useStringToBigNumber';

const CowLimitOrderEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
  isEdit,
}) => {
  const { t } = useTranslation();

  const { guildId } = useTypedParams();

  const { chain } = useNetwork();

  const nativeTokenSymbol = useMemo(() => {
    return getNetworkById(chain?.id).nativeAsset.symbol;
  }, [chain]);

  const { getQuote, createOrder, getNativePrice, error: cowError } = useCow();

  const [quote, setQuote] = useState<CowQuote>(null);
  const [isUnitPriceOverridden, setIsUnitPriceOverridden] = useState(false);

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    /**
     * Only the sell amount will be used to calculate the quote since reversed quotes are not supported
     */
    return {
      buyToken: decodedCall.optionalProps.buyToken,
      sellToken: decodedCall.optionalProps.sellToken,
      sellAmount: decodedCall.optionalProps.sellAmount,
    };
  }, [decodedCall]);

  const { control, handleSubmit, getValues, watch } = useForm({
    resolver: LimitOrder,
    context: { t },
    defaultValues: parsedData,
  });

  const { buyToken, sellToken, sellAmount } = getValues();
  const watchSellAmount = watch('sellAmount');
  const watchSellToken = watch('sellToken');
  const watchBuyToken = watch('buyToken');

  const { data: sellTokenInfo } = useERC20Info(watchSellToken);
  const { data: buyTokenInfo } = useERC20Info(watchBuyToken);

  // useDebounce will make sure we're not spamming the cow api
  const debouncedSellAmount = useDebounce(watchSellAmount, 200);

  const [unitBuyPrice, setUnitBuyPrice] = useState<string>(null);

  const buyAmount = useMemo(() => {
    if (!quote || !unitBuyPrice || unitBuyPrice === '0') return '';

    try {
      return FixedNumber.from(1)
        .divUnsafe(FixedNumber.from(unitBuyPrice))
        .mulUnsafe(
          FixedNumber.from(
            formatUnits(quote?.sellAmount, sellTokenInfo?.decimals)
          )
        )
        .round(8)
        ?.toString();
    } catch (error) {
      console.log(error);
      return '0';
    }
  }, [quote, unitBuyPrice, sellTokenInfo]);

  const retrieveUnitprice = useCallback(async () => {
    return await getNativePrice(buyToken, buyTokenInfo?.decimals);
  }, [buyToken, getNativePrice, buyTokenInfo?.decimals]);

  const handleUnitPriceChange = (value: string) => {
    setUnitBuyPrice(value);
    setIsUnitPriceOverridden(true);
  };

  const isQuoteLoading = useMemo(() => {
    if (
      buyToken &&
      sellToken &&
      debouncedSellAmount &&
      !quote &&
      !isUnitPriceOverridden
    ) {
      return true;
    }

    return false;
  }, [quote, buyToken, debouncedSellAmount, sellToken, isUnitPriceOverridden]);

  useEffect(() => {
    if (
      !buyToken ||
      !sellToken ||
      !debouncedSellAmount ||
      quote ||
      isUnitPriceOverridden
    ) {
      return () => {};
    }

    let isActive = true;

    const requestQuote = async () => {
      try {
        const quote = await getQuote({
          buyToken: buyToken,
          sellToken: sellToken,
          sellAmount: BigNumber.from(debouncedSellAmount).toString(),
          receiver: guildId,
        });

        if (isActive) {
          setQuote(quote);
          // setIsUnitPriceOverridden(false);
        }
      } catch (e: any) {
        console.log('error getting quote ', e);
      }
    };

    requestQuote();

    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSellAmount,
    buyToken,
    sellToken,
    guildId,
    isUnitPriceOverridden,
  ]);

  useEffect(() => {
    if (!buyToken || isUnitPriceOverridden || !sellToken) {
      return () => {};
    }

    let isActive = true;

    const requestUnitPrice = async () => {
      try {
        // retrieve native price before getting the quote,
        // else if quote has an error will get it dismissed.
        const unitPrice = await retrieveUnitprice();

        if (isActive) {
          setUnitBuyPrice(unitPrice?.toString());
        }
      } catch (e: any) {
        console.log('error getting unit price ', e);
      }
    };

    requestUnitPrice();

    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    buyToken,
    sellToken,
  ]);

  const buyAmountBN = useStringToBigNumber(buyAmount, buyTokenInfo?.decimals);

  const submitAction = async (values: LimitOrderValues) => {
    const orderId = await createOrder({
      ...quote,
      buyAmount: buyAmountBN?.toString(),
      sellAmount: sellAmount?.toString(),
    });
    const ERC20Contract = new utils.Interface(ERC20.abi);
    const cowApprovalCall: DecodedCall = {
      ...decodedCall,
      callType: SupportedAction.ERC20_APPROVE,
      to: values.sellToken,
      function: ERC20Contract.getFunction('approve'),
      args: {
        spender: vaultRelayerContractAddress,
        amount: values.sellAmount,
      },
      optionalProps: {
        functionSignature: ERC20_APPROVE_SIGNATURE,
      },
    };

    const limitOrderCall: DecodedCall = {
      ...decodedCall,
      to: settlementContractAddress,
      args: {
        orderUid: orderId,
        signed: true,
      },
      optionalProps: {
        sellAmount: values.sellAmount,
        buyToken: values.buyToken,
        sellToken: values.sellToken,
        functionSignature: '',
      },
    };

    if (isEdit) {
      // in case of edit mode we submit only one action that is being edited
      return onSubmit([limitOrderCall]);
    }

    return onSubmit([cowApprovalCall, limitOrderCall]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        <ControlRow>
          <Controller
            name="sellToken"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { error } = fieldState;
              return (
                <>
                  <Control>
                    <ControlLabel>
                      {t('actionBuilder.inputs.sellToken')}
                    </ControlLabel>

                    <TokenPickerInput
                      {...field}
                      placeholder={t('actionBuilder.inputs.sellToken')}
                      onChange={sellToken => {
                        setQuote(null);
                        setIsUnitPriceOverridden(false);
                        field.onChange(sellToken);
                      }}
                      value={field.value}
                      readOnly
                    />
                    {!!error?.message && (
                      <FieldError>{error.message}</FieldError>
                    )}
                  </Control>
                </>
              );
            }}
          />

          <Spacer />

          <Controller
            name="buyToken"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { error } = fieldState;
              return (
                <>
                  <Control>
                    <ControlLabel>
                      {t('actionBuilder.inputs.buyToken')}
                    </ControlLabel>

                    <TokenPickerInput
                      {...field}
                      placeholder={t('actionBuilder.inputs.buyToken')}
                      onChange={buyToken => {
                        setQuote(null);
                        setIsUnitPriceOverridden(false);
                        field.onChange(buyToken);
                      }}
                      value={field.value}
                      readOnly
                    />
                    {!!error?.message && (
                      <FieldError>{error.message}</FieldError>
                    )}
                  </Control>
                </>
              );
            }}
          />
        </ControlRow>

        <ControlRow>
          <Controller
            name="sellAmount"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { error } = fieldState;

              return (
                <Control>
                  <ControlLabel>
                    {t('actionBuilder.inputs.sellAmount')}
                  </ControlLabel>
                  <>
                    <ControlRow>
                      <TokenAmountInput
                        {...field}
                        decimals={sellTokenInfo?.decimals}
                        isInvalid={!!error?.message}
                        onChange={sellAmount => {
                          setIsUnitPriceOverridden(false);
                          setQuote(null);
                          field.onChange(sellAmount);
                        }}
                      />
                    </ControlRow>

                    {!!error?.message && (
                      <FieldError>{error.message}</FieldError>
                    )}
                  </>
                </Control>
              );
            }}
          />
        </ControlRow>

        <ControlRow>
          <Controller
            name="unitBuyPrice"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { error } = fieldState;
              return (
                <>
                  <Control>
                    <UnitPriceContainer>
                      <ControlLabel>
                        {buyTokenInfo?.symbol
                          ? t('actionBuilder.inputs.pricePerToken', {
                              token: buyTokenInfo?.symbol,
                            })
                          : t('actionBuilder.inputs.unitBuyPrice')}{' '}
                        in{' '}
                        {isQuoteLoading ? (
                          <Loading
                            loading
                            text
                            skeletonProps={{ height: '1rem', width: '1.6rem' }}
                            style={{ marginLeft: '0.5rem' }}
                          />
                        ) : (
                          <>{nativeTokenSymbol}</>
                        )}
                      </ControlLabel>
                      {!isQuoteLoading && (
                        <UnitPriceContainer
                          onClick={async () => {
                            const unitPrice = await retrieveUnitprice();
                            setUnitBuyPrice(unitPrice?.toString());
                            setIsUnitPriceOverridden(false);
                          }}
                        >
                          <Box>Market Price</Box>
                          <BiRefresh size={20} />
                        </UnitPriceContainer>
                      )}
                    </UnitPriceContainer>
                    {isQuoteLoading ? (
                      <Loading
                        loading
                        text
                        skeletonProps={{ height: '2.6rem' }}
                      />
                    ) : (
                      <>
                        <ControlRow>
                          <Input
                            {...field}
                            placeholder={'0.0'}
                            value={unitBuyPrice}
                            onChange={e => {
                              handleUnitPriceChange(e.target.value);
                            }}
                          />
                        </ControlRow>
                        {!!error && <FieldError>{error.message}</FieldError>}
                      </>
                    )}
                  </Control>
                </>
              );
            }}
          />
        </ControlRow>

        <ControlRow>
          <>
            <Control>
              <ControlLabel>
                {t('actionBuilder.inputs.atLeastAmount')} {buyTokenInfo?.symbol}
              </ControlLabel>
              {isQuoteLoading ? (
                <Loading loading text skeletonProps={{ height: '2.6rem' }} />
              ) : (
                <>
                  <ControlRow>
                    <Input
                      placeholder={'0.0'}
                      value={buyAmount}
                      disabled={true}
                    />
                  </ControlRow>
                </>
              )}
            </Control>
          </>
        </ControlRow>

        {cowError && <SwapQuoteError>{cowError}</SwapQuoteError>}

        {isQuoteLoading ? (
          <Loading
            loading
            text
            skeletonProps={{ height: '2.6rem' }}
            style={{ margin: '1rem 0 0' }}
          />
        ) : (
          <Button
            m="1rem 0 0"
            fullWidth
            data-testid="submit-cowLimitOrder"
            type="submit"
            disabled={!quote}
          >
            {t('actionBuilder.action.saveAction')}
          </Button>
        )}
      </form>
    </div>
  );
};

export default CowLimitOrderEditor;
