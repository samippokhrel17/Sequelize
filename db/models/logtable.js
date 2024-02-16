'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logTable.init({
    url: DataTypes.STRING,
    timestamp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'logTable',
  });
  return logTable;
};