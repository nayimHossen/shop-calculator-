const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//ROUTE IMPORT
const productRoute = require("./routes/productRoute");

app.use("/api/v1", productRoute);

module.exports = app;
