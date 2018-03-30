    // set up ======================================================================
    // get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var path = require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var engine       = require('consolidate');
var configDB = require('./server/config/database');

    // configuration ===============================================================
 mongoose.connect(configDB.url); // connect to our database

//var db = mongoose.connection;
var User = require('./server/models/user');


        // set up our express application
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json(({type: 'application/json', inflate: false})));
    app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms


        // required for passport
    app.use(session(
        {
          secret:'iloveindiachennai',
          resave:false,
          saveUninitialized:true
        })); // session secret


    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

      // pass .isAuthenticated to all the views
    app.use(function(req,res,next){
            //console.log(req.isAuthenticated());
            res.locals.isAuthenticated = req.isAuthenticated();
            res.locals.user = req.user;
            next();
        }) ;

        // route ======================================================================
        require('./server/route/routes')(app, passport); // load our route and pass in our app and fully configured passport
        require('./server/config/passport')(passport); // pass passport for configuration
        require('./server/models/upload')(app);



        app.use(express.static(__dirname +"/public"));
        app.set('views', __dirname + '/public/views');
        app.set('view engine', 'ejs'); // set up ejs for templating



    app.get('/registerData',function(req,res){
        User.find({},function(err,docs){
            res.json(docs);
        })

    });

        // launch ======================================================================
    app.listen(port);
    console.log('Listening on port ' + port);


