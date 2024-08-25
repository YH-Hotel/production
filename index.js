require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/database/index");
const { createProxyMiddleware } = require('http-proxy-middleware');

let port = process.env.PORT || 3030;

const app = express();

app.use(cors());

const router = require("./src/routes/index");

app.use(express.json());
connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

app.get("/", (req, res, next) => {
  res.send("API Works");
});

app.listen(port, () => {
  console.log(`Server is Running at port ${port}`);
});
