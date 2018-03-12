import { Router } from 'express';
import { Friend, FriendStatus } from '../../data/models';

const router = Router();

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
      return Friend.create({
        user1,
        user2,
        status: FriendStatus.PENDING,
        action_user: friendId,
      });
    }
    // if action user is the current user, update status to ACCEPTED.

    /**
      TODO:
      1) query the friend table with user_1 and user_2.
      2) if no results, good. create new friend entry {
          user_1,
          user_2,
          FriendStatus.PENDING,
          friendId
        }
      3) else if results (should only be 1) take the first one.
        a) if ACTION_USER == req.user.id, update Status to FriendStatus.ACCEPTED
        b) else res.send(you've already sent a request.)
     */
  } else {
    res.send('failed adding friend. Could not retrieve current user profile.');
  }
});

router.post('accept', (req, res) => {
  if (req.user) {
    // TODO: accept request
    res.send('success accept');
  } else {
    res.send(
      'failed accepting friend request. ' +
        'Could not retrieve current user profile.',
    );
  }
});

export default router;
