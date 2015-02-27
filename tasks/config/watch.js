// Watches files for changes and runs tasks based on the changed files

'use strict';

module.exports = {
  node: {
    files: ['package.json'],
    tasks: ['npm-install']
  },
  grunt: {
    files: ['Gruntfile.js', 'tasks/**/*.js', 'settings.json', 'package.json'],
    options: {
      reload: true
    }
  },
  js: {
    files: ['<%= config.script %>/{,*/}*.js'],
    tasks: ['jshint','jscs']
  }
};
