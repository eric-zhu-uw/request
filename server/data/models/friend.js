import Type from 'sequelize';
import sequelize from '../sequelize';

const Friend = sequelize.define(
  'Friend',
  {
    /** user_1 should always be the lexigraphically first/lesser username.
     *  (user_1 < user_2).
     */
    user_1: {
      primaryKey: true,
      type: Type.STRING(20),
      allowNull: false,
    },
    user_2: {
      primaryKey: true,
      type: Type.STRING(20),
      allowNull: false,
    },
    status: {
      type: Type.INTEGER,
      allowNull: false,
    },
    action_user: {
      type: Type.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: 'Friend',
  },
);

export default Friend;
