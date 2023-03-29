import { Box } from 'components/primitives/Layout/Box';
import styled from 'styled-components';

export const OrderViewContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
  margin-bottom: 1.5rem;
  align-items: start;
`;

export const DetailHeader = styled(OrderViewContainer)`
  color: ${({ theme }) => theme.colors.text};
  margin-top: 0;
  white-space: pre-wrap;
`;

export const DetailBody = styled(OrderViewContainer)`
  color: ${({ theme }) => theme.colors.grey};
  margin: 0;
`;

export const RedHighlight = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

export const AmountContainer = styled.span`
  margin-right: 1rem;
`;

export const SummaryRow = styled(Box)`
  display: flex;
  margin: 0.4rem 0;
`;
