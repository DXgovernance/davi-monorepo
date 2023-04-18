import useENS from 'hooks/Guilds/ens/useENS';
import { OptionListItemProps } from '../types';
import {
  OptionDetail,
  OptionIcon,
  OptionItem,
  OptionSubtitle,
  OptionTitle,
  OptionRightData,
} from './OptionListItem.styled';

const OptionListItem: React.FC<OptionListItemProps> = ({ item, onSelect }) => {
  const { name: ENSName } = useENS(item.address);
  return (
    <OptionItem onClick={onSelect} aria-label={`Option item ${item.title}`}>
      <OptionDetail>
        {item.icon && <OptionIcon>{item.icon}</OptionIcon>}
        <div>
          <OptionTitle>{ENSName ? ENSName : item.title}</OptionTitle>
          <OptionSubtitle>{item.subtitle}</OptionSubtitle>
        </div>
      </OptionDetail>
      <OptionRightData>{item.rightData}</OptionRightData>
    </OptionItem>
  );
};

export default OptionListItem;
