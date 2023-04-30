export enum SupportedChainId {
  MAINNET = 1,
  GOERLI = 5,
  GNOSIS_CHAIN = 100,
}

export const COW_CONFIG: Record<SupportedChainId, string> = {
  [SupportedChainId.MAINNET]: 'https://api.cow.fi/mainnet',
  [SupportedChainId.GNOSIS_CHAIN]: 'https://api.cow.fi/xdai',
  [SupportedChainId.GOERLI]: 'https://api.cow.fi/goerli',
};

export const vaultRelayerContractAddress =
  '0xC92E8bdf79f0507f65a392b0ab4667716BFE0110';
export const settlementContractAddress =
  '0x9008D19f58AAbD9eD0D60971565AA8510560ab41';
