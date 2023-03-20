import { Button } from 'components/primitives/Button';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';
import styled from 'styled-components';

export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
  align-items: flex-end;
`};
`;

export const ChainName = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 0.5rem;
`;

export const ChainContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: left;
  align-items: center;
  border: none;

  &:focus {
    border: none;
  }
`;

export const Error = styled(ErrorLabel)`
  margin-top: 0.5rem;
`;

export const CustomRPCModal = styled.div`
  text-align: -webkit-center;
  padding: 1rem;
`;

export const ChainOptionContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg1};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.curved};
  margin: 1rem 0;
`;

export const SaveButton = styled(Button)`
  width: 100%;
  font-weight: 600;

  padding: 0.5rem 0;
`;
