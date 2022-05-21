const Sequelize = require('sequelize')
const db = require('../db.js')

const Game = db.define('game', {
    game_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: true },
    cost: { type: Sequelize.INTEGER, allowNull: true },
    memory: { type: Sequelize.INTEGER, allowNull: true} 
})

module.exports = Game