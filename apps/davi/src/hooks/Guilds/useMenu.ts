import { useState } from 'react';
import { ProposalState } from 'types/types.guilds.d';
import { SupportedAction } from 'components/ActionsBuilder/types';

export interface UseMenuReturn {
  //State
  onToggleState: (value: ProposalState) => void;
  onResetState: () => void;
  isStateSelected: (value: ProposalState) => boolean;
  countStateSelected: number;
  filterState: ProposalState[];

  //Type
  onToggleActionType: (value: string) => void;
  onResetActionType: () => void;
  isActionTypeSelected: (value: SupportedAction) => boolean;
  countActionTypeSelected: number;
  filterActionTypes: SupportedAction[];

  //Currency
  onToggleCurrency: (value: string) => void;
  onResetCurrency: () => void;
  isCurrencySelected: (value: string) => boolean;
  countCurrencySelected: number;
  filterCurrency: string[];

  totalFilters: number;
}
// This hooks controls the filter for the menus.
export const useMenu = ({
  initialStates = [],
  initialTypes = [],
  initialCurrencies = [],
}): UseMenuReturn => {
  const [filterState, setFilterState] =
    useState<ProposalState[]>(initialStates);
  const [filterActionTypes, setFilterActionType] =
    useState<SupportedAction[]>(initialTypes);
  const [filterCurrency, setFilterCurrency] =
    useState<string[]>(initialCurrencies);

  // abstract function to toggle given value, state, and setSate params.
  const onToggleFilter = (value, stateToUse, setStateToUse) => {
    let actualState = new Array(...stateToUse);

    if (actualState.find(elem => elem === value)) {
      //if the menuItem is selected already, filter out.
      setStateToUse(actualState.filter(elem => elem !== value));
    } else {
      //else lets push this menuItem in the selected ones.
      actualState.push(value);
      setStateToUse(actualState);
    }
  };

  return {
    //State
    onToggleState: value => onToggleFilter(value, filterState, setFilterState),
    onResetState: () => setFilterState([]),
    isStateSelected: value => filterState.indexOf(value) > -1,
    countStateSelected: filterState.length,
    filterState,

    //Type
    onToggleActionType: value =>
      onToggleFilter(value, filterActionTypes, setFilterActionType),
    onResetActionType: () => setFilterActionType([]),
    isActionTypeSelected: value => filterActionTypes.indexOf(value) > -1,
    countActionTypeSelected: filterActionTypes.length,
    filterActionTypes,

    //Currency
    onToggleCurrency: value =>
      onToggleFilter(value, filterCurrency, setFilterCurrency),
    onResetCurrency: () => setFilterCurrency([]),
    isCurrencySelected: value => filterCurrency.indexOf(value) > -1,
    countCurrencySelected: filterCurrency.length,
    filterCurrency,

    totalFilters:
      filterState.length + filterActionTypes.length + filterCurrency.length,
  };
};
