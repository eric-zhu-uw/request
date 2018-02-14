import { Router } from 'express';
import { Request, Ledger } from '../../data/models';
import sequelize from '../../data/sequelize';
import logger from '../../logger';

const router = Router();

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(403).send();
});

router.post('/send', (req, res) => {
  const { amount, description, receiver, type } = req.body;
  const sender = req.user.id;
  if (sender === receiver) {
    res.send('Error');
  }
  Request.create({ sender, receiver, amount, description, type })
    .then(() => res.send('successfully sent request.'))
    .catch(err => res.send(err));
});

router.post('/accept', (req, res) => {
  const { id } = req.body;
  const receiver = req.user.id;

  sequelize
    .transaction(t => {
      const updateParams = { active: Date.now() };
      const searchUpdateParams = { where: { id } };
      const findOneParams = { where: { id } };
      const transaction = { transaction: t };

      return Request.update(updateParams, searchUpdateParams, transaction)
        .then(() => Request.findOne(findOneParams, transaction))
        .then(request => {
          const { dataValues } = request;
          const transactionType = dataValues.type;
          const credit_user =
            transactionType === 'R' ? receiver : dataValues.sender;
          const debit_user =
            transactionType === 'S' ? receiver : dataValues.sender;
          const { sender, description, amount, type } = dataValues;
          const createParams = { debit_user, credit_user, amount, description };

          if (transactionType === 'R') {
            logger.log('Request for money');
          } else if (transactionType === 'S') {
            logger.log('Sent money');
          } else {
            logger.log('BIG PROBLEMS');
          }

          return Ledger.create(createParams, transaction);
        });
    })
    .then(res3 => res.send('successfully updated request'))
    .catch(err => res.send(err));
});

export default router;
