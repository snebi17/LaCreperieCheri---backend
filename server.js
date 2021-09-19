const express = require("express");
const server = express();
const URL = process.env.URL || "http://192.168.125.28";
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const axios = require("axios");

const cors = require("cors");

server.use(cors({ origin: `${URL}:8080` }));
axios.defaults.baseURL = "http://192.168.125.28:4000";

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

require("./models/db");
require("./routes/Items")(server);
require("./routes/Orders")(server);

server.listen(PORT);
