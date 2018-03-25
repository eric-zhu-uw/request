import { Router } from 'express';
import { Op } from 'sequelize';
import { Request, Ledger, Friend, ModelTypes } from '../../data/models';

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

/**
 *  Gets all friends of a user.
 *  @param: {String} username
 *  @returns: {Array} of friend objects
 */
router.get('/get-friends', (req, res) => {
  const { id } = req.user;
  const findAllParams = {
    where: {
      [Op.and]: {
        [Op.or]: [{ user_1: id }, { user_2: id }],
        [Op.eq]: { status: ModelTypes.FriendStatus.ACCEPTED },
      },
    },
  };
  // TODO:  results into just an array of other users?
  Friend.findAll(findAllParams)
    .then(transactions => res.json(transactions))
    .catch(err => res.send(err));
});

/**
 *  Gets all friend requests that a user need to respond to.
 *  @param: {String} username
 *  @returns: {Array} of friend objects
 */
router.get('/get-active-friend-requests', (req, res) => {
  const { id } = req.user;
  const findAllParams = {
    where: {
      [Op.and]: {
        [Op.eq]: { action_user: id },
        [Op.eq]: { status: ModelTypes.FriendStatus.PENDING },
      },
    },
  };
  // TODO:  results into just an array of other users?
  Friend.findAll(findAllParams)
    .then(transactions => res.json(transactions))
    .catch(err => res.send(err));
});

export default router;
