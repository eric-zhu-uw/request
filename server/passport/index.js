import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { User } from '../data/models';
import logger from '../logger';

/**
 * The purpose of serialize/deserialize is so you don't have to query
 * the database for every page load. The { id } object will be saved as
 * a cookie and will be serialize/deserialize on page load
 *
 * To access username: req.user = { id: '...' }
 * To check authentication: req.isAuthenticated()
 * To logout: req.logout()
 */

// TODO: should serialize more than just the ID or else hackers would
//       be able to mock the API calls
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ where: { username, password } })
      .then(res => {
        if (!res) {
          return done(null, false, {
            message: 'Incorrect login credentials',
          });
        }

        return done(null, { id: res.dataValues.username });
      })
      .catch(err => {
        logger.error(err);
        return done(err);
      });
  }),
);

export default passport;
