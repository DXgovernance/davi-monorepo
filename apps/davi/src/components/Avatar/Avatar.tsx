import { Loading } from 'components/primitives/Loading';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import styled from 'styled-components';
import { ButtonIcon } from 'components/primitives/Button';

interface AvatarProps {
  src?: string;
  defaultSeed?: string;
  size?: number;
}

const AvatarIcon = styled(ButtonIcon)<{ size: number }>`
  border-radius: 50%;
  ${({ size }) =>
    size &&
    `
      height: ${size}px;
      width: ${size}px;
    `}
`;

export const Avatar: React.FC<AvatarProps> = ({
  src,
  defaultSeed,
  size = 24,
}) => {
  if (!src && !defaultSeed) {
    return (
      <Loading
        data-testid="loading"
        loading
        text
        skeletonProps={{
          circle: true,
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    );
  }

  return src ? (
    <AvatarIcon data-testid="avatar" src={src} alt={'Avatar'} size={size} />
  ) : (
    <Jazzicon
      data-testid="jazzicon"
      diameter={size}
      seed={jsNumberForAddress(defaultSeed)}
    />
  );
};
