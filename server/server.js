import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import PrettyError from 'pretty-error';
import morgan from 'morgan';

import Model from './data/models';
import config from './config';
import routes from './routes';
import passport from './passport';
import logger from './logger';

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'common'));
logger.info(`Logger level: ${logger.level}`);

if (process.env.NODE_ENV !== 'production') {
  app.enable('trust proxy');
  logger.warn(`Running in ${process.env.NODE_ENV} environment, not suitable for production use.`);
}

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(pe.render(err));
  res.status(err.status || 500);
  res.send(pe.render(err));
});

// -----/ Sync DB Tables to Models --------------------
if (process.env.NODE_ENV !== 'test') {
  Model.sync(config.db.options);
}

// -----/ Setup Session and Passport middleware --------------------
app.set('trust proxy', 1);
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

// -----/ Initialize Routes --------------------
app.use('/', routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.app.port, () => {
    logger.info(`The server is running at http://localhost:${config.app.port}/`);
  });
}

export default app;
