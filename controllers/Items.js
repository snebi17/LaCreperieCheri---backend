const mongoose = require('mongoose');

const Items = mongoose.model('Items');

exports.addItem = (req, res) => {
    let group = req.body.group; 

    let item = {
        name: req.body.name,
        price: req.body.price,
        type: req.body.type
    }

    if (!group || !item.name || !item.price || !item.type) {
        return res.status(400).send({
            message: 'Prosimo, izpolnite vsa polja!'
        });
    }

    Items.find({ 'group': group })
        .then(items => {
            if (!items.length) {
                let newItems = new Items({
                    group: group,
                    products: item
                });

                newItems.save(newItems)
                    .then(() => res.status(201).send({
                        message: 'Izdelek je bil uspešno dodan!'
                    }))
                    .catch(err => {
                        res.status(400).send({
                            message: err
                        });
                    });
            }
            Items.findOneAndUpdate({ 'group': group }, { $push: { products: item }})
                .then(() => res.status(201).send({
                    message: 'Izdelek je bil uspešno dodan!'
                }))
                .catch(err => {
                    res.status(400).send({
                        message: err
                    });
                });
        })
}

exports.removeItem = (req, res) => {
    Items.findByIdAndDelete(req.params.id) 
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
    Items.findByIdAndUpdate(req.params.id)
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
    Items.find()
        .then(items => {
            if (!items) {
                return res.status(400).send({
                    message: 'Izdelki niso bili najdeni!'
                });
            }
        const groupBy = key => array =>
            array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {});

            const groupByType = groupBy('type');
            let salty = groupByType(items[0].products);
            let sweet = groupByType(items[1].products);
            // let drinks = groupByType(items[2].products);

            res.json({
                sweet,
                salty
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err
            });
        });
}

exports.getItem = (req, res) => {
    Items.findById(req.params.id)
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