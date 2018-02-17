import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV;
const sessionExpiryDate = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000); // 10 years

const development = {
  db: {
    database: process.env.DEV_DB_DATABASE || 'request',
    host: process.env.DEV_DB_HOST || 'localhost',
    user: process.env.DEV_DB_USER || 'root',
    pass: process.env.DEV_DB_PASS || '',
    options: {
      forced: process.env.DEV_DB_OPT_FORCED || true,
    },
  },
  session: {
    name: 'sessionId',
    secret: 'KMylyQyPsgCLaAxbMIEH',
    cookie: { httpOnly: true, expires: sessionExpiryDate },
    resave: false,
    saveUninitialized: false,
  },
  winston: {
    timestamp: () => new Date().toLocaleTimeString(),
    colorize: true,
  },
};

const config = {
  development,
};

export default config[env];
