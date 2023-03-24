import { useState } from 'react';
import { lighten } from 'polished';
import ReactSpeedometer from 'react-d3-speedometer';
import { FiThumbsDown, FiThumbsUp, FiInfo } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BigNumber } from 'ethers';

import { resolveUri } from 'utils';
import { Flex } from 'components/primitives/Layout';
import { Button } from 'components/primitives/Button';
import { Slider } from 'components/primitives/Forms/Slider';
import { Text } from 'components/primitives/Typography';
import { Avatar } from 'components/Avatar';
import { bigNumberToNumber } from 'hooks/Guilds/conversions/useBigNumberToNumber';

import {
  LockButton,
  ModalContainer,
  StakeIconButton,
  StakeSelectionContainer,
} from './HolographicConsensusCard.styled';
import { IHolographicConsensusModal, StakeOptions } from './types';
import {
  calculateBNPercentage,
  calculatePotentialReward,
  checkUserStakeOption,
} from './utils';

export const HolographicConsensusModal = ({
  tokenInfo,
  userStakeTokenBalance,
  speedometerValue,
  stakeOnProposal,
  proposalId,
  stakeDetails,
  userAddress,
  proposalState,
  proposalTotalStakes,
  daoBounty,
}: IHolographicConsensusModal) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const previousStake = checkUserStakeOption(userAddress, stakeDetails);

  // ? derive staked and selectedOption?

  const [staked, setStaked] = useState(BigNumber.from(0));
  const [stakePercentage, setStakePercentage] = useState('0');

  const handleStakeChange = (value: string) => {
    const stakedResult = calculateBNPercentage(userStakeTokenBalance, value);
    setStakePercentage(value);
    setStaked(stakedResult);
  };

  const [selectedOption, setSelectedOption] = useState<BigNumber>(
    previousStake === 'for'
      ? BigNumber.from(2)
      : previousStake === 'against'
      ? BigNumber.from(1)
      : null
  );
  const [selectedStake, setSelectedStake] =
    useState<StakeOptions>(previousStake);

  const handleSelectOption = (option: StakeOptions) => {
    const parsedOption =
      option === 'for' ? BigNumber.from(2) : BigNumber.from(1);

    if (selectedStake === option) {
      setSelectedOption(null);
      setSelectedStake(null);
    } else {
      setSelectedOption(parsedOption);
      setSelectedStake(option);
    }
  };

  const userStakeTokenBalanceNumber = bigNumberToNumber(
    userStakeTokenBalance,
    tokenInfo?.decimals
  );
  const stakedNumber = bigNumberToNumber(staked, tokenInfo?.decimals);

  const potentialReward = calculatePotentialReward(
    stakeDetails,
    staked,
    userAddress,
    selectedOption,
    proposalTotalStakes,
    daoBounty
  );
  const potentialRewardNumber = bigNumberToNumber(
    potentialReward,
    tokenInfo?.decimals
  );

  return (
    <ModalContainer>
      <Flex>
        <ReactSpeedometer
          value={speedometerValue}
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
          <Text sizeVariant="small">{proposalState}</Text>
        </Flex>
      </Flex>

      <StakeSelectionContainer>
        <Flex
          direction="row"
          margin="0 0 20px 0"
          gap="24px"
          fullWidth
          justifyContent="space-between"
        >
          <StakeIconButton
            variant="against"
            onClick={() => handleSelectOption('against')}
            active={selectedStake === 'against'}
            disabled={previousStake !== null}
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
            onClick={() => handleSelectOption('for')}
            active={selectedStake === 'for'}
            disabled={previousStake !== null}
          >
            <FiThumbsUp
              size="17px"
              color={
                selectedStake === 'for' ? theme.colors.bg1 : theme.colors.yellow
              }
            />
          </StakeIconButton>
        </Flex>
        {previousStake && (
          <Text colorVariant="muted" sizeVariant="small">
            {t('holographicConsensus.youCannotChangeYourPrediction')}
          </Text>
        )}
        <Flex direction="row" justifyContent="space-between" margin="10px 0px">
          <Text colorVariant="muted">{t('members.locking.balance')}: </Text>
          <Flex direction="row" gap="4px">
            <Text bold>{userStakeTokenBalanceNumber}</Text>
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
          onChange={handleStakeChange}
          min={'0'}
          max={'100'}
        />
        <Flex direction="row" justifyContent="space-between">
          <Text sizeVariant="big" bold>
            {stakedNumber}
          </Text>
          <Button onClick={() => handleStakeChange('100')}>
            {t('members.locking.max')}
          </Button>
        </Flex>
      </StakeSelectionContainer>

      <Flex fullWidth>
        <Flex direction="row" justifyContent="space-between" fullWidth>
          <Text colorVariant="muted">
            {t('holographicConsensus.potentialReward')}
          </Text>
          <Flex direction="row" gap="4px">
            <Text bold>{potentialRewardNumber}</Text>
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
          {/*
            //! Unlock time is hardcoded untill we implement useTimeDetail hook
            */}
          <Text bold>March 14, 2023, 3:54pm UTC</Text>
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
            onClick={() => {
              stakeOnProposal(proposalId, selectedOption, staked);
            }}
            disabled={selectedStake === null || stakePercentage === '0'}
          >
            {t('members.locking.lock')} {tokenInfo?.symbol}
          </LockButton>
        </Flex>
      </Flex>
    </ModalContainer>
  );
};
