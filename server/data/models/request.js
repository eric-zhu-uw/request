import Type from 'sequelize';
import sequelize from '../sequelize';

const Request = sequelize.define('Request', {
  id: {
    primaryKey: true,
    type: Type.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  active: {
    type: Type.DATE,
    allowNull: true,
  },
  sender: {
    type: Type.STRING(20),
    allowNull: false,
  },
  receiver: {
    type: Type.STRING(20),
    allowNull: false,
  },
  amount: {
    type: Type.DOUBLE(10, 2),
    allowNull: false,
  },
  description: {
    type: Type.STRING(140),
    allowNull: true,
  },
  type: {
    type: Type.STRING(),
    allowNull: false,
  },
});

export default Request;
