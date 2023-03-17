import { SliderStyle } from './Slider.styled';

interface ISlider {
  value: string;
  onChange: (arg: string) => void;
  min: string;
  max: string;
}

export const Slider = ({ value, onChange, min, max }: ISlider) => {
  return (
    <SliderStyle
      value={value}
      min={min}
      max={max}
      type="range"
      onChange={e => onChange(e.target.value)}
    />
  );
};
