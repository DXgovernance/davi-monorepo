import styled from 'styled-components';

export const ProposalDescriptionWrapper = styled.div`
  margin: 1.5rem 0;
  line-height: 1.5;
  font-size: 16px;
  word-break: break-word;
  text-align: left;
  color: ${({ theme }) => theme.colors.grey2};

  a {
    color: ${({ theme }) => theme.colors.active};
  }
`;

export const ProposalDescriptionContainer = styled.div<{
  showHandler?: boolean;
  disabled?: boolean;
}>`
  ${({ disabled, showHandler }) =>
    !disabled &&
    `
  position: relative;
  max-height: ${showHandler ? '40vh' : ''};
  overflow: ${showHandler ? 'hidden' : 'visible'};
  `}
`;

export const ProposalDescriptionOverlay = styled.div<{
  disabled?: boolean;
}>`
  ${({ disabled }) =>
    !disabled &&
    `
    position: absolute;
    background: linear-gradient(to top, #2F3533, rgb(255 255 255 / 0));
    width: 100%;
    height: 8rem;
    bottom: 0px;
    `}
`;

export const ButtonContainer = styled.div<{
  position?: string;
}>`
  position: ${({ position }) => position ?? 'relative'};
  bottom: -3px;
  text-align: center;
  width: 100%;
`;
