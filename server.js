const express = require("express");
const server = express();
const URL = process.env.URL || "http://localhost";
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const axios = require("axios");

const cors = require("cors");

server.use(cors({ origin: `${URL}:8080` }));
axios.defaults.baseURL = "http://localhost:4000";

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

require("./models/db");
require("./routes/Items")(server);
require("./routes/Orders")(server);

server.listen(PORT);
