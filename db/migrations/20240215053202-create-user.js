"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Student", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      
      userType:{
        allowNull:false,
        type: Sequelize.ENUM,
        values:[
          'superUser',
          'user'
        ],
        default:'user'

      },
      status:{
        allowNull:false,
        type: Sequelize.ENUM,
        values:[
          '1',
          '2',
          '3'
        ],
        default:'3'

      }


    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Student");
  },
};
