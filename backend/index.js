const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const mongoDbService = require('./api/services/mongoDbService');
const userRouter = require('./api/routes/userRoute');
const productRouter = require('./api/routes/productRoute');
//const categoryRouter = require('./api/routes/categoryRoute');
const orderRouter = require('./api/routes/orderRoute');

require('dotenv').config();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
//app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  next();
});

/* mongoDbService.init().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
});

 */