import styled from 'styled-components';
import { MenuItem } from 'components/Menu';

import { DropdownButton } from 'components/primitives/DropdownMenu';

export const DropdownMenuItem = styled(MenuItem)`
  display: flex;
  flex: 1;
  justify-content: space-between;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg4};
    color: ${({ theme }) => theme.colors.primary1};
  }
`;

export const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  & img,
  svg {
    margin-left: 15px;
  }
`;

export const FilterResetMobile = styled.div`
  margin-left: auto;
  margin-right: 20px;
`;

export const FilterResetDesktop = styled.div`
  background: ${({ theme }) => theme.colors.bg1};
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-top: 0.5px solid ${({ theme }) => theme.colors.text};
`;

export const FilterButton = styled(DropdownButton)`
  background-color: ${({ theme }) => theme.colors.bg1};
  color: ${({ theme }) => theme.colors.text};
  margin-right: 1rem;
`;
