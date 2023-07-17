const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const methodOverride = require('method-override');
const session = require('express-session');
const connectFirebase = require('./firebase');
require('dotenv').config();

const app = express();
const db = connectFirebase()

//Use session to save login data
app.use(session({
    secret: "The Next Generation API",
    resave: true,
    saveUninitialized: true
}))

// Middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended : false }))

const user = require('./routes/user.routes');
const product = require('./routes/producto.routes');

app.use('/', user);
app.use('/api', product);

module.exports = app;
