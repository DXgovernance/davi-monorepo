import { useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { useAccount } from 'wagmi';
import { AiOutlineSearch } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useHookStoreProvider } from 'stores';
import { Input } from 'components/primitives/Forms/Input';
import { FilterMenu, FilterButton } from './components';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useFilter } from 'contexts/Guilds/filters';
import {
  FilterContainer,
  FilterRow,
  ButtonContainer,
  StyledIconButton,
  StyledInputWrapper,
  FilterBadge,
  StyledButton,
} from './Filter.styled';
import { StyledLink } from 'components/primitives/Links';

interface FilterProps {
  openSearchBar: boolean;
  setOpenSearchBar: (openSearchBar: boolean) => void;
}

export const Filter: React.FC<FilterProps> = ({
  openSearchBar,
  setOpenSearchBar,
}) => {
  const {
    hooks: {
      fetchers: { useIsProposalCreationAllowed },
    },
  } = useHookStoreProvider();
  const { t } = useTranslation();
  const { chainName, guildId } = useTypedParams();
  const { address: userAddress } = useAccount();
  const [viewFilter, setViewFilter] = useState(false);
  const { totalFilters, searchQuery, setSearchQuery } = useFilter();
  const isProposalCreationAllowed = useIsProposalCreationAllowed(
    guildId,
    userAddress
  );

  return (
    <FilterContainer>
      <FilterRow>
        {isMobile && !isProposalCreationAllowed && (
          <FilterButton onClick={() => setViewFilter(!viewFilter)}>
            {t('filter')}
            {totalFilters > 0 && <FilterBadge>{totalFilters}</FilterBadge>}
          </FilterButton>
        )}
        {isDesktop && <FilterMenu />}

        <ButtonContainer>
          <StyledIconButton
            data-testid="search-btn-all-proposals"
            variant="secondary"
            padding="0.4rem"
            onClick={() => setOpenSearchBar(!openSearchBar)}
          >
            <AiOutlineSearch size={20} />
          </StyledIconButton>
          {isProposalCreationAllowed && (
            <>
              <StyledLink to={`/${chainName}/${guildId}/create-proposal`}>
                <StyledButton data-testid="create-proposal-button">
                  {t('createProposal')}
                </StyledButton>
              </StyledLink>
            </>
          )}
        </ButtonContainer>
      </FilterRow>
      {isMobile && viewFilter && <FilterMenu />}
      {openSearchBar ? (
        <StyledInputWrapper>
          <Input
            data-testid="search-bar-all-proposals"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
            }}
            icon={<AiOutlineSearch size={24} />}
            placeholder={t('searchTitleEnsAddress')}
          />
        </StyledInputWrapper>
      ) : null}
    </FilterContainer>
  );
};
