import { BigNumber } from 'ethers';
import { IStakes } from './types';
import { Proposal } from 'types/types.guilds.d';

export const mockDaoBounty = BigNumber.from('100');

export const mockProposalStakeDetailsEmpty = {
  for: [],
  against: [
    {
      // At the proposal creation, a "NO" stake gets created
      // the stake amount is the DAO bounty
      id: '1',
      staker: '0x0f02ee4553fca3402528c606efbd548848eadda4',
      amount: mockDaoBounty,
    },
  ],
};

export const mockTotalStakedEmptyNo = BigNumber.from('100');

export const mockTotalStakedEmptyYes = BigNumber.from('0');

export const mockTotalStakedEmpty: Proposal['totalStaked'] = [
  mockTotalStakedEmptyNo,
  mockTotalStakedEmptyYes,
];

export const mockProposalStakeDetails: IStakes = {
  for: [
    {
      id: '1',
      staker: '0xaf8eb8c3a5d9d900aa0b98e3df0bcc17d3c5f698',
      amount: BigNumber.from('100'),
    },
    {
      id: '2',
      staker: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
      amount: BigNumber.from('100'),
    },
    {
      id: '3',
      staker: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
      amount: BigNumber.from('336'),
    },
    {
      id: '4',
      staker: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
      amount: BigNumber.from('236'),
    },
    {
      id: '5',
      staker: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
      amount: BigNumber.from('47'),
    },
  ],
  against: [
    {
      id: '6',
      staker: '0x84eeb305da0a4309a696d43de9f79f04e66eb4f8',
      amount: BigNumber.from('100'),
    },
    {
      // At the proposal creation, a "NO" stake gets created
      // the stake amount is the DAO bounty
      id: '7',
      staker: '0x0f02ee4553fca3402528c606efbd548848eadda4',
      amount: mockDaoBounty,
    },
  ],
};

export const mockTotalStakedNo = BigNumber.from('200');

export const mockTotalStakedYes = BigNumber.from('819');

export const mockTotalStaked: Proposal['totalStaked'] = [
  mockTotalStakedNo,
  mockTotalStakedYes,
];

export const mockSelectedOption = {
  no: BigNumber.from(1),
  yes: BigNumber.from(2),
};
