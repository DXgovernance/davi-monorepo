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
    },
    null,
    2
  )
);

