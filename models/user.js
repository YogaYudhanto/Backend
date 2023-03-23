'use strict';
const {hashPassword} = require('../helpers/bcyrpt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: 'userId'})
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {msg: 'name is required'},
        notNull: {msg: 'name is required'},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email is already exist'
      },
      validate: {
        notEmpty: {args: true, msg: 'email is required'},
        notNull: {args: true, msg: 'email is required'},
        isEmail: {args: true, msg: 'please input the correct email format!'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'password is required'},
        notNull: {msh: 'password id required'},
        len: {
          args: [4],
          msg: 'password must be at least 4 characters long'
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'age is required'},
        notNull: {msg: 'age is required'},
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'gender is required'},
        notNull: {msg: 'gender is required'},
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'address is required'},
        notNull: {msg: 'address is required'},
      }
    },
  },
    {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: (e) => {
        e.password = hashPassword(e.password);
        },
      },
    }
  );
  return User;
};