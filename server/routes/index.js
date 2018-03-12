import { Router } from 'express';

import login from './login';
import signup from './signup';
import profile from './profile';
import request from './request';
import info from './info';
import friend from './friend';

const router = Router();

router.use('/login', login);
router.use('/signup', signup);
router.use('/profile', profile);
router.use('/request', request);
router.use('/info', info);
router.use('/friend', friend);

router.get('/', (req, res) => {
  res.send('hello world');
});

export default router;
