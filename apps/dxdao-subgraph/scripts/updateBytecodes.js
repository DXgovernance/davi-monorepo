// Update bytecodes with current deployment bytecodes
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(
  __dirname,
  '../node_modules/dxdao-contracts/bytecodes/local.json'
);

if (fs.existsSync(filePath)) {
  const local = require(filePath);
  const localString = JSON.stringify(local, null, 2);
  fs.writeFileSync(
    path.resolve(__dirname, '../src/mappings/Create2Deployer/local.ts'),
    `export const local = ${JSON.stringify(localString)};`
  );
} else {
  console.error(
    'Error:: Missing file: dxdao-contracts/bytecodes/local.json. Do you forget to run compile script from dxdao-contracts?. Try with `pnpm run dev --force`'
  );
  process.exit(1);
}

