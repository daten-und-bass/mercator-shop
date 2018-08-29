const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

const aliases = {
  '@src': 'src',
  '@router': 'src/router',
  '@locales': 'src/locales',
  '@filters': 'src/filters',
  '@components': 'src/components',
  '@views': 'src/views',
  '@assets': 'src/assets',
  '@api': 'src/api',
  '@plugins': 'src/plugins',
  '@store': 'src/store',
  // '@design': 'src/design/index.scss',
};

module.exports = {
  webpack: {},
  jest: {},
};

for (const alias in aliases) {
  module.exports.webpack[alias] = resolveSrc(aliases[alias]);
  module.exports.jest['^' + alias + '/(.*)$'] =
    '<rootDir>/' + aliases[alias] + '/$1'
}
