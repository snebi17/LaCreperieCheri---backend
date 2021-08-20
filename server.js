const express = require("express");
const app = express();
const axios = require("axios");
const fs = require("fs");
const jsdom = require("jsdom");

const cors = require("cors");

app.use(cors());

const PORT = 4000;

require("./models/db");
require("./routes/Items");
require("./routes/Orders");

app.get("/menu", (req, res, next) => {
	let products = require("./data/products.json");
	res.json(products);
});

// var data = {};
// data.items = [];

// app.get('/', (req, res, next) => {
//     axios.get('https://www.lacreperie-cheri.si')
//     .then(res => {
//         data.items.push(res.data);

//         fs.writeFile('./data/page.json', JSON.stringify(data.items), function(err) {
//             if (err) throw err;
//         });
//     })
//     .catch(err => {
//         // Handle error...
//     });
//     res.send(`Hello to API on port ${PORT}! ${req}`)
// });

// const menu = require('./data/page.json');

// app.get('/menu', (req, res, next) => {
//     var dom = new jsdom.JSDOM(menu);

//     var items = [];

//     let ime = '';
//     let cena = 0.00;
//     let ID = 0;

//     Array.from(dom.window.document.getElementsByClassName('sladkeCol')[0].getElementsByClassName('card')).forEach(el => {
//         Array.from(el.children).forEach(el_ => {
//             Array.from(el_.children).forEach((el__) => {
//                 Array.from(el__.children).forEach((el___) => {
//                     if (el___.querySelector('p')) {
//                         ime = (el___.querySelector('p').innerHTML.includes('&amp;')) ? el___.querySelector('p').innerHTML.trim().replace(/&amp;/g, '&') : el___.querySelector('p').innerHTML.trim();
//                     }
//                     if (el___.querySelector('span')) {
//                         cena = el___.querySelector('span').innerHTML.trim();
//                     }
//                     items.push({
//                         id: ID,
//                         type: 'sladke',
//                         name: ime,
//                         price: cena,
//                     });
//                     ID++;
//                 });
//             });
//         });
//     });

//     Array.from(dom.window.document.getElementsByClassName('slaneCol')[0].getElementsByClassName('card')).forEach(el => {
//         Array.from(el.children).forEach(el_ => {
//             Array.from(el_.children).forEach((el__) => {
//                 Array.from(el__.children).forEach((el___) => {
//                     if (el___.querySelector('p')) {
//                         ime = (el___.querySelector('p').innerHTML.includes('&amp;')) ? el___.querySelector('p').innerHTML.trim().replace(/&amp;/g, '&') : el___.querySelector('p').innerHTML.trim();
//                     }
//                     if (el___.querySelector('span')) {
//                         cena = el___.querySelector('span').innerHTML.trim();
//                     }
//                     items.push({
//                         id: ID,
//                         type: 'slane',
//                         name: ime,
//                         price: cena,
//                     });
//                     ID++;
//                 });
//             });
//         });
//     });

//     Array.from(dom.window.document.getElementsByClassName('ostaloCol')[0].getElementsByClassName('card')).forEach(el => {
//         Array.from(el.children).forEach(el_ => {
//             Array.from(el_.children).forEach((el__) => {
//                 Array.from(el__.children).forEach((el___) => {
//                     if (el___.querySelector('p')) {
//                         ime = (el___.querySelector('p').innerHTML.includes('&amp;')) ? el___.querySelector('p').innerHTML.trim().replace(/&amp;/g, '&') : el___.querySelector('p').innerHTML.trim();
//                     }
//                     if (el___.querySelector('span')) {
//                         cena = el___.querySelector('span').innerHTML.trim();
//                     }
//                     items.push({
//                         id: ID,
//                         type: 'ostalo',
//                         name: ime,
//                         price: cena,
//                     });
//                     ID++;
//                 });
//             });
//         });
//     });

//     fs.writeFile('./data/items.json', JSON.stringify(items), function(err) {
//         if (err) throw err;
//     });

//     res.json(items);
// });

app.listen(PORT);
