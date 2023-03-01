
import { faker } from '@faker-js/faker';

export const data = {
  discussionTitle: faker.lorem.word(),
  discussionDescription: faker.lorem.sentence()
}

export const ACCOUNTS = [
  { name: 'Account 1', address: '0x9578e973bba0cc33bdbc93c7f77bb3fe6d47d68a' },
  {
    name: 'Account dxdao #1',
    address: '0xc5b20ade9c9cd5e0cc087c62b26b815a4bc1881f',
  },
  { 
    name: 'Account dxdao #2',
    address: '0xaf8eb8c3a5d9d900aa0b98e3df0bcc17d3c5f698',
  },
  {
    name: 'Account dxdao #3',
    address: '0x84eeb305da0a4309a696d43de9f79f04e66eb4f8',
  },
  {
    name: 'Account dxdao #4',
    address: '0x1b929bdde0fb3b7b759696f23d6cac0963d326e6',
  },
  {
    name: 'Account dxdao #5',
    address: '0xd507743abcdb265f5fcef125e3f6cf7250cfe9da',
  },

  {
    name: 'Account dxdao #6',
    address: '0x9af7a0d34fcf09a735ddaa03adc825398a6557ae',
  },
];

export const DXDGuildAddress = '0x140d68e4E3f80cdCf7036De007b3bCEC54D38b1f';

export const ethereumNetworkGuilds = [
  'DXgov Guild',
];

export const gnosisNetworkGuilds = [
  'DXgov Guild',
  'Voice Guild',
  'Carrot Guild',
  'Swapr Guild',
  'Operations Guild'
];

export const localhostGuilds = [
  'Carrot Guild',
  'DXD Guild',
  'DXdao DevOps Guild',
  'DXdao Treasury Guild',
  'DXgov Guild',
  'Operations Guild',
  'Swapr Guild',
  'Voice Guild'
];

export const prodNetworkOptions = [
  'Ethereum',
  'Gnosis',
];

export const networkOptions = [
  'Ethereum',
  'Goerli',
  'Arbitrum One',
  'Arbitrum Goerli',
  'Gnosis',
  'Localhost',
];

export const walletOptions = [
  'MetaMask',
  'WalletConnect',
  'Coinbase Wallet'
];

export const stateFilterOptions = [
  'Active',
  'Executable',
  'Executed',
  'Rejected',
  'Failed',
  'Finished',
];

export const actionFilterOptions = [
  'Native Transfer',
  'Erc20 Transfer',
  'Rep Mint',
  'Generic Call',
  'Set Permissions',
  'Ens Update Content',
  'Raw Transaction',
  'Set Guild Config',
];

export const currencyFilterOptions = ['DXD', 'SWPR', '1INCH'];