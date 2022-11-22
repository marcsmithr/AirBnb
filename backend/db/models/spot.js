'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsToMany(models.User, {through: models.Booking})
      Spot.belongsToMany(models.User, {through: models.Review})
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'})
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', onDelete: 'CASCADE', hooks:true})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isAlpha: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isAlpha: true
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isAlpha: true
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull:false,
      validate: {
        isNumeric: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull:false,
      validate: {
        isNumeric: true
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        isNumeric: true
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
