import { Button } from 'components/primitives/Button';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useMemo, useState } from 'react';
import { ActionEditorProps } from '..';
import { ReactComponent as Info } from 'assets/images/info.svg';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useTotalSupply } from 'Modules/Guilds/Hooks/useTotalSupply';
import { useTokenData } from 'Modules/Guilds/Hooks/useTokenData';
import { Tooltip } from 'components/Tooltip';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import validateRepMint from './validateRepMint';
import {
  Control,
  ControlRow,
  ControlLabel,
} from 'components/primitives/Forms/Control';
import { Error, RepBurnInput } from './styles';
import { StyledIcon } from 'components/primitives/StyledIcon';
import { AddressInput } from 'components/primitives/Forms/AddressInput';
import { useHookStoreProvider } from 'stores';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { Picker } from 'components/primitives/Forms/Picker';
import AddressButton from 'components/AddressButton/AddressButton';
import { shortenAddress } from 'utils';
import { getBigNumberPercentage } from 'utils/bnPercentage';
import { TransparentButton } from 'components/SwaprPicker/SwaprPicker.styled';
import { Loading } from 'components/primitives/Loading';

interface RepBurnFormValues {
  repPercent: string;
  recipient: string;
}
export const Burn: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repAmount, setRepAmount] = useState<string>('0');
  const [account, setAccount] = useState<`0x${string}`>(null);
  const { data } = useTotalSupply({ decodedCall });
  const { tokenData } = useTokenData();
  const { guildId: daoAddress } = useTypedParams();

  const {
    hooks: {
      fetchers: { useVotingPowerOf, useGetMemberList },
    },
  } = useHookStoreProvider();
  const { data: currentVotingPower } = useVotingPowerOf({
    contractAddress: daoAddress,
    userAddress: account,
  });
  const currentVotingPowerNumber = useBigNumberToNumber(currentVotingPower, 18);

  const { data: memberList, isLoading: isMemberListLoading } =
    useGetMemberList(daoAddress);

  const totalSupply = useBigNumberToNumber(tokenData?.totalSupply, 18);

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    return {
      recipient: decodedCall.args.to,
    };
  }, [decodedCall]);

  const { control, handleSubmit, setValue } = useForm<RepBurnFormValues>({
    resolver: validateRepMint,
    context: { t },
    defaultValues: parsedData,
  });

  useEffect(() => {
    if (data?.amount) {
      const initialRepAmount = ethers.utils.formatEther(data?.amount);
      setRepAmount(initialRepAmount);
      setValue(
        'repPercent',
        String((Number(initialRepAmount) * 100) / totalSupply || 0)
      );
    }
  }, [data?.amount]); //eslint-disable-line

  const updateRepAmount = (value: string) => {
    if (!value || !account) {
      setRepAmount('0');
    } else {
      const amount = String(
        (Number(value) / 100) * Number(currentVotingPowerNumber)
      );
      setRepAmount(amount);
    }
  };

  const submitAction = (values: RepBurnFormValues) => {
    onSubmit([
      {
        ...decodedCall,
        args: {
          ...decodedCall.args,
          account: values.recipient,
          amount: ethers.utils.parseUnits(repAmount.toString()),
        },
      },
    ]);
  };

  const memberPickerData = useMemo(() => {
    // Create picker object of members
    if (memberList !== undefined) {
      return memberList?.map(member => {
        console.log({ member });
        console.log({ totalSupply });
        return {
          ...member,
          title: shortenAddress(member?.address),
          address: member?.address,
          subtitle: shortenAddress(member?.address),
          rightData: `${getBigNumberPercentage(
            member?.tokensLocked,
            tokenData?.totalSupply
          )}%`,
        };
      });
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberList]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        <Controller
          name="recipient"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { error } = fieldState;

            return (
              <Control>
                <ControlLabel>
                  {t('actionBuilder.repMint.recipient')}
                  <Tooltip
                    text={t('actionBuilder.repMint.recipientTooltip')}
                    placement="bottom"
                  >
                    <StyledIcon src={Info} />
                  </Tooltip>
                </ControlLabel>

                <ControlRow>
                  {isMemberListLoading ? (
                    <TransparentButton
                      variant="secondary"
                      aria-label="Skeleton loading button"
                      type="button"
                    >
                      <Loading loading text />
                    </TransparentButton>
                  ) : memberList?.length > 0 ? (
                    <>
                      <Picker
                        data={memberPickerData}
                        header={t('actionBuilder.repMint.burnRep')}
                        isOpen={isModalOpen}
                        onSelect={value => {
                          field.onChange(value.address);
                          setAccount(value.address as `0x${string}`);
                          setIsModalOpen(false);
                        }}
                        onClose={() => setIsModalOpen(false)}
                      />
                      {!account ? (
                        <TransparentButton
                          variant="secondary"
                          onClick={() => setIsModalOpen(true)}
                          aria-label="Burn address picker"
                          type="button"
                          placeholder="Choose user"
                        />
                      ) : (
                        <AddressButton
                          address={account}
                          onClick={() => setIsModalOpen(true)}
                          aria-label="burn user picker"
                          type="button"
                        />
                      )}
                    </>
                  ) : (
                    <AddressInput
                      {...field}
                      onChange={value => {
                        field.onChange(value);
                        if (value.startsWith('0x'))
                          setAccount(value as `0x${string}`);
                      }}
                      isInvalid={!!error}
                      name="recipient-address"
                      aria-label="recipient address input"
                      placeholder={t('actionBuilder.inputs.ethereumAddress')}
                    />
                  )}
                </ControlRow>
                {!!error && <Error>{error.message}</Error>}
              </Control>
            );
          }}
        />

        <ControlRow>
          <Controller
            name="repPercent"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { invalid, error } = fieldState;

              return (
                <Control>
                  <ControlLabel>
                    {t('actionBuilder.repMint.repPercent')}
                    <Tooltip
                      text={t('actionBuilder.repMint.repPercentTooltip')}
                    >
                      <StyledIcon src={Info} />
                    </Tooltip>
                  </ControlLabel>
                  <ControlRow>
                    <RepBurnInput
                      {...field}
                      onChange={value => {
                        field.onChange(value);
                        updateRepAmount(value);
                      }}
                      isInvalid={!!error}
                    />
                  </ControlRow>
                  {invalid && !!error && <Error>{error.message}</Error>}
                </Control>
              );
            }}
          />
        </ControlRow>
        <ControlRow>
          <Control>
            <ControlLabel>
              {t('actionBuilder.repMint.repAmount')}
              <Tooltip text={t('actionBuilder.repMint.repAmountTooltip')}>
                <StyledIcon src={Info} />
              </Tooltip>
            </ControlLabel>
            <ControlRow>
              <RepBurnInput disabled value={repAmount?.toString()} readOnly />
            </ControlRow>
          </Control>
        </ControlRow>
        <Button m="1rem 0 0" fullWidth type="submit">
          {t('actionBuilder.action.saveAction')}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Burn;
