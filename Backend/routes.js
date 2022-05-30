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
router.get('/game/find/:game_id', gameController.gameFindOne);
// router.get('/game/filter', gameController.gameFindOp);
router.post('/game/addCategory/:game_id', gameController.gameAddCategory);
router.post('/game/addPlatform/:game_id', gameController.gameAddPlatform);
router.post('/game/removePlatform/:game_id', gameController.gameRemovePlatform);
router.post('/game/removeCategory/:game_id', gameController.gameRemoveCategory);

// category routes 
router.get('/categories', categoryController.categoryList);
router.post('/category', categoryController.categoryCreate);
router.put('/category/:category_id', categoryController.categoryUpdate);
router.delete('/category/:category_id', categoryController.categoryDelete);
router.get('/category/find/:category_id', categoryController.categoryFindOne);
router.get('/category/filter/:name', categoryController.categoryFindOp);
// router.post('/category/addGame/:category_id', categoryController.categoryAddGame);

// platforms routes 
router.get('/platforms', platformController.platformList);
router.post('/platform', platformController.platformCreate);
router.put('/platform/:platform_id', platformController.platformUpdate);
router.delete('/platform/:platform_id', platformController.platformDelete);
router.get('/platform/find/:platform_id', platformController.platformFindOne);
router.get('/platform/filter/:name', platformController.platformFindOp);
// router.post('/platform/addGame/:platform_id', platformController.platformAddGame);


module.exports = router;