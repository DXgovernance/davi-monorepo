import { ActionEditorProps } from '..';
import { Button } from 'components/primitives/Button';
import { Controller, useForm } from 'react-hook-form';
import { Avatar } from 'components/Avatar';
import { TokenPicker } from 'components/TokenPicker';
import { Input } from 'components/primitives/Forms/Input';
import { TokenAmountInput } from 'components/primitives/Forms/TokenAmountInput';
import { BigNumber, FixedNumber, utils } from 'ethers';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { useMemo, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { resolveUri } from 'utils/url';
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
import { formatUnits } from 'ethers/lib/utils';
import { BiRefresh } from 'react-icons/bi';
import { ERC20_APPROVE_SIGNATURE, getNetworkById } from 'utils';
import { DecodedCall, SupportedAction } from 'components/ActionsBuilder/types';
import { settlementContractAddress, vaultRelayerContractAddress } from 'hooks/Guilds/cow/config';
import ERC20 from 'contracts/ERC20.json';
import { Loading } from 'components/primitives/Loading';

const CowLimitOrderEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
  isEdit,
}) => {
  const { t } = useTranslation();

  const { guildId } = useTypedParams();

  const { chain } = useNetwork();
  const { tokens } = useTokenList(chain?.id, true);

  const nativeTokenSymbol = useMemo(() => {
    return getNetworkById(chain?.id).nativeAsset.symbol;
  }, [chain]);

  const {
    getQuote,
    createOrder,
    getNativePrice,
    error: cowError,
  } = useCow();

  const [quote, setQuote] = useState<CowQuote>(null);
  const [isUnitPriceUpdated, setIsUnitPriceUpdated] = useState(false);
  const [isTokensUpdated, setIsTokensUpdated] = useState(false);

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    const buyToken = tokens.find(
      token => token.address === decodedCall.optionalProps.buyToken.address
    );
    const sellToken = tokens.find(
      token => token.address === decodedCall.optionalProps.sellToken.address
    );

    /**
     * Only the sell amount will be used to calculate the quote since reversed quotes are not supported
     */
    return {
      from: decodedCall.from,
      to: decodedCall.from, // Swap to the guild itself
      buyToken,
      sellToken,
      sellAmount: decodedCall.optionalProps.sellAmount,
      functionSignature: decodedCall.optionalProps.functionSignature,
    };
  }, [decodedCall, tokens]);

  const { control, handleSubmit, getValues, trigger } = useForm({
    resolver: LimitOrder,
    context: { t },
    defaultValues: parsedData,
  });

  const [isBuyTokenPickerOpen, setIsBuyTokenPickerOpen] =
    useState<boolean>(false);
  const [isSellTokenPickerOpen, setIsSellTokenPickerOpen] =
    useState<boolean>(false);
  const [unitBuyPrice, setUnitBuyPrice] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buyAmount = useMemo(() => {
    if (!quote) return null;

    if (!isUnitPriceUpdated) {
      return Number.parseFloat(
        formatUnits(quote?.buyAmount, getValues('buyToken.decimals'))
      ).toFixed(6);
    }

    const estimation = FixedNumber.from(1)
      .divUnsafe(FixedNumber.from(unitBuyPrice))
      .mulUnsafe(
        FixedNumber.from(
          formatUnits(quote?.sellAmount, getValues('sellToken.decimals'))
        )
      )
      .round(6);

    return estimation?.toString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitBuyPrice, quote, getValues, isUnitPriceUpdated, isTokensUpdated]);

  const onRequestQuote = async () => {
    setIsLoading(true);
    const isValid = await trigger();

    try {
      // retrieve native price before getting the quote, 
      // else if quote has an error will get it dismissed.
      await retrieveNativePrice();

      if (isValid) {
        const quote = await getQuote({
          buyToken: getValues('buyToken.address'),
          sellToken: getValues('sellToken.address'),
          sellAmount: BigNumber.from(getValues('sellAmount')).toString(),
          receiver: decodedCall?.from,
        });
        setQuote(quote);
      }
      setIsUnitPriceUpdated(false);
      setIsTokensUpdated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAction = async (values: LimitOrderValues) => {
    setIsLoading(true);
    const orderId = await createOrder(quote);
    const ERC20Contract = new utils.Interface(ERC20.abi);
    const cowApprovalCall: DecodedCall = {
      ...decodedCall,
      callType: SupportedAction.ERC20_APPROVE,
      to: values.sellToken.address,
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

    setIsLoading(false);

    if (isEdit) {
      // in case of edit mode we submit only one action that is being edited
      return parsedData?.functionSignature === ERC20_APPROVE_SIGNATURE
        ? onSubmit([cowApprovalCall])
        : onSubmit([limitOrderCall]);
    }

    return onSubmit([cowApprovalCall, limitOrderCall]);
  };

  const retrieveNativePrice = async () => {
    setIsLoading(true);
    const nativePrice = await getNativePrice(
      getValues('buyToken')?.address,
      getValues('buyToken')?.decimals
    );
    setUnitBuyPrice(nativePrice?.toString());
    setIsLoading(false);
  };

  const handleUnitPriceChange = (value: string) => {
    setUnitBuyPrice(value);
    setIsUnitPriceUpdated(true);
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
                    {isLoading ? (
                      <Loading
                        loading
                        text
                        skeletonProps={{ height: '2.6rem' }}
                      />
                    ) : (
                      <>
                        <ControlRow
                          onClick={() => setIsSellTokenPickerOpen(true)}
                        >
                          <Input
                            {...field}
                            value={field.value?.symbol}
                            placeholder={t('actionBuilder.inputs.sellToken')}
                            isInvalid={!!error?.message}
                            icon={
                              <div>
                                {field.value && (
                                  <Avatar
                                    src={resolveUri(field.value?.logoURI)}
                                    defaultSeed={field.value?.address}
                                    size={18}
                                  />
                                )}
                              </div>
                            }
                            iconRight={<FiChevronDown size={20} />}
                            readOnly
                          />
                        </ControlRow>
                        {!!error?.message && (
                          <FieldError>{error.message}</FieldError>
                        )}
                      </>
                    )}
                  </Control>

                  <TokenPicker
                    {...field}
                    walletAddress={guildId}
                    isOpen={isSellTokenPickerOpen}
                    onClose={() => setIsSellTokenPickerOpen(false)}
                    showNativeToken={false}
                    onSelect={sellToken => {
                      field.onChange(sellToken);
                      setIsSellTokenPickerOpen(false);
                      setIsUnitPriceUpdated(false);
                      setIsTokensUpdated(true);
                    }}
                  />
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
                    {isLoading ? (
                      <Loading
                        loading
                        text
                        skeletonProps={{ height: '2.6rem' }}
                      />
                    ) : (
                      <>
                        <ControlRow
                          onClick={() => setIsBuyTokenPickerOpen(true)}
                        >
                          <Input
                            {...field}
                            value={field.value?.symbol}
                            placeholder={t('actionBuilder.inputs.buyToken')}
                            isInvalid={!!error?.message}
                            icon={
                              <div>
                                {field.value && (
                                  <Avatar
                                    src={resolveUri(field.value?.logoURI)}
                                    defaultSeed={field.value?.address}
                                    size={18}
                                  />
                                )}
                              </div>
                            }
                            iconRight={<FiChevronDown size={20} />}
                            readOnly
                          />
                        </ControlRow>
                        {!!error?.message && (
                          <FieldError>{error.message}</FieldError>
                        )}
                      </>
                    )}
                  </Control>

                  <TokenPicker
                    {...field}
                    walletAddress={guildId}
                    isOpen={isBuyTokenPickerOpen}
                    onClose={() => setIsBuyTokenPickerOpen(false)}
                    showNativeToken={false}
                    onSelect={async buyToken => {
                      field.onChange(buyToken);
                      setIsBuyTokenPickerOpen(false);
                      await retrieveNativePrice();
                      setIsUnitPriceUpdated(false);
                      setIsUnitPriceUpdated(false);
                      setIsTokensUpdated(true);
                    }}
                  />
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
                  {isLoading ? (
                    <Loading
                      loading
                      text
                      skeletonProps={{ height: '2.6rem' }}
                    />
                  ) : (
                    <>
                      <ControlRow>
                        <TokenAmountInput
                          {...field}
                          decimals={getValues('sellToken.decimals')}
                          isInvalid={!!error?.message}
                          onClick={() => setIsUnitPriceUpdated(true)}
                        />
                      </ControlRow>

                      {!!error?.message && (
                        <FieldError>{error.message}</FieldError>
                      )}
                    </>
                  )}
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
              // const { unitSellPrice } = getValues();
              return (
                <>
                  <Control>
                    <UnitPriceContainer>
                      <ControlLabel>
                        {t('actionBuilder.inputs.unitBuyPrice')} in{' '}
                        {isLoading ? (
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
                      {!isLoading && (
                        <BiRefresh size={20} onClick={retrieveNativePrice} />
                      )}
                    </UnitPriceContainer>
                    {isLoading ? (
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
                            onChange={e =>
                              handleUnitPriceChange(e.target.value)
                            }
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
                {t('actionBuilder.inputs.atLeastAmount')}{' '}
                {getValues('buyToken.symbol')}
              </ControlLabel>
              {isLoading ? (
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

        <div style={{ display: 'flex' }}>
          {isLoading ? (
            <Loading
              loading
              text
              skeletonProps={{ height: '2.6rem', width: '10rem' }}
              style={{ margin: '1rem 0.5rem 0' }}
            />
          ) : (
            <Button
              m="1rem 0.5rem 0"
              fullWidth
              data-testid="submit-erc20transfer"
              type="button"
              variant="secondary"
              onClick={onRequestQuote}
            >
              {'Market Price'}
            </Button>
          )}

          {isLoading ? (
            <Loading
              loading
              text
              skeletonProps={{ height: '2.6rem', width: '10rem' }}
              style={{ margin: '1rem 0 0' }}
            />
          ) : (
            <Button
              m="1rem 0 0"
              fullWidth
              data-testid="submit-cowLimitOrder"
              type="submit"
              disabled={!quote || isUnitPriceUpdated || isTokensUpdated}
            >
              {t('actionBuilder.action.saveAction')}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CowLimitOrderEditor;

