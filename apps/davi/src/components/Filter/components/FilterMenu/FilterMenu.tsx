import { useState, useRef } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';
import { FiChevronDown, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { ProposalState } from 'types/types.guilds.d';
import { SupportedAction } from 'components/ActionsBuilder/types';
import { useFilter } from 'contexts/Guilds/filters';
import { useDetectBlur } from 'hooks/Guilds/useDetectBlur';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';

import {
  DropdownContent,
  DropdownHeader,
  DropdownMenu,
  DropdownPosition,
} from 'components/primitives/DropdownMenu';

import { Menu } from 'components/Menu';

import {
  DropdownMenuItem,
  FilterButtons,
  FilterResetMobile,
  FilterResetDesktop,
  FilterButton,
} from './FilterMenu.styled';
import { useNetwork } from 'wagmi';

const parseActionTypeEnum = (action: string) =>
  action
    .split('_')
    .map(s => s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');

const FilterMenu = () => {
  const { t } = useTranslation();
  const [showState, setShowState] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const { chain } = useNetwork();
  const { tokens } = useTokenList(chain?.id);

  const {
    onToggleState,
    onResetState,
    isStateSelected,
    countStateSelected,
    onToggleActionType,
    onResetActionType,
    isActionTypeSelected,
    countActionTypeSelected,
    onToggleCurrency,
    onResetCurrency,
    isCurrencySelected,
    countCurrencySelected,
  } = useFilter();

  const stateRef = useRef(null);
  const typeRef = useRef(null);
  const currencyRef = useRef(null);

  // hook that handles the click outside the ref element, when clicked calls callback to close.
  useDetectBlur(stateRef, () => setShowState(false));
  useDetectBlur(typeRef, () => setShowType(false));
  useDetectBlur(currencyRef, () => setShowCurrency(false));

  return (
    <FilterButtons>
      <DropdownMenu ref={stateRef} position={DropdownPosition.BottomRight}>
        <FilterButton
          data-testid="state-filter-btn"
          iconRight
          onClick={() => {
            setShowState(!showState);
          }}
        >
          {t('filter.state')} <FiChevronDown />
        </FilterButton>
        <DropdownContent fullScreenMobile={true} show={showState}>
          {isMobile && (
            <DropdownHeader onClick={() => setShowState(false)}>
              <FiArrowLeft /> <span>{t('filter.state')}</span>{' '}
              <FilterResetMobile onClick={onResetState}>
                {t('filter.reset')}
              </FilterResetMobile>
            </DropdownHeader>
          )}
          <Menu>
            {Object.values(ProposalState).map(state => {
              return (
                <DropdownMenuItem
                  data-testid="state-dropdown-option"
                  key={state}
                  onClick={() => onToggleState(state)}
                >
                  {state} {isStateSelected(state) && <FiCheck />}
                </DropdownMenuItem>
              );
            })}
          </Menu>
          {isDesktop && countStateSelected > 0 && (
            <FilterResetDesktop onClick={onResetState}>
              {t('filter.reset')}
            </FilterResetDesktop>
          )}
        </DropdownContent>
      </DropdownMenu>

      <DropdownMenu ref={typeRef} position={DropdownPosition.BottomRight}>
        <FilterButton
          data-testid="action-filter-btn"
          iconRight
          onClick={() => setShowType(!showType)}
        >
          {t('actionBuilder.action.actions_one')} <FiChevronDown />
        </FilterButton>
        <DropdownContent fullScreenMobile={true} show={showType}>
          {isMobile && (
            <DropdownHeader onClick={() => setShowType(false)}>
              <FiArrowLeft /> <span> {t('filter.type')}</span>{' '}
              <FilterResetMobile onClick={onResetActionType}>
                {t('filter.reset')}
              </FilterResetMobile>
            </DropdownHeader>
          )}
          <Menu>
            {Object.values(SupportedAction).map(action => (
              <DropdownMenuItem
                data-testid="action-dropdown-option"
                key={action}
                onClick={() => onToggleActionType(action)}
              >
                {parseActionTypeEnum(action)}
                {isActionTypeSelected(action) && <FiCheck />}
              </DropdownMenuItem>
            ))}
          </Menu>
          {isDesktop && countActionTypeSelected > 0 && (
            <FilterResetDesktop onClick={onResetActionType}>
              {t('filter.reset')}
            </FilterResetDesktop>
          )}
        </DropdownContent>
      </DropdownMenu>

      {tokens?.length && (
        <DropdownMenu ref={currencyRef} position={DropdownPosition.BottomRight}>
          <FilterButton
            data-testid="currency-filter-btn"
            iconRight
            onClick={() => setShowCurrency(!showCurrency)}
          >
            {t('filter.currency')} <FiChevronDown />
          </FilterButton>
          <DropdownContent fullScreenMobile={true} show={showCurrency}>
            {isMobile && (
              <DropdownHeader onClick={() => setShowCurrency(false)}>
                <FiArrowLeft /> <span>{t('filter.currency')}</span>
                <FilterResetMobile onClick={onResetCurrency}>
                  {t('filter.reset')}
                </FilterResetMobile>
              </DropdownHeader>
            )}
            <Menu>
              {tokens.map(token => {
                return (
                  <DropdownMenuItem
                    data-testid="currency-dropdown-option"
                    onClick={() => onToggleCurrency(token.address)}
                    key={token.address}
                  >
                    {token.symbol}
                    {isCurrencySelected(token.address) && <FiCheck />}
                  </DropdownMenuItem>
                );
              })}
            </Menu>
            {isDesktop && countCurrencySelected > 0 && (
              <FilterResetDesktop onClick={onResetCurrency}>
                {t('filter.reset')}
              </FilterResetDesktop>
            )}
          </DropdownContent>
        </DropdownMenu>
      )}
    </FilterButtons>
  );
};

export default FilterMenu;
