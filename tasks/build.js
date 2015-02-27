// Registers the `build` task

'use strict';

module.exports = function( grunt ) {

  grunt.registerTask('build', 'Run the build grunt process.', function( target ) {

    if ( target === 'dev' ) {
      grunt.task.run(['concurrent:dev']);
    } else if ( target === 'server' ) {
      grunt.task.run(['concurrent:server']);
    }

  });

};

