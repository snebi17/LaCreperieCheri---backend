const router = require('express').Router();
const itemController = require('../controllers/Items');

module.exports = itemRouter => {
    itemRouter.use((req, res, next) => {
        res.header(
            // 'Access-Control-Allow-Headers',
            'Content-Type', 'application/xxx-form-urlencoded'
        );
        next();
    })

    router.post('/', itemController.addItem);
    
    router.delete('/:id', itemController.removeItem);

    router.put('/:id', itemController.updateItem);

    router.get('/', itemController.getItems);

    router.get('/:id', itemController.getItem);

    itemRouter.use('/api/items', router);
};