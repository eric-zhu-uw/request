import sequelize from '../sequelize';
import User from './user';
import Request from './request';
import Ledger from './ledger';
import Active from './active';
import Friend from './friend';
import { Triggers } from './constants';

const sync = (...args) => {
  sequelize
    .sync(...args)
    .then(() => {
      console.info('Successfully synced database.');
      sequelize.query(Triggers.updateActives.drop).then(() => {
        sequelize
          .query(Triggers.updateActives.create)
          .then(() => console.log('Update Actives Trigger created'));

        sequelize
          .query(Triggers.updateBalance.create)
          .then(() => console.log('Update Balance Trigger created'));
      });
    })
    .catch(err => {
      console.error('Unable to sync database', err);
    });
};

const Model = { sync };

export { User, Request, Ledger, Active, Friend };
export default Model;
