const path = require('path');
const fs = require('fs');

fs.writeFileSync(
  path.resolve(__dirname, '../networks.json'),
  JSON.stringify(
    {
      private: {
        GuildRegistry: {
          address: '0xf0EE9557982b4300a69f355a896Fd3af69e46D32',
          startBlock: 1,
        },
        PermissionRegistry: {
          address: '0x0E59f2bAe31C0AAeb1cd0a16E883b00A9CD115eE',
          startBlock: 1,
        },
        Create2Deployer: {
          address: '0xEa8FFf1398336867D0b259E319b49E0D6622311F',
          startBlock: 1,
        },
      },
      gnosis: {
        GuildRegistry: {
          address: '0x7E6EB84621c3bb8455046f380c3934fAf8076158',
          startBlock: 25681500,
        },
        PermissionRegistry: {
          address: '0x58A7d7C15Dcc73E9bEEe4C8c14AD4bFCac7058DC',
          startBlock: 25681488,
        },
        Create2Deployer: {
          address: '0x17f4663d463c874352b30a09aab0ca48a06060a3',
          startBlock: 25681480,
        },
      },
    },
    null,
    2
  )
);

