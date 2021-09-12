const router = require('express').Router();
const orderController = require('../controllers/Orders');

module.exports = orderRouter => {
    orderRouter.use((req, res, next) => {
        res.header(
            // 'Access-Control-Allow-Headers',
            'Content-Type', 'application/json'
        );
        next();
    })

    router.post('/', orderController.addOrder);
    
    router.get('/', orderController.getOrders);

    router.get('/:id', orderController.getOrder);

    orderRouter.use('/api/orders', router);
};