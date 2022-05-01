const db = require('../models/index');
const Game = db.Game;

exports.gameList = async function (req, res) {
    await Game.findAll()
        .then(data => {
            console.log("All games:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.gameCreate = async function (req, res) {
    let game = Game.build({ name: req.body.name, description: req.body.description, cost: req.body.cost, memory: req.body.memory, platform: req.body.platform_id, category: req.body.category_id  })
    await game.save()
        .then(data => {
            console.log(game.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    // or user.create in one time
}

exports.gameUpdate = async function (req, res) {
    if (req.params.game > 0) {
        await Game.update(
            { name: req.body.name, description: req.body.description, cost: req.body.cost, memory: req.body.memory, platform: req.body.platform_id, category: req.body.category_id},
            { where: { game_id: req.params.game_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Game not found' })
}

exports.gameDelete = async function (req, res) {
    if (req.params.game_id) {
        await Game.destroy({ where: { game_id: req.params.dgame_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Game not found' })
}

exports.gameFindOne = async function (req, res) {
    if (req.params.game_id) {
        await Game.findOne({ where: { game_id: req.params.game_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Game not found' })
}

const { Op } = require("sequelize");
exports.gameFindOp = async function (req, res) {
    await Game.findAll({
        where: {
            game_id:
                { [Op.gt]: 2, [Op.lt]: 9 }
        }
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.gameOrder = async function (req, res) {
    await Game.findAll({ order: ['name'] })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}