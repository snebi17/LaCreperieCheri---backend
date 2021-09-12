const mongoose = require('mongoose');

const Item = mongoose.model('Item');

exports.addItem = (req, res) => {
    console.log(req.body);
    let item = {
        name: req.body.name,
        price: req.body.price,
        type: req.body.type
    }

    if (!item.name || !item.price || !item.type) {
        return res.status(400).send({
            message: 'Prosimo, izpolnite vsa polja!'
        });
    }

    let newItem = new Item({
        name: item.name,
        price: item.price,
        type: item.type
    });

    newItem.save(newItem)
        .then(() => res.status(201).send({
            message: 'Izdelek je bil uspešno dodan!'
        }))
        .catch(err => {
            res.status(400).send({
                message: err
            });
        });
}

exports.removeItem = (req, res) => {
    Item.findByIdAndDelete(req.params.id) 
        .then(() => {
            res.status(201).send({
                message: 'Izdelek je bil uspešno odstranjen!'
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err
            });
        });
}

exports.updateItem = (req, res) => {
    Item.findByIdAndUpdate(req.params.id)
        .then(() => {
            res.status(201).send({
                message: 'Izdelek je bil uspešno posodobljen!'
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err
            });
        })
}

exports.getItems = (req, res) => {
    Item.find()
        .then(items => {
            if (!items) {
                return res.status(400).send({
                    message: 'Izdelki niso bili najdeni!'
                });
            }
            res.json({
                items
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err
            })
        });
}

exports.getItem = (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            if (!item) {
                return res.status(400).send({
                    message: 'Izdelek ni bil najden!'
                });
            }
            res.json({
                item
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err
            })
        });
}