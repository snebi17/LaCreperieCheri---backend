const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Item = {
    name: String,
    price: Number,
    type: String,
    imgSrc: String,
    inventory: Number
}

const Items = new Schema({
    group: String,
    products: Array
});


mongoose.model('Items', Items);
