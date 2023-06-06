const express = require('express');
const app = express();
const path = require('path');
const formData = require("express-form-data");
const os = require("os");
require('dotenv').config();
const PORT  = process.env.PORT || 5000;

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true,
};

// import routes
const productRoutes = require('./routes/productRoutes');

// mount middlewares
app.use(express.json());
app.use(formData.parse(options));
app.use('/v1/', [productRoutes]);

// start server and listen to port
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});