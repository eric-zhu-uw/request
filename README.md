# request

A tool to manage money between friends.

## TODO

* [x] setup linters and basic dev environment for server
* [ ] setup webpack and automatic build tools for server
* [x] server side logger
* [ ] look into server-side debuggers
* [ ] plan out API-endpoint and necessary database tables
* [x] re-organize backend code into folder & debate if front-end should be in it's own repository
* [ ] separate build scripts for nativeIOS|Android|backend and then automatic upload into AWS
* [ ] setup Redux with React Native
* [ ] setup mocha tests
* [ ] docker
* [ ] travis CI

## Important Software

nvm --version `0.33.8`

node -v `v8.9.4`

npm -v `4.6.1`

## NPM scripts

`yarn start`: start server in dev mode, with automatic server refresh
`yarn build`: build to `/build` folder

## Modes

append `--env.OPTION` after `yarn xxx` command

ex. `yarn start --env.release`

### Production build

`--env.release`

note: production option does not start the server

### Verbose logging

`--env.verbose`

enables 'silly' level logging

### Port

`--env.port=PORTNUM`

### Build Only

`--env.buildony`

only produces the bundle file without starting server

## Install dependencies

### Dev tools Setup

run `yarn` under the root directory should take care of everything

### Server modules

run `yarn` inside `./server`

### Native modules

run `yarn` inside `./native`

## Setup to develop

1. Need to set the correct environment variables
   1. Create a local `.env file`
   2. Config necessary environment variables:
   ```
   DEV_DB_HOST=localhost
   DEV_DB_USER=root
   DEV_DB_PASS='...'
   DEV_APP_PORT=3000
   ```
