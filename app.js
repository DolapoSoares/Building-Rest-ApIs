const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config()

//db
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true }).then(() => console.log('DB connected'))

mongoose.connection.on('error' , err => {
    console.log(`DB connection error : ${err.message}`)
});

const postRoutes = require('./routes/post');


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/' , postRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`A node on port: ${port}`)
});