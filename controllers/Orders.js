const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.addOrder = (req, res) => {
    let order = {
        items: req.body.items
    }

    if (!order.items || order.items.length == 0) {
        return res.status(400).send({
            message: 'Naročiti morate vsaj en izdelek'
        });
    }

    let newOrder = new Order({
        items: order.items
    });

    newOrder.save(newOrder)
        .then(() => {
            res.status(201).send({
                message: 'Naročilo je bilo oddano.'
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err
            })
        });
}

exports.getOrders = (req, res) => {
    Order.find()
        .then(orders => {
            if (!orders) {
                return res.status(201).send({
                    message: 'Naročila niso bila najdena!'
                });
            }
            res.json({
                orders
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err
            });
        });
}

exports.getOrder = (req, res) => {
    Order.findById(req.params.id)
    .then(order => {
        if (!order) {
            return res.status(201).send({
                message: 'Naročilo ni bil najdeno!'
            });
        }
        console.log(order);
        res.json({
            order
        });
    })
    .catch(err => {
        res.status(400).send({
            message: err
        });
    });
}