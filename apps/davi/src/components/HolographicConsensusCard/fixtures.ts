import { BigNumber } from 'ethers';
import { IStakes } from './types';

export const mockProposalStakeDetails: IStakes = {
  for: [
    {
      id: '1',
      staker: '0xaf8eb8c3a5d9d900aa0b98e3df0bcc17d3c5f698',
      amount: BigNumber.from('100000000000000000000'),
    },
    {
      id: '2',
      staker: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
      amount: BigNumber.from('100000000000000000000'),
    },
    {
      id: '3',
      staker: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
      amount: BigNumber.from('336000000000000000000'),
    },
    {
      id: '4',
      staker: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
      amount: BigNumber.from('236600000000000000000'),
    },
    {
      id: '5',
      staker: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
      amount: BigNumber.from('47138000000000000000'),
    },
  ],
  against: [
    {
      id: '6',
      staker: '0x84eeb305da0a4309a696d43de9f79f04e66eb4f8',
      amount: BigNumber.from('100000000000000000000'),
    },
  ],
};

export const mockProposalStakeDetailsEmpty = {
  for: [],
  against: [],
};
