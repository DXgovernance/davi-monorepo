import { Button } from 'components/primitives/Button';
import { SidebarCardContentWrapper } from 'components/SidebarCard/SidebarCard.styled';
import styled, { css } from 'styled-components';
import { StakeOptions } from './HolographicConsensusCard';

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
  background-color: transparent;
  width: 100%;
  border: 1px solid
    ${({ variant, theme }) =>
      variant === 'for' ? theme.colors.yellow : theme.colors.votes[0]};

  ${({ active, variant, theme }) =>
    active &&
    css`
      ${variant === 'for'
        ? `background-color: ${theme.colors.yellow};`
        : `background-color: ${theme.colors.votes[0]};`};
    `};
`;

export const StakeDetailsContainer = styled(SidebarCardContentWrapper)`
  width: 100%;
  margin-top: 24px;
`;

export const StakesAmount = styled.div`
  display: inline;
  border-radius: 8px;
  padding: 2px 6px;
  margin-right: 12px;
  color: ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.darkGreen1};
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

export const StakeSelectionContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 32px 0px;
  padding: 16px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: ${({ theme }) => theme.radii.curved};
`;

export const LockButton = styled(Button)`
  height: 2.5rem;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.bg4};
  :hover {
    background-color: ${({ theme }) => theme.colors.darkGreen1};
    border: 1px solid ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.yellow};
    opacity: 1;
  }
`;
