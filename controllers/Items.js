const mongoose = require("mongoose");

const Items = mongoose.model("Items");

exports.addItem = (req, res) => {
	let body = {
		lang: req.body.lang,
		group: req.body.group,
		items: [],
	};

	req.body.items.forEach((el) => {
		body.items.push({ type: el.type, products: el.products });
	});

	if (!body.lang || !body.group || !body.items.length) {
		return res.status(400).send({
			message: "Prosimo, izpolnite vsa polja!",
		});
	}

	let newItems = new Items({
		lang: body.lang,
		group: body.group,
		items: body.items,
	});

	newItems
		.save(newItems)
		.then(() => {
			res.status(201).send({
				message: "Izdelki so bili uspešno shranjeni!",
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).send({
				message: err,
			});
		});

	// Items.find({ group: group }).then((items) => {
	// 	if (!items.length) {
	// 		let newItems = new Items({
	// 			group: group,
	// 			products: item,
	// 		});

	// 		newItems
	// 			.save(newItems)
	// 			.then(() =>
	// 				res.status(201).send({
	// 					message: "Izdelek je bil uspešno dodan!",
	// 				})
	// 			)
	// 			.catch((err) => {
	// 				res.status(400).send({
	// 					message: err,
	// 				});
	// 			});
	// 	}
	// 	Items.findOneAndUpdate({ group: group }, { $push: { products: item } })
	// 		.then(() =>
	// 			res.status(201).send({
	// 				message: "Izdelek je bil uspešno dodan!",
	// 			})
	// 		)
	// 		.catch((err) => {
	// 			res.status(400).send({
	// 				message: err,
	// 			});
	// 		});
	// });
};

exports.removeItem = (req, res) => {
	Items.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(201).send({
				message: "Izdelek je bil uspešno odstranjen!",
			});
		})
		.catch((err) => {
			res.status(400).send({
				message: err,
			});
		});
};

exports.updateItem = (req, res) => {
	Items.findByIdAndUpdate(req.params.id)
		.then(() => {
			res.status(201).send({
				message: "Izdelek je bil uspešno posodobljen!",
			});
		})
		.catch((err) => {
			res.status(400).send({
				message: err,
			});
		});
};

exports.getItems = (req, res) => {
	Items.find({ lang: req.query.lang })
		.then((items) => {
			if (!items) {
				return res.status(400).send({
					message: "Izdelki niso bili najdeni!",
				});
			}

			let data = [];
			items.forEach((item) => {
				data.push(item.items);
			});
			// const groupBy = (key) => (array) =>
			// 	array.reduce((objectsByKeyValue, obj) => {
			// 		const value = obj[key];
			// 		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(
			// 			obj
			// 		);
			// 		return objectsByKeyValue;
			// 	}, {});

			// const groupByType = groupBy("type");
			// let salty = groupByType(items[0].products);
			// let sweet = groupByType(items[1].products);
			// let drinks = groupByType(items[2].products);

			res.json({
				data,
			});
		})
		.catch((err) => {
			res.status(400).send({
				message: err,
			});
		});
};

exports.getItem = (req, res) => {
	Items.findById(req.params.id)
		.then((item) => {
			if (!item) {
				return res.status(400).send({
					message: "Izdelek ni bil najden!",
				});
			}
			res.json({
				item,
			});
		})
		.catch((err) => {
			res.status(400).send({
				message: err,
			});
		});
};
