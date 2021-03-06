const db = require('../models/index');
const Game = db.Game;
const Platform = db.Platform;
const Category = db.Category;

exports.gameList = async function (req, res) {
    await Game.findAll({ include: [{model: Platform, as:'platforms'},{model: Category, as:'categories'}] })
        .then(data => {
            console.log("All games:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.gameCreate = async (req, res) => {
    let game = Game.build({name: req.body.name, description: req.body.description, cost: req.body.cost, memory: req.body.memory})//{name: req.body.name, description: req.body.description, cost: req.body.cost, memory: req.body.memory}
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
    if (req.params.game_id > 0) {
        await Game.update({name: req.body.name, description: req.body.description, cost: req.body.cost, memory: req.body.memory, categories: req.body.categories, platforms: req.body.platforms},
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
        await Game.destroy({ where: { game_id: req.params.game_id } })
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
        await Game.findOne({ where: { game_id: req.params.game_id }, include: [{model: Platform, as:'platforms'},{model: Category, as:'categories'}] })//, include: Platform, include:Category 
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}

exports.gameAddPlatform = async function (req, res) {
    if (req.params.game_id) {
        await Game.findOne({ where: { game_id: req.params.game_id } })
            .then(game => {
                game.addPlatform(req.body.platform_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Game not found' })
}
exports.gameRemovePlatform = async function (req, res) {
    if (req.params.game_id) {
        await Game.findOne({ where: { game_id: req.params.game_id } })
            .then(game => {
                game.removePlatform(req.body.platform_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Game not found' })
}

exports.gameAddCategory = async function (req, res) {
    if (req.params.game_id) {
        await Game.findOne({ where: { game_id: req.params.game_id } })
            .then(game => {
                game.addCategory(req.body.category_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Game not found' })
}
exports.gameRemoveCategory = async function (req, res) {
    if (req.params.game_id) {
        await Game.findOne({ where: { game_id: req.params.game_id } })
            .then(game => {
                game.removeCategory(req.body.category_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Game not found' })
}


const { Op } = require("sequelize");
exports.gameFindOp = async function (req, res) {
    await Game.findAll({
where: {name:{ [Op.like]: 'Gothic 1'}}})//[Op.gt]: 2, [Op.lt]: 9//[Op.startsWith]: 'Got'include: [{model: Platform, as:'platforms'},{model: Category, as:'categories'}]
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}
