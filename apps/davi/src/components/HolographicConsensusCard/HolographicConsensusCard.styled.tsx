import { SidebarCardContentWrapper } from 'components/SidebarCard/SidebarCard.styled';
import styled, { css } from 'styled-components';
import { StakeOptions } from './HolographicConsensusCard';

export const BoostedStatePill = styled.div`
  margin-top: -77px;
  margin-bottom: 20px;
  border-radius: ${({ theme }) => theme.radii.curved};
  font-size: 12px;
`;

export const StakeButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0;
  width: calc(100% + 32px);
`;

export const StakeNumberButton = styled.button<{
  variant: StakeOptions;
  active?: boolean;
}>`
  cursor: pointer;
  width: 50%;
  height: 48px;
  margin: 0;
  border: none;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.bg1};
  color: ${({ variant, theme }) =>
    variant === 'for' ? theme.colors.yellow : theme.colors.votes[0]};

  ${({ active, theme }) =>
    active &&
    css`
      background-color: ${theme.colors.darkGreen2};
    `}
`;

export const StakeIconButton = styled.button<{
  variant: StakeOptions;
  active?: boolean;
}>`
  cursor: pointer;
  padding: 11px 43px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.bg1};
  border: 1px solid
    ${({ variant, theme }) =>
      variant === 'for' ? theme.colors.yellow : theme.colors.votes[0]};

  ${({ active, variant, theme }) =>
    active &&
    css`
      ${variant === 'for'
        ? `background-color: ${theme.colors.yellow};`
        : `background-color: ${theme.colors.votes[0]};`}
    `};
`;

export const StakeDetailsContainer = styled(SidebarCardContentWrapper)`
  width: 100%;
  margin-top: 24px;
`;

export const PredictionMessageSpan = styled.span`
  margin: 24px 0px;
  font-size: ${({ theme }) => theme.fontSizes.header1};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
`;

export const MutedText = styled.span`
  color: ${({ theme }) => theme.colors.grey};
`;

export const StakesAmount = styled.div`
  display: inline;
  border-radius: 8px;
  padding: 2px 6px;
  margin-right: 12px;
  color: ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.darkGreen1};
`;
