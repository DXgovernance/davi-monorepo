import { ReactNode } from 'react';

export interface BlockExplorerLinkProps {
  address: string;
  showAvatar?: boolean;
  avatarSize?: number;
  shortAddress?: boolean;
  disableLink?: boolean;
  forceShowAddress?: boolean;
  fetchTokenData?: boolean;
}

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  disableLink?: boolean;
  hideIcon?: boolean;
}
