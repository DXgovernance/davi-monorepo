import React from 'react';
import { Chain, useNetwork } from 'wagmi';
import { getBlockExplorerUrl } from 'provider';
import { NotificationDetail } from './NotificationDetail';
import { NotificationHeading } from './NotificationHeading';

export const TransactionPending: React.FC<{ summary: string }> = ({
  summary,
}) => {
  return <NotificationHeading>{summary}</NotificationHeading>;
};

export const TransactionOutcome: React.FC<{
  summary: string;
  transactionHash: string;
  chain: Chain;
}> = ({ summary, transactionHash }) => {
  const { chain } = useNetwork();
  return (
    <div>
      <NotificationHeading>{summary}</NotificationHeading>
      <NotificationDetail>
        <a
          href={getBlockExplorerUrl(chain, transactionHash, 'tx')}
          target="_blank"
          rel="noreferrer"
        >
          View on Block Explorer
        </a>
      </NotificationDetail>
    </div>
  );
};
