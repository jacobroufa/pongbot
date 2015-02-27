// Make sure code styles are up to par and there are no obvious mistakes

'use strict';

module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish-ex')
  },
  all: [
    'Gruntfile.js',
    '<%= config.script %>/{,*/}*.js' // anything in the `config.script` directory
  ]
};
