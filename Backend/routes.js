let express = require('express');
let router = express.Router();

// Import user controller
const categoryController = require('./controllers/categoryController');
const gameController = require('./controllers/gameController');
const platformController = require('./controllers/platformController');

// initial route
router.get('/', (req, res) => res.redirect('/games'));

// games routes
router.get('/games', gameController.gameList);
router.post('/game', gameController.gameCreate)
router.put('/game/:game_id', gameController.gameUpdate);
router.delete('/game/:game_id', gameController.gameDelete);
router.get('/game/:game_id', gameController.gameFindOne);
router.get('/game/filter', gameController.gameFindOp);

// category routes 
router.get('/categories', categoryController.categoryList);
router.post('/category', categoryController.categoryCreate)
router.put('/category/:category_id', categoryController.categoryUpdate);
router.delete('/category/:category_id', categoryController.categoryDelete);
router.get('/category/:category_id', categoryController.categoryFindOne);
router.get('/category/filter', categoryController.categoryFindOp);
router.post('/category/addGame/:category_id', categoryController.categoryAddGame);

// category routes 
router.get('/platforms', platformController.platformList);
router.post('/platform', platformController.platformCreate)
router.put('/platform/:platform_id', platformController.platformUpdate);
router.delete('/platform/:platform_id', platformController.platformDelete);
router.get('/platform/:platform_id', platformController.platformFindOne);
router.get('/platform/filter', platformController.platformFindOp);
router.post('/platform/addGame/:platform_id', platformController.platformAddGame);


module.exports = router;