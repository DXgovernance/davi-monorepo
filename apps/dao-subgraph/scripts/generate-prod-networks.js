const path = require('path');
const fs = require('fs');

fs.writeFileSync(
  path.resolve(__dirname, '../networks.json'),
  JSON.stringify(
    {
      gnosis: {
        PermissionRegistry: {
          address: '0x89df00AD80781349BE54232A06353b47B0EA3069',
          startBlock: 1,
        },
        DAOController: {
          address: '0xA27Fd367D66eC8Ecd4E49a565818A0EC9c0330BA',
          startBlock: 1,
        },
        DAOAvatar: {
          address: '0x77f7df7De7Ab705eB54982A12D8E1aC65bFa05D3',
          startBlock: 1,
        },
        DAOReputation: {
          address: '0xE148f9D26E4d87eCe5B9bB6C3252DaA95449416E',
          startBlock: 1,
        },
      },
    },
    null,
    2
  )
);

