import { InputProps } from "components/primitives/Forms/Input";

export interface TokenPickerProps extends InputProps<string> {
  value: string;
  onChange?: (value: string) => void;
}
