const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import user models
db.Game = require('../models/gameModel');
db.Category = require('../models/categoryModel');
db.Platform = require('../models/platformModel');

// games <=> categories
db.Game.belongsToMany(db.Category, {
    through: "linkCG",
    foreignKey: "game_id",
    as: "categories"
});
db.Category.belongsToMany(db.Game, {
    through: "linkCG",
    foreignKey: "category_id",
    as: "games"
});

// games <=> platforms
db.Game.belongsToMany(db.Platform, {
    through: "linkPG",
    foreignKey: "game_id",
    as: "platforms"
});
db.Platform.belongsToMany(db.Game, {
    through: "linkPG",
    foreignKey: "platform_id",
    as: "games"
});

module.exports = db