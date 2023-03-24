var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

var app = express();

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", {
    useUnifiedTopology: true
})
.then(client => {
    console.log("Uppkopplad mot databasen");

    const db = client.db("camilla-ridesjo");
    app.locals.db = db;
})
.catch(err => console.log("err", err))

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
//app.use('/api/products', productsRouter);
//app.use('/api/orders', ordersRouter);

app.get('/rooten', function(req, res) {
    res.send('i rooten');
  });

app.use((req, res, next) => {
    const error = new Error('Something went wrong!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
