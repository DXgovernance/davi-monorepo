import { useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { useTheme } from 'styled-components';
import { lighten } from 'polished';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { useAccount, useNetwork } from 'wagmi';
import { useTranslation } from 'react-i18next';

import { useHookStoreProvider } from 'stores';
import { resolveUri } from 'utils';
import { TokenInfoWithType } from 'types/types';
import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import { Avatar } from 'components/Avatar';
import { CardDivider } from 'components/Card';
import { ExpandButton } from 'components/ExpandButton';
import { Flex } from 'components/primitives/Layout';
import { Result, ResultState } from 'components/Result';
import { Loading } from 'components/primitives/Loading';
import { Modal } from 'components/primitives/Modal';
import { Text } from 'components/primitives/Typography';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { useERC20Balance } from 'hooks/Guilds/erc20/useERC20Balance';

import { HolographicConsensusModal } from './HolographicConsensusModal';
import {
  StakeButtonsContainer,
  StakeIconButton,
  StakeNumberButton,
  StakesAmount,
} from './HolographicConsensusCard.styled';
import { StakeDetails } from './StakeDetails';

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

interface IHolographicConsensusCard {
  schemeId: string;
}

export const HolographicConsensusCard = ({
  schemeId,
}: IHolographicConsensusCard) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    hooks: {
      fetchers: { useGetSubDAOs },
    },
  } = useHookStoreProvider();
  const { guildId: daoId } = useTypedParams();
  const { chain } = useNetwork();

  const {
    data: schemeData,
    isLoading,
    isError,
    errorMessage,
  } = useGetSubDAOs(daoId, schemeId);
  const { tokens } = useTokenList(chain?.id);

  let stakeTokenAddress: string = null;
  let stakeTokenInfo: TokenInfoWithType = null;

  try {
    stakeTokenAddress = schemeData[0]?.votingMachine?.stakingTokenAddress;
    stakeTokenInfo = tokens.find(token => {
      return token?.address?.toLowerCase() === stakeTokenAddress?.toLowerCase();
    });
  } catch {}

  const { address: userAddress } = useAccount();
  const { data: userStakeTokenBalance } = useERC20Balance(
    stakeTokenAddress,
    userAddress
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStakeDetailsOpen, setIsStakeDetailsOpen] = useState(false);
  const [showStakeOption, setShowStakeOption] = useState<StakeOptions>('for');

  if (isLoading) {
    return (
      <SidebarCard>
        <Loading text loading style={{ margin: '24px' }} />
      </SidebarCard>
    );
  }

  if (isError) {
    return (
      <SidebarCard>
        <Result
          state={ResultState.ERROR}
          title="error getting stake data"
          subtitle={errorMessage}
        />
      </SidebarCard>
    );
  }

  if (!stakeTokenAddress) return <></>;

  return (
    <SidebarCard
      header={
        <SidebarCardHeaderSpaced>
          {t('holographicConsensus.predictions')}
          <ExpandButton
            expanded={isStakeDetailsOpen === true}
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
              active={
                isStakeDetailsOpen === true && showStakeOption === 'against'
              }
              onClick={() => {
                setShowStakeOption('against');
                if (isStakeDetailsOpen === false) setIsStakeDetailsOpen(true);
              }}
            >
              <Flex direction="row" alignItems="center" gap="4px">
                {isStakeDetailsOpen === true && (
                  <StakesAmount>{fakeStakes?.against?.length}</StakesAmount>
                )}
                <Avatar
                  src={resolveUri(stakeTokenInfo?.logoURI)}
                  defaultSeed={stakeTokenAddress}
                  size={20}
                />
                272.36
              </Flex>
            </StakeNumberButton>

            <StakeNumberButton
              variant="for"
              active={isStakeDetailsOpen === true && showStakeOption === 'for'}
              onClick={() => {
                setShowStakeOption('for');
                if (isStakeDetailsOpen === false) setIsStakeDetailsOpen(true);
              }}
            >
              <Flex direction="row" alignItems="center" gap="4px">
                {isStakeDetailsOpen === true && (
                  <StakesAmount>{fakeStakes?.for?.length}</StakesAmount>
                )}
                <Avatar
                  src={resolveUri(stakeTokenInfo?.logoURI)}
                  defaultSeed={stakeTokenAddress}
                  size={20}
                />
                314.15
              </Flex>
            </StakeNumberButton>
          </StakeButtonsContainer>
          {isStakeDetailsOpen === true && (
            <>
              <CardDivider />
              <StakeDetails
                selectedStake={showStakeOption}
                stakeDetails={fakeStakes}
                tokenSymbol={stakeTokenInfo?.symbol}
              />
            </>
          )}

          {userStakeTokenBalance?.isZero() === false && (
            <>
              <CardDivider />
              <Flex margin="24px 0px">
                <Text sizeVariant="big" bold>
                  {t('holographicConsensus.placeYourPrediction')}
                </Text>
              </Flex>

              <Flex direction="row" gap="24px">
                <StakeIconButton
                  variant="against"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FiThumbsDown size="17px" color={theme.colors.votes[0]} />
                </StakeIconButton>
                <StakeIconButton
                  variant="for"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FiThumbsUp size="17px" color={theme.colors.yellow} />
                </StakeIconButton>
              </Flex>
            </>
          )}
        </Flex>
      </SidebarCardContent>
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        maxWidth={380}
        header={t('holographicConsensus.confirmPrediction')}
      >
        <HolographicConsensusModal
          tokenInfo={stakeTokenInfo}
          userStakeTokenBalance={userStakeTokenBalance}
        />
      </Modal>
    </SidebarCard>
  );
};

// TODO: maybe add stakes in the current dev scripts?
// TODO: add DAO staking token entity to subgraph
// TODO: fetch user's token locked
// TODO: fetch current stakes in proposal
// TODO: lock logic
// TODO: make generic big button (like LOCK button) and change disabled&hover styles
// TODO: add color to proposal state pill
// TODO: fetch proposal state
// TODO: translations
// TODO: stake: show ENS or address
// TODO: if a user staked, it can only increase its stake on the previous option
// TODO: calculate speedometer value
// TODO: decimals in token balance and total staked
// ? border bottom of non-selected stake button?

// maxValue of the speedometer is 10_000, so it's akin a 100% plus two decimal places. A value like 77,35% would be 7735
