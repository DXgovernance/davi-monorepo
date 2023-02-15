import { InputHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';
import { InputProps } from '../Input/Input';

const StyledRadioInput = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  width: 20px;
  height: 20px;
  cursor: pointer;
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
