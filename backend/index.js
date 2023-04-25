const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
//const mongoDbService = require('./api/services/mongoDbService');
const userRouter = require('./api/routes/userRoute');
const productRouter = require('./api/routes/productRoute');
const orderRouter = require('./api/routes/orderRoute');

require('dotenv').config();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  next();
});

app.listen(3000, function() {
	console.log('Servern igång på port 3000');
});

app.get('/', function(req, res) {
	res.send('<h1>Hello från Express!</h1>');
});

/*  mongoDbService.init().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
}); */

const MongoClient = require("mongodb").MongoClient;  
require('dotenv').config();

MongoClient.connect("mongodb://127.0.0.1:27017/api", {
    useUnifiedTopology: true
})
.then(client => {
    console.log("Uppkopplad mot databasen");

    const db = client.db("camilla-ridesjo");
    app.locals.db = db;
})
.catch(err => console.log("err", err))
