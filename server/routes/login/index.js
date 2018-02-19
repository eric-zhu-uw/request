import { Router } from 'express';
import passport from '../../passport';

const router = Router();

router.post('/', (req, res, next) =>
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Success' });
    });
  })(req, res, next),
);

export default router;
