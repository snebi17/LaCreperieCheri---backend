const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Item = new Schema({
    name: String,
    type: String,
    price: Number,
    imgSrc: String
});

mongoose.model('Item', Item);
