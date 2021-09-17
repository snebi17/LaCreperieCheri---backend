const express = require('express');
const server = express();
const URL = process.env.URL || 'http://localhost';
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const axios = require('axios');

const cors = require('cors');

server.use(cors({ origin: `${URL}:8080` }));
axios.defaults.baseURL = 'http://192.168.0.26:4000';

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

require('./models/db');
require('./routes/Items')(server);
require('./routes/Orders')(server);

// app.get('/menu', (req, res, next) => {
// 	let sweet = require(`./data/${req.query.lang}/sweet.json`);
// 	let salty = require(`./data/${req.query.lang}/salty.json`);
// 	let drinks = require(`./data/${req.query.lang}/drinks.json`);

// 	res.json({
// 		'sweet': sweet,
// 		'salty': salty,
// 		'drinks': drinks
// 	});
// });

server.listen(PORT);
