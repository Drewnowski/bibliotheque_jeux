const db = require('../models/index');
const Game = db.Game;
const Platform = db.Platform;

exports.platformList = async function (req, res) {
    await Platform.findAll({ include: [{model: Game, as:'games'}] })
        .then(data => {
            console.log("All categories:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.platformCreate = async (req, res) => {
    let platform = Platform.build({ name: req.body.name, description: req.body.description })
    await platform.save()
        .then(data => {
            console.log(platform.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    // or user.create in one time
}

exports.platformUpdate = async function (req, res) {
    if (req.params.platform_id > 0) {
        await Platform.update(
            { name: req.body.name, description: req.body.description },
            { where: { platform_id: req.params.platform_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Platform not found' })
}

exports.platformDelete = async function (req, res) {
    if (req.params.platform_id) {
        await Platform.destroy({ where: { platform_id: req.params.platform_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Platform not found' })
}

exports.platformFindOne = async function (req, res) {
    if (req.params.platform_id) {
        await Platform.findOne({ where: { platform_id: req.params.platform_id }, include: {model: Game, as:'games'} })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Platform not found' })
}
exports.platformAddGame = async function (req, res) {
    if (req.params.platform_id) {
        await Platform.findOne({ where: { platform_id: req.params.platform_id } })
            .then(platform => {
                platform.addGame(req.body.game_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Platform not found' })
}

const { Op } = require("sequelize");
exports.platformFindOp = async function (req, res) {
    if (req.params.name) {
        await Platform.findAll({
            where: {name:{ [Op.startsWith]: req.params.name}}})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Bad input' })
}
/*
exports.platformUpdate = async function (req, res) {
    if (req.params.platform_id > 0) {
        await Platform.update(
            { name: req.body.name }, 
            { where: { platform_id: req.params.platform_id } }
            )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Platform not found' })
}

exports.platformDelete = async function (req, res) {
    if (req.params.platform_id) {
            await Platform.destroy({ where: { platform_id: req.params.platform_id } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: 'Platform not found'})
}

exports.platformFindOne = async function (req, res) {
    if (req.params.platform_id) {
        await Platform.findOne({ where: { platform_id: req.params.platform_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Platform not found' })
}

exports.platformFindOp = async function (req, res) {
    await Platform.findAll({ 
        where: { platform_id : 
            { [Op.gt]:2, [Op.lt]:9 }
        } } )
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}
*/