import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ActionEditorProps } from 'components/ActionsBuilder/SupportedActions';
import { Button } from 'components/primitives/Button';
import { AddressInput } from 'components/primitives/Forms/AddressInput';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';
import { TokenAmountInput } from 'components/primitives/Forms/TokenAmountInput';
import { TextArea } from 'components/primitives/Forms/TextArea';

import validateRawTransaction from './validateRawTransaction';
import { RawTransactionValues } from './types';

const RawTransactionEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const parsedData = useMemo(() => {
    return {
      to: decodedCall?.to,
      value: decodedCall?.value,
      data: decodedCall?.optionalProps?.data,
    };
  }, [decodedCall]);

  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    resolver: validateRawTransaction,
    context: { t },
    defaultValues: {
      to: parsedData?.to,
      value: parsedData?.value,
      data: parsedData?.data,
    },
  });

  const submitAction = (values: RawTransactionValues) => {
    onSubmit([
      {
        ...decodedCall,
        to: values.to,
        value: values.value ?? BigNumber.from(0),
        optionalProps: {
          data: values.data || '0x00',
        },
      },
    ]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        <Controller
          name="to"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { error } = fieldState;

            return (
              <Control>
                <ControlLabel>
                  {t('actionBuilder.inputs.toAddress')}
                </ControlLabel>
                <ControlRow>
                  <AddressInput
                    {...field}
                    data-testid="input-to"
                    isInvalid={!!error}
                    placeholder={t('actionBuilder.inputs.ethereumAddress')}
                  />
                </ControlRow>
                {!!error && (
                  <ErrorLabel data-testid="error-to" margin="0.5rem 0">
                    {error.toString()}
                  </ErrorLabel>
                )}
              </Control>
            );
          }}
        />

        <Controller
          name="value"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { error } = fieldState;

            return (
              <Control>
                <ControlLabel>{t('actionBuilder.inputs.inWei')}</ControlLabel>
                <ControlRow>
                  <TokenAmountInput
                    {...field}
                    data-testid="input-value"
                    decimals={0}
                    isInvalid={!!error}
                  />
                </ControlRow>

                {!!error && (
                  <ErrorLabel data-testid="error-value" margin="0.5rem 0">
                    {error.toString()}
                  </ErrorLabel>
                )}
              </Control>
            );
          }}
        />

        <Controller
          name="data"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { error } = fieldState;

            return (
              <Control>
                <ControlLabel>{`${t(
                  'actionBuilder.advanced.data'
                )} (hex)`}</ControlLabel>
                <ControlRow>
                  <TextArea
                    {...field}
                    data-testid="input-data"
                    spellCheck={false}
                    isInvalid={!!error}
                    placeholder={t('actionBuilder.advanced.data')}
                  />
                </ControlRow>
                {!!error && (
                  <ErrorLabel data-testid="error-data" margin="0.5rem 0">
                    {error.toString()}
                  </ErrorLabel>
                )}
              </Control>
            );
          }}
        />

        <Button
          m="1rem 0 0"
          fullWidth
          data-testid="submit-rawtransaction"
          type="submit"
        >
          {t('actionBuilder.action.saveAction')}
        </Button>
      </form>
    </div>
  );
};

export default RawTransactionEditor;
