var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require("express-session");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'node_modules'))); //indev
app.use('/pic', express.static('/my/pic')); //indev


const MongoSessionStore = require("connect-mongo")(session);
var connect = require("gg/dbs/mongo/connect.js"); //cc
var mongoSessionStoreOption ={
    dbPromise: connect.pool.getDb('gg'),
    collection: 'session', // actually this is default.
};
var sessionOpt = {
    secret: 'o/this-is-key-board#secreat@number0906',
    store: new MongoSessionStore(mongoSessionStoreOption),
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOpt));


//var index = require('./routes/index');
//var users = require('./routes/users');
//app.use('/', index);
//app.use('/users', users);


// before all routes
app.get('/before', function(req, res){
    res.end(`<h1> before all routes</h1><h2> ${Date()} </h2>`);
});


// filter out bad requests, many from North Korea, China
const filter = require("ip.path.403");
const opt = {
    patterns: [/54.168.214.184/, 
    /pma20/i, /phpmyadmin/i, /phpmanager/i,
    /myadmin/i, /\.php/i
    ],
};
app.use(filter(opt));


// // sys value
// const sysvalue = require("./thumbs.value.route/sysvalue.js");
// app.use('/sysvalue', sysvalue);
// const sysvalue = require("ui.vv/srv.express/thumbs.value/sysvalue.js");

// use the package aftern a couple of: npm link 
// ~/workspace/ui.vv/srv.express/thumbs.value
const sysvalue = require("thumbs.value/sysvalue.js");
app.use('/sysvalue', sysvalue);

// simple response to check routing ok.
app.get('/after', function(req, res){
    if(req.session){
        req.session.foo = 'foo';
        console.log(req.session);
    }
    res.end(`<h1> after, ${Date()} </h1><h2>session: ${req.session.toString()}</h2>`);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
