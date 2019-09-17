const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

/**
 * Database setup
 */
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
// app.use(cors());
app.use(routes);

app.listen(PORT);
