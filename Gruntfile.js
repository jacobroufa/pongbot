/**
 *
 * Grunt tasks are post-fixed (e.g. `less:dev`) with `:dev` or `:server`,
 * for their respective environments.
 *
 * Run `grunt availabletasks` to get a list of tasks you can run.
 *
 * Run `grunt dev` in a dedicated terminal window while developing.
 *
 * Run `grunt server` as a triggered deploy process on the Edison
 *
 */

'use strict';

module.exports = function( grunt ) {

  var _ = require( 'underscore' );
  var config = {
    pkg: grunt.file.readJSON( 'package.json' ), // so we can determine things based on the npm package.json
    env: process.env, // environment variables
    config: grunt.file.readJSON( 'settings.json' ), // information about the assets configuration
    availabletasks: {
      tasks: {}
    } // lets us list available tasks from the command line
  };

  // if you run grunt with the `--debug` flag, you will get your env info before the process starts
  grunt.log.debug( JSON.stringify({
    'package.json': config.pkg,
    'environment variables': config.env,
    'settings.json': config.config
  }, null, 2 ));

  // load all of our configuration dynamically
  _.extend( config, loadConfig( './tasks/config/' ));

  // time it
  require( 'time-grunt' )( grunt );

  // load all npm-installed tasks available, prefixed with `grunt-`
  require( 'load-grunt-tasks' )( grunt );

  // load all custom tasks from the `tasks` folder
  grunt.loadTasks( 'tasks' );

  grunt.initConfig( config );
};

/**
 * Helper function to load configuration
 * http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
 */
function loadConfig( path ) {
  var glob = require( 'glob' );
  var object = {};
  var key;

  glob.sync( '*', {cwd: path}).forEach( function( option ) {
    key = option.replace( /\.js$/, '' );
    object[key] = require( path + option ); // adds `filename: { config: options }` to the config object
  });

  return object;
}
