// Make sure code styles are up to par and there are no obvious mistakes

'use strict';

module.exports = {
  options: {
    preset: 'grunt',
    disallowSpacesInsideParentheses: {
      only: ['{', '}', '[', ']', '(', ')']
    }
  },
  all: [
    'Gruntfile.js',
    '<%= config.script %>/{,*/}*.js' // anything in the `config.script` directory
  ]
};
