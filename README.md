# PongBot

PongBot is a nodebot to augment your Table Tennis experience, developed at [Quiet Light Communications](http://quietlightcom.com). PongBot has been tested on the Intel Edison prototyping platform.


## Want to level up your pong?

### Set up your Edison
- Read Intel’s [Getting Started guide](https://communities.intel.com/docs/DOC-23148) (I’m on a Mac, but the instructions for other platforms are linked within.)
- Update your Edison, following Intel’s [instructions](https://communities.intel.com/docs/DOC-23191)
- run `configure_edison --setup`
- edit the opkg conf to add repositories for the necessary software
- use opkg to install git, sqlite3

### Install the pongbot software
- run `git clone git://github.com/jacobroufa/pongbot.git`
- run `npm install`

### Get your hardware ready
- Install your buttons to pins 7 and 8
- Load up http://edison.local:8888 on your tablet

# LET ‘ER RIP!


### TODO
- add grunt
- add tests
- add graceful database schema updates
- build out player controller
- build front end
- play some pong


### Future version goals
- doubles mode
- tournament mode
- player handicaps
- stats discovery
- bracketing based on stats


## License
Copyright (c) 2015 Jacob Roufa <jacob.roufa@gmail.com>
Licensed under the MIT license.
