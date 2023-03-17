import styled from 'styled-components';

export const SliderStyle = styled.input`
  /*
    Track styles
  */
  -webkit-appearance: none;
  appearance: none;
  background: transparent;

  cursor: pointer;
  width: 100%;

  /*
    Track styles
  */

  // Chrome, Safari
  &::-webkit-slider-runnable-track {
    height: 8px;
    background: ${({ theme }) => theme.colors.darkGreen1};
    border-radius: ${({ theme }) => theme.radii.pill};
  }
  // Firefox
  &::-moz-range-track {
    height: 8px;
    background: ${({ theme }) => theme.colors.darkGreen1};
    border-radius: ${({ theme }) => theme.radii.pill};
  }

  /*
    Thumb styles
  */

  // Chrome, Safari
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    margin-top: -6px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radii.rounded};
  }
  // Firefox
  &::-moz-range-thumb {
    border: none;
    height: 20px;
    width: 20px;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.radii.rounded};
    background: ${({ theme }) => theme.colors.white};
  }

  /*
    Progress style (Firefox only)
  */

  // Firefox
  &::-moz-range-progress {
    height: 8px;
    background: ${({ theme }) => theme.colors.grey};
    border-radius: ${({ theme }) => theme.radii.pill};
  }
`;
