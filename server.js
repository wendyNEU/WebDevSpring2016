var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
/*
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
*/

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.use(multer());
app.use(session({ secret: process.env.PASSPORT_SECRET,resave: true, saveUninitialized: true}));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
*/

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app);


