const fs = require('fs');
const glob = require('glob');

/**
 * Merge all schemas (files with `.graphql` extension) from `mappings` into a single schema
 */
async function generateSchema() {
  const files = await new Promise((resolve, reject) =>
    glob(`${__dirname}/../src/mappings/**/schema.graphql`, (err, files) =>
      err ? reject(err) : resolve(files)
    )
  );
  const schema = [...files]
    .map(file => fs.readFileSync(file, 'utf-8'))
    .join('\n\n');

  fs.writeFileSync(`${__dirname}/../schema.graphql`, schema, 'utf-8');
}

if (require.main === module) {
  generateSchema().catch(err => {
    console.log(err);
    process.exit(1);
  });
} else {
  module.exports = generateSchema;
}

