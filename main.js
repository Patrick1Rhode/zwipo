var express = require("express");
var app = express();
var curl = require('curlrequest');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var path = require('path')
var ejs = require("ejs");
var r = require("rethinkdbdash")();
var token;

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs");


//var indexp = require(__dirname+"/routes/index.js");
var realtimep = require(__dirname+"/routes/realtime.js");
var userlikesp = require(__dirname+"/routes/user.js");
var registerp = require(__dirname+"/routes/register.js");
var checkbalancep = require(__dirname+"/routes/check.js");
var withdrawp = require(__dirname+"/routes/withdraw.js");
var loginp = require(__dirname+"/routes/login.js");




//passport patrick code

// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: '623759824451288',
    clientSecret: '10b60f74b771f37a17c358348aa9510a',
    callbackURL: 'http://localhost:8000/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    token = accessToken;
    console.log(token);
    return cb(null, profile,accessToken);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
    //curl function gettng facebook likes
       var options = {
    url:  "https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Clikes&access_token="+user.facebook.token
  , verbose: true
  , stderr: true
};

curl.request(options, function (err, data) {
    console.log(data);
    //..
});
    //end
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_location'] }));

app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
});
//end
//patrick url views
//app.use("/index",indexp);
app.use("/withdraw",withdrawp);
app.use("/user",userlikesp);
app.use("/checkbalance",checkbalancep);
app.use("/register",registerp);
app.use("/realtime",realtimep);
app.use("/login",loginp);
app.use(express.static(__dirname + '/css'));
//end
app.listen(8000,function(erro,su){
    if(erro){
        console.log("error server not started");
    }
    else{
        console.log("server started");
    }
});
