const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://tasks.scloud.vn/',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, PATCH, DELETE, POST"
}

app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Origin", "http://tasks.scloud.vn/");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', require('./src/v1/routes'));

module.exports = app;
