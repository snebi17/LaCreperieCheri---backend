const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Item = new Schema({
    name: String,
    price: Number,
    type: String,
    group: String,
    imgSrc: String
});

mongoose.model('Item', Item);
