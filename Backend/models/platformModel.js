const Sequelize = require('sequelize')
const db = require('../db.js')

const Platform = db.define('platform', {
    platform_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: true },
})

module.exports = Platform