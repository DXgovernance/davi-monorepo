import { useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { useTheme } from 'styled-components';
import { lighten } from 'polished';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import { CardDivider } from 'components/Card';
import { Flex } from 'components/primitives/Layout';
import { Modal } from 'components/primitives/Modal';
import { ExpandButton } from 'components/ExpandButton';
import { HolographicConsensusModal } from './HolographicConsensusModal';
import {
  StakeButtonsContainer,
  StakeIconButton,
  StakeNumberButton,
  StakesAmount,
} from './HolographicConsensusCard.styled';
import { StakeDetails } from './StakeDetails';
import { Text } from 'components/primitives/Typography';

export interface IStake {
  address: string;
  amount: string;
}

export interface IStakes {
  for: IStake[];
  against: IStake[];
}

const fakeStakes: IStakes = {
  for: [
    {
      address: '0x9578e973bba0cc33bdbc93c7f77bb3fe6d47d68a',
      amount: '121',
    },
    {
      address: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
      amount: '34',
    },
    {
      address: '0xaf8eb8c3a5d9d900aa0b98e3df0bcc17d3c5f698',
      amount: '4',
    },
    {
      address: '0xd507743abcdb265f5fcef125e3f6cf7250cfe9da',
      amount: '21',
    },
    {
      address: '0xaf8eb8c3a5d9d900aa0b98e3df0bcc17d3c5f698',
      amount: '4',
    },
    {
      address: '0xd507743abcdb265f5fcef125e3f6cf7250cfe9da',
      amount: '21',
    },
    {
      address: '0xaf8eb8c3a5d9d900aa0b98e3df0bcc17d3c5f698',
      amount: '4',
    },
    {
      address: '0xd507743abcdb265f5fcef125e3f6cf7250cfe9da',
      amount: '21',
    },
    {
      address: '0xaf8eb8c3a5d9d900aa0b98e3df0bcc17d3c5f698',
      amount: '4',
    },
    {
      address: '0xd507743abcdb265f5fcef125e3f6cf7250cfe9da',
      amount: '21',
    },
  ],
  against: [
    {
      address: '0x84eeb305da0a4309a696d43de9f79f04e66eb4f8',
      amount: '100',
    },
    {
      address: '0x1b929bdde0fb3b7b759696f23d6cac0963d326e6',
      amount: '12.46',
    },
  ],
};

export type StakeOptions = 'for' | 'against';

export const HolographicConsensusCard = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStakeDetailsOpen, setIsStakeDetailsOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState<StakeOptions>('for');

  return (
    <SidebarCard
      header={
        <SidebarCardHeaderSpaced>
          Predictions
          <ExpandButton
            expanded={isStakeDetailsOpen}
            onClick={() => setIsStakeDetailsOpen(!isStakeDetailsOpen)}
          />
        </SidebarCardHeaderSpaced>
      }
    >
      <SidebarCardContent>
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
          <Flex margin="-77px 0px 24px 0px">
            <Text sizeVariant="small">Pending Boost</Text>
          </Flex>
          <CardDivider />
          <StakeButtonsContainer>
            <StakeNumberButton
              variant="against"
              active={isStakeDetailsOpen && selectedStake === 'against'}
              onClick={() => {
                setSelectedStake('against');
                if (isStakeDetailsOpen === false) setIsStakeDetailsOpen(true);
              }}
            >
              {isStakeDetailsOpen && (
                <StakesAmount>{fakeStakes?.against?.length}</StakesAmount>
              )}
              272.36
            </StakeNumberButton>

            <StakeNumberButton
              variant="for"
              active={isStakeDetailsOpen && selectedStake === 'for'}
              onClick={() => {
                setSelectedStake('for');
                if (isStakeDetailsOpen === false) setIsStakeDetailsOpen(true);
              }}
            >
              {isStakeDetailsOpen && (
                <StakesAmount>{fakeStakes?.for?.length}</StakesAmount>
              )}
              314.15
            </StakeNumberButton>
          </StakeButtonsContainer>
          {isStakeDetailsOpen === true && (
            <>
              <CardDivider />
              <StakeDetails
                selectedStake={selectedStake}
                stakeDetails={fakeStakes}
              />
            </>
          )}
          <CardDivider />

          <Flex margin="24px 0px">
            <Text sizeVariant="big" bold>
              Place your prediction to steer the proposal
            </Text>
          </Flex>

          <Flex direction="row" gap="24px">
            <StakeIconButton
              variant="against"
              onClick={() => setIsModalOpen(true)}
            >
              <FiThumbsDown size="17px" color={theme.colors.votes[0]} />
            </StakeIconButton>
            <StakeIconButton variant="for" onClick={() => setIsModalOpen(true)}>
              <FiThumbsUp size="17px" color={theme.colors.yellow} />
            </StakeIconButton>
          </Flex>
        </Flex>
      </SidebarCardContent>
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        maxWidth={380}
        header="Confirm prediction"
      >
        <HolographicConsensusModal />
      </Modal>
    </SidebarCard>
  );
};

// TODO: Add translations
// TODO: token icon
// TODO: add color to proposal state pill
// TODO: Logic!
// ? border bottom of non-selected stake button?

// maxValue of the speedometer is 10_000, so it's akin a 100% plus two decimal places. A value like 77,35% would be 7735
