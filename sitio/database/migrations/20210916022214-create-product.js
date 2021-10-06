'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description:{
        type: Sequelize.STRING(500)
      },
      price:{
        type: Sequelize.DECIMAL(6,2)

      },
      categoryId:{
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName:"Categories"
          },
          key:"id"
        }
      },
      createdAt: {
        
        type: Sequelize.DATE
      },
      updatedAt: {
        
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};