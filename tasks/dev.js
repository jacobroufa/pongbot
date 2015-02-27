// Registers the `dev` task

'use strict';

module.exports = function( grunt ) {

  grunt.registerTask('dev', 'Start the development grunt process. Use the `--update` flag to update all package managers.', function() {

    if ( grunt.option( 'update' ) ) { // if you run `grunt dev --update`, you will update all your packages
      grunt.task.run(['concurrent:update']);
    }

    grunt.task.run(['build:dev', 'watch']);

  });

};
