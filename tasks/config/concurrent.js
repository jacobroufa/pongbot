// Run some tasks in parallel to speed up build process

'use strict';

module.exports = {
  update: function() {
    var updateArr = [];

    console.log( '<%= settings.env.HOME %>' );

    if ( '<%= settings.env.HOME %>'.indexOf( 'qltest' ) < 0 ) {
      updateArr.push( 'npm-install' );
    }

    return updateArr;
  },
  dev: [
    'jshint',
    'jscs'
  ],
  server: [
    'jshint',
    'jscs'
  ]
};
