import { useState } from 'react';
import { lighten } from 'polished';
import ReactSpeedometer from 'react-d3-speedometer';
import { FiThumbsDown, FiThumbsUp, FiInfo } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { TokenInfoWithType } from 'types/types';
import { Flex } from 'components/primitives/Layout';
import { Button } from 'components/primitives/Button';
import { Slider } from 'components/primitives/Forms/Slider';
import { Text } from 'components/primitives/Typography';

import {
  LockButton,
  ModalContainer,
  StakeIconButton,
  StakeSelectionContainer,
} from './HolographicConsensusCard.styled';
import { StakeOptions } from './HolographicConsensusCard';
import { Avatar } from 'components/Avatar';
import { resolveUri } from 'utils';

interface IHolographicConsensusModal {
  tokenInfo: TokenInfoWithType;
}

export const HolographicConsensusModal = ({
  tokenInfo,
}: IHolographicConsensusModal) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [selectedStake, setSelectedStake] = useState(null);
  const [stakePercentage, setStakePercentage] = useState('0');

  const handleSelectedStake = (option: StakeOptions) => {
    if (selectedStake === option) setSelectedStake(null);
    else setSelectedStake(option);
  };

  return (
    <ModalContainer>
      <Flex>
        <ReactSpeedometer
          value={7735}
          minValue={0}
          maxValue={10000}
          width={170}
          height={170}
          maxSegmentLabels={0}
          segmentColors={[
            theme.colors.votes[0],
            lighten(0.1, theme.colors.votes[0]),
            theme.colors.white,
            lighten(0.1, theme.colors.votes[2]),
            theme.colors.yellow,
          ]}
          ringWidth={12}
          needleHeightRatio={0.55}
          currentValueText=" "
          needleColor={theme.colors.white}
        />
        <Flex margin="-77px 0px 20px 0px">
          <Text sizeVariant="small">Pending Boost</Text>
        </Flex>
      </Flex>

      <StakeSelectionContainer>
        <Flex
          direction="row"
          gap="24px"
          fullWidth
          justifyContent="space-between"
        >
          <StakeIconButton
            variant="against"
            onClick={() => handleSelectedStake('against')}
            active={selectedStake === 'against'}
          >
            <FiThumbsDown
              size="17px"
              color={
                selectedStake === 'against'
                  ? theme.colors.bg1
                  : theme.colors.votes[0]
              }
            />
          </StakeIconButton>
          <StakeIconButton
            variant="for"
            onClick={() => handleSelectedStake('for')}
            active={selectedStake === 'for'}
          >
            <FiThumbsUp
              size="17px"
              color={
                selectedStake === 'for' ? theme.colors.bg1 : theme.colors.yellow
              }
            />
          </StakeIconButton>
        </Flex>
        <Flex direction="row" justifyContent="space-between" margin="10px 0px">
          <Text colorVariant="muted">{t('members.locking.balance')}: </Text>
          <Flex direction="row" gap="4px">
            <Text bold>10.00</Text>
            <Avatar
              src={resolveUri(tokenInfo?.logoURI)}
              defaultSeed={tokenInfo?.address}
              size={20}
            />
            <Text colorVariant="muted">{tokenInfo?.symbol}</Text>
          </Flex>
        </Flex>
        <Slider
          value={stakePercentage}
          onChange={setStakePercentage}
          min={'0'}
          max={'100'}
        />
        <Flex direction="row" justifyContent="space-between">
          {((parseInt(stakePercentage) / 100) * 18).toFixed(2)}
          <Button>{t('members.locking.max')}</Button>
        </Flex>
      </StakeSelectionContainer>

      <Flex fullWidth>
        <Flex direction="row" justifyContent="space-between" fullWidth>
          <Text colorVariant="muted">
            {t('holographicConsensus.potentialReward')}
          </Text>
          <Flex direction="row" gap="4px">
            <Text bold>1</Text>
            <Avatar
              src={resolveUri(tokenInfo?.logoURI)}
              defaultSeed={tokenInfo?.address}
              size={20}
            />
            <Text colorVariant="muted">{tokenInfo?.symbol}</Text>
          </Flex>
        </Flex>
        <Flex
          direction="row"
          justifyContent="space-between"
          margin="12px 0px"
          fullWidth
        >
          <Text colorVariant="muted">{t('members.locking.unlockTime')}</Text>
          <Text bold>March 13th</Text>
        </Flex>
        <Flex direction="row" fullWidth justifyContent="flex-start" gap="10px">
          <div>
            <FiInfo color={theme.colors.active} size="20px" />
          </div>
          <Text colorVariant="accentuated" textAlign="left">
            {t('holographicConsensus.lockWarning')}.
          </Text>
        </Flex>
        <Flex margin="32px 0px 0px 0px" fullWidth>
          <LockButton
            disabled={selectedStake === null || stakePercentage === '0'}
          >
            {t('members.locking.lock')} {tokenInfo?.symbol}
          </LockButton>
        </Flex>
      </Flex>
    </ModalContainer>
  );
};

// For now, progress styling only works on Firefox
