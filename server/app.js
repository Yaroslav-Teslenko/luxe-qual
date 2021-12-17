/* eslint-disable no-undef */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const cookieParser = require("cookie-parser");

const router = require("./routes/index");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static(`${__dirname}/uploads`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(router);
const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startApp();
