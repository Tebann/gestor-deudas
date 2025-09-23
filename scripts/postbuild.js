const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const src = path.join(buildDir, 'index.html');
const dest = path.join(buildDir, '404.html');

try {
  fs.copyFileSync(src, dest);
  console.log('postbuild: index.html copiado a 404.html');
} catch (err) {
  console.error('postbuild error:', err);
  process.exit(1);
}
