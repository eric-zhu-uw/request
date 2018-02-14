import { Router } from 'express';
import { Op } from 'sequelize';
import { Request, Ledger } from '../../data/models';

const router = Router();

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(403).send();
});

/**
 *  Gets all outstanding requests for the user
 *  @param: {String} username to query receiver
 *  @returns: {Array} of requests objects
 */
router.get('/get-requests', (req, res) => {
  const { id } = req.user;
  const findAllParams = { where: { receiver: id, active: null } };
  Request.findAll(findAllParams)
    .then(requests => res.json(requests))
    .catch(err => res.send(err));
});

/**
 *  Gets all previous transactions for the user
 *  @param: {String} username to query debit_user and credit_user
 *  @returns: {Array} of ledger objects
 */
router.get('/get-transactions', (req, res) => {
  const { id } = req.user;
  const findAllParams = {
    where: { [Op.or]: [{ debit_user: id }, { credit_user: id }] },
  };

  Ledger.findAll(findAllParams)
    .then(transactions => res.json(transactions))
    .catch(err => res.send(err));
});

export default router;
