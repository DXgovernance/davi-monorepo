import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { Heading } from 'components/primitives/Typography';

export const Container = styled.div`
  margin: 2rem;
`;

export const ConnectionError = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.red};
`;

export const BackIcon = styled(FiArrowLeft)`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  margin: 0;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.border1};
  }
`;

export const ButtonContainer = styled.div`
  margin: 1.5rem;
  text-align: center;
`;

export const TransactionsList = styled.div`
  margin: 1.5rem 0;
`;

export const TransactionsListHeading = styled(Heading)`
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.grey};
`;

export const Language = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 24px;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

export const WalletModalItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 24px;
  padding-top: 1.5rem;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

export const WalletModalItemTitle = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
export const WalletModalItemValue = styled(WalletModalItemTitle)`
  cursor: pointer;
`;

export const LanguageList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 1.5rem;
`;
