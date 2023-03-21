import styled from 'styled-components';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';
import { Box } from 'components/primitives/Layout';

export const FieldError = styled(ErrorLabel)`
  margin-top: 0.5rem;
`;

export const SwapQuoteError = styled(ErrorLabel)`
  margin: 1rem 0;
  font-size: 14px;
`;

export const Spacer = styled(Box)`
  margin-right: 1rem;
`;

export const UnitPriceContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
