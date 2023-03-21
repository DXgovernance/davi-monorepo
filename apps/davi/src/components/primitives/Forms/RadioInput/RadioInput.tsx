import { InputHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';
import { InputProps } from '../Input/Input';

const StyledRadioInput = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  width: 20px;
  height: 20px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;

  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.bg1};
  background: ${({ theme }) => theme.colors.bg1};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.text};

  :checked {
    background: ${({ theme }) => theme.colors.text};
  }
`;

export const RadioInput: React.FC<InputProps<any>> = ({
  disabled,
  ...rest
}) => {
  const inputRef = useRef(null);
  return (
    <StyledRadioInput
      ref={inputRef}
      width={'auto'}
      disabled={disabled}
      type={'radio'}
      {...rest}
    />
  );
};
