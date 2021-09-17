const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Item = {
	name: String,
	price: Number,
	type: String,
	imgSrc: String,
};

const Items = new Schema({
	lang: String,
	group: String,
	items: Array,
});

mongoose.model("Items", Items);
