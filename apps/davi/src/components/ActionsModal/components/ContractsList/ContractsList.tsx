import { useTranslation } from 'react-i18next';
import { ReactComponent as Mint } from 'assets/images/mint.svg';
import { ReactComponent as Vector } from 'assets/images/vector.svg';
import ENSIcon from 'assets/images/ens.svg';
import { SupportedAction } from 'components/ActionsBuilder/types';
import { StyledIcon } from 'components/primitives/StyledIcon';
import { AiFillSetting } from 'react-icons/ai';
import {
  ActionsButton,
  ButtonDetail,
  ButtonLabel,
  SectionTitle,
  SectionWrapper,
  Wrapper,
} from 'components/ActionsModal/ActionsModal.styled';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import useGuildImplementationTypeConfig from 'Modules/Guilds/Hooks/useGuildImplementationType';
import React, { useState } from 'react';
import {
  RichContractData,
  useRichContractRegistry,
} from 'hooks/Guilds/contracts/useRichContractRegistry';
import { useNetwork } from 'wagmi';
import { isAvailableOnENS } from 'hooks/Guilds/ens/utils';
import { ExpandButton } from 'components/ExpandButton';

interface ContractsListProps {
  onSelect: (contract: RichContractData) => void;
  onSupportedActionSelect: (actionType: SupportedAction) => void;
}

const ContractsList: React.FC<ContractsListProps> = ({
  onSelect,
  onSupportedActionSelect,
}) => {
  const { t } = useTranslation();
  const { chain } = useNetwork();
  const { contracts } = useRichContractRegistry(chain?.id);
  const { guildId: guildAddress } = useTypedParams();
  const { isRepGuild } = useGuildImplementationTypeConfig(guildAddress);

  const [isAdvancedOptionsExpanded, setIsAdvancedOptionsExpanded] =
    useState(false);

  return (
    <Wrapper data-testid="actions-modal-contract-list">
      <SectionWrapper>
        <SectionTitle>{t('core')}</SectionTitle>
        <ActionsButton
          data-testid="supported-action-erc20transfer"
          onClick={() =>
            onSupportedActionSelect(SupportedAction.ERC20_TRANSFER)
          }
        >
          <ButtonLabel>
            <StyledIcon src={Vector} />
            {t('transfer')}
          </ButtonLabel>
        </ActionsButton>
        <ActionsButton
          onClick={() => {
            onSupportedActionSelect(SupportedAction.SET_PERMISSIONS);
          }}
        >
          <ButtonLabel>
            <StyledIcon src={Vector} />
            {t('permissions.setPermissions')}
          </ButtonLabel>
        </ActionsButton>
        {!!isRepGuild ? (
          <ActionsButton
            onClick={() => onSupportedActionSelect(SupportedAction.REP_MINT)}
          >
            <ButtonLabel>
              <StyledIcon src={Mint} />
              {t('mintRep')}
            </ButtonLabel>
          </ActionsButton>
        ) : null}
        {isAvailableOnENS(chain.id) ? (
          <ActionsButton
            onClick={() =>
              onSupportedActionSelect(SupportedAction.ENS_UPDATE_CONTENT)
            }
          >
            <ButtonLabel>
              <StyledIcon src={ENSIcon} />
              {t('ens.updateContentCoreAction')}
            </ButtonLabel>
          </ActionsButton>
        ) : null}
        <ActionsButton
          onClick={() =>
            onSupportedActionSelect(SupportedAction.SET_GUILD_CONFIG)
          }
        >
          <ButtonLabel>
            <StyledIcon src={() => <AiFillSetting size={20} />} />
            {t('setGuildConfig')}
          </ButtonLabel>
        </ActionsButton>
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>{t('externalContracts')}</SectionTitle>
        {contracts?.map(contract => (
          <ActionsButton
            key={contract.title}
            onClick={() => onSelect(contract)}
          >
            <ButtonLabel>{contract.title}</ButtonLabel>
            <ButtonDetail>
              {contract.functions?.length}{' '}
              {t('actions', {
                count: contract.functions.length,
              })}
            </ButtonDetail>
          </ActionsButton>
        ))}
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle
          direction="row"
          justifyContent="space-between"
          onClick={() =>
            setIsAdvancedOptionsExpanded(!isAdvancedOptionsExpanded)
          }
        >
          {t('advancedOptions')}
          <ExpandButton expanded={isAdvancedOptionsExpanded} />
        </SectionTitle>
        {isAdvancedOptionsExpanded && (
          <ActionsButton
            onClick={() =>
              onSupportedActionSelect(SupportedAction.RAW_TRANSACTION)
            }
          >
            {t('rawTransaction')}
          </ActionsButton>
        )}
      </SectionWrapper>
    </Wrapper>
  );
};

export default ContractsList;
