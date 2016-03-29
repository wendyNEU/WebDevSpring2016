var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
/*
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
*/
var mongoose      = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
// connect to the database
var db = mongoose.connect(connectionString);

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

require("./public/assignment/server/app.js")(app,mongoose,db);
require("./public/project/server/app.js")(app);


