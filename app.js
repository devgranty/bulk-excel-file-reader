const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const PORT  = process.env.PORT || 5000;

// import routes
const productRoutes = require('./routes/productRoutes');

// mount middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/v1/', [productRoutes]);

// start server and listen to port
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});