const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./routes/database.config');
require('dotenv').config();

// Initialize express.js
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Parse incoming request bodies in a middleware before handling elements
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Connect to Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,{ useNewUrlParser: true });

// Retrieve and print databases's store values at http://localhost:4000/showall
app.get('/showall', function(req,res) {
  MongoClient.connect(dbConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("credentials");
    dbo.collection("credentials").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
})

// Cofirm workings api
app.get('/', async (req, res, next) => {
  res.send({ message: 'It works' });
});

// Create /api.route and render api.route.js in this 
app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

// Initialize port and listen
const PORT = 4000;
app.listen(PORT, () => console.log(`@ http://localhost:${PORT}`));
