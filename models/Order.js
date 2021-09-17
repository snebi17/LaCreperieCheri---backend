const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
    items: Array,
    dateCreated: Date
});

mongoose.model('Order', Order);
