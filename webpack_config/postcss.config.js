const autoprefixer = require('autoprefixer');

module.exports = function postcss() {
  return [
    autoprefixer({
      browsers: ['iOS >= 8.1', 'Android >= 4.4']
    })
  ]
};
