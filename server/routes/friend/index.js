import { Router } from 'express';
import { Friend, ModelTypes } from '../../data/models';

const router = Router();

/**
 *  Post a friend request from the current user to the specified user.
 *  If a friend relationship already exists where the other user has a request
 *  to be the current user's friend, it will be treated as an accept.
 *  @param: {String} username of the user to send the request to.
 */
router.post('/add', (req, res) => {
  if (req.user) {
    // TODO: will the user get the friend id or username?
    // Pick user_1 to be the lexographically first username.
    const friendId = req.body;
    const user1 = req.user.id < friendId ? req.user.id : friendId;
    const user2 = req.user.id < friendId ? friendId : req.user.id;

    const findOneParams = { where: { user_1: user1, user_2: user2 } };
    const relationship = Friend.findOne(findOneParams).catch(err =>
      res.send(err),
    );

    // If no results, create a new entry.
    if (relationship == null) {
      Friend.create({
        user1,
        user2,
        status: ModelTypes.FriendStatus.PENDING,
        action_user: friendId,
      })
        .then(() => res.send('succesfully sent friend request'))
        .catch(err => res.send(err));
    } else if (relationship.action_user === req.user.id) {
      // if action user is the current user, update status to ACCEPTED.
      relationship
        .update({ status: ModelTypes.FriendStatus.ACCEPTED })
        .then(() => res.send('accepted friend request.'))
        .catch(err => res.send(err));
    } else {
      // a friend relationship eists but the other user is the action user.
      res.send("you've already sent a friend request.");
    }
  } else {
    res.send('failed adding friend. Could not retrieve current user profile.');
  }
});

/**
 *  Accept a friend request from the other user.
 *  @param: {String} username of the user who send the request.
 */
router.post('/accept', (req, res) => {
  if (req.user) {
    // TODO: will the user get the friend id or username?
    // Pick user_1 to be the lexographically first username.
    const friendId = req.body;
    const user1 = req.user.id < friendId ? req.user.id : friendId;
    const user2 = req.user.id < friendId ? friendId : req.user.id;

    const findOneParams = { where: { user_1: user1, user_2: user2 } };
    const relationship = Friend.findOne(findOneParams).catch(err =>
      res.send(err),
    );

    // If no results, error
    if (relationship == null) {
      // TODO: maybe we should create a request here?
      res.send('no request made yet.');
    } else if (relationship.action_user === req.user.id) {
      // if action user is the current user, update status to ACCEPTED.
      relationship
        .update({ status: ModelTypes.FriendStatus.ACCEPTED })
        .then(() => res.send('accepted friend request.'))
        .catch(err => res.send(err));
    } else {
      // a friend relationship eists but the other user is the action user.
      res.send("you've already sent a friend request.");
    }
  } else {
    res.send(
      'failed accepting friend request. Could not retrieve current user profile.',
    );
  }
});

export default router;
