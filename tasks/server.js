// Registers the `server` task

'use strict';

module.exports = function( grunt ) {

  grunt.registerTask('server', 'Update package managers and compile files', function() {

    grunt.task.run(['build:server']);

  });

};
