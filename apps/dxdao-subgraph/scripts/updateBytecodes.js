// Update bytecodes with current deployment bytecodes
const fs = require('fs');
const path = require('path');
const local = require('dxdao-contracts/bytecodes/local.json');
const localString = JSON.stringify(local, null, 2);
fs.writeFileSync(
  path.resolve(__dirname, '../src/mappings/Create2Deployer/local.ts'),
  `export const local = ${JSON.stringify(localString)};`
);

