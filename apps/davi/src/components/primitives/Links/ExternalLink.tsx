import { FiExternalLink } from 'react-icons/fi';
import { StyledSegmentLink, LinkDetail } from './styles';
import { ExternalLinkProps } from './types';

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  disableLink,
  hideIcon = false,
}) => {
  return disableLink ? (
    <>
      <LinkDetail>{children}</LinkDetail>
      {!hideIcon && <FiExternalLink />}
    </>
  ) : (
    <StyledSegmentLink href={href} target="_blank" rel="noopener">
      <LinkDetail>{children}</LinkDetail>
      {!hideIcon && <FiExternalLink />}
    </StyledSegmentLink>
  );
};
