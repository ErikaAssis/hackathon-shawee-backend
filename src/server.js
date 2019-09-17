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
mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@shawee-q6zn9.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT);
