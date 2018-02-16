# request

A tool to manage money between friends.

## TODO

* [x] setup linters and basic dev environment for server
* [x] setup webpack and automatic build tools for server
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

## Developer setup

### Install dependencies

simply run `yarn` inside root directory

### Running the setup script

`$ sh ./tools/make.sh`

### NPM scripts available

`yarn start`: start server in dev mode, with automatic server refresh
`yarn build`: build to `/build` folder

### Modes

append `--env.OPTION` after `yarn xxx` command

ex. `yarn start --env.release`

#### Production build

`--env.release`

note: production option does not start the server

#### Verbose logging

`--env.verbose`

enables 'silly' level logging

#### Port

`--env.port=PORTNUM`

default port is 3000

#### Build Only

`--env.buildonly`

only produces the bundle file without starting server

2. Config necessary environment variables:

```
DEV_DB_HOST=localhost
DEV_DB_USER=root
DEV_DB_PASS='...'
```
