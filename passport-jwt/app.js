const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const route= require('./userRoute/userRoute')

//database connection
require('./config/database');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(passport.initialize());

require('./config/passport')(passport);

//home route
app.get("/", (req, res)=>{
    res.send("<h1> welcome to home </h1>")
});

//user route
app.use('/user',route);

//url not found
app.use((req, res, next)=>{
    res.status(404).json({
        message: "route not found"
    })
});

//server error
app.use((err, req, res, next)=>{
    res.status(500).json({
        message: "server not found"
    })
});

module.exports = app;