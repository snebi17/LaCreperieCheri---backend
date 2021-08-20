const mongoose = require('mongoose');
// const Item = mongoose.model('Item');

const Schema = mongoose.Schema;

const Order = new Schema({
    items: Array,
    dateCreated: Date
});

mongoose.model('Order', Order);
