import styled from 'styled-components';
import { FiUnlock, FiX } from 'react-icons/fi';
import { Box } from 'components/primitives/Layout/Box';

const ClickableIcon = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconRight = ({
  disabled,
  value,
  onChange,
  defaultValue,
  setDisabledState,
  type,
}) => {
  if (defaultValue && disabled) {
    return (
      <ClickableIcon
        aria-label="enable"
        onClick={() => {
          setDisabledState(false);
        }}
      >
        <FiUnlock size={18} />
      </ClickableIcon>
    );
  } else if (!disabled && value) {
    const clearLabel = `clear ${type}`;
    return (
      <ClickableIcon
        aria-label={clearLabel}
        data-testid={clearLabel}
        onClick={() => {
          onChange('');
        }}
      >
        <FiX size={18} />
      </ClickableIcon>
    );
  } else return null;
};

export default IconRight;
