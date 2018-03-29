const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const Joi = require('joi');

const crypto = require('crypto')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sess = require('express-session');
const Store = require('express-session').Store;
const BetterMemoryStore = require('session-memory-store')(sess);
const flash = require('express-flash');
const remember_me = require('passport-remember-me');
const RememberMeStrategy = require('passport-remember-me').Strategy;
const async = require('async');

const mysql = require('mysql');
const myConnection  = require('express-myconnection');
const config = require('./config');

const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const login = require('./routes/login');
const forgot_password = require('./routes/forgot_password');
const reset_password = require('./routes/reset_password');
const index = require('./routes/index');
const users = require('./routes/users');
const statistic = require('./routes/statistic');
const add_student = require('./routes/add_student');
const student_list = require('./routes/student_list');
const update_student = require('./routes/update_student');
const delete_student = require('./routes/delete_student');

const store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });

const app = express();

const dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port, 
    database: config.database.db
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.locals.moment = require('moment');
app.locals.script = require('./public/javascripts/scripts');

app.use(myConnection(mysql, dbOptions, 'pool'));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(expressValidator());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sess({
  name: 'JSESSION',
  secret: 'MYSECRETISVERYSECRET',
  store:  store,
  resave: true,
  saveUninitialized: true 
}));

passport.use(new RememberMeStrategy(
  function(token, done) {
    Token.consume(token, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  },
  function(user, done) {
    var token = utils.generateToken(64);
    Token.save(token, { userId: user.id }, function(err) {
      if (err) { return done(err); }
      return done(null, token);
    });
  }
));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to call back
} , function(req, username, password, done) {
  req.getConnection(function(error, conn){
    if (!username || !password ) { 
      return done(null, false, req.flash('message','all fields are required')); 
    }
    var salt = config.salt.value;
    var sql = "select * from user where user = ?";
    conn.query(sql, [username], function(err, rows) {
      console.log(err); console.log(rows);
      console.log(rows[0]);

      if (err) return err;
      if (!rows.length) { 
        return done(null, false, req.flash('message','Invalid username or password.')); 
      }
      
      salt = salt+''+password;
      var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
      var dbPassword  = rows[0].password;

      if (!(dbPassword == encPassword)) {
        return done(null, false, req.flash('message','Invalid username or password.'));
      }
      return done(null, rows[0]);
    });
  });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(req, id, done) {
  req.getConnection(function(error, conn){
    var sql = "select * from user where id = ? ";
    conn.query(sql, [id], function (err, rows){
        done(err, rows[0]);
    });
  });
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

app.get('/logout', function(req, res) {
  if(!req.isAuthenticated()){
    notFound404(req, res, next);
  } else {
    req.logout();
    res.redirect('/');
  }
})

app.use('/', login);
app.use('/', forgot_password);
app.use('/', reset_password);

app.use('/', isAuthenticated, index);
app.use('/', isAuthenticated, statistic);
app.use('/', isAuthenticated, add_student);
app.use('/', isAuthenticated, student_list);
app.use('/', isAuthenticated, users);
app.use('/', isAuthenticated, update_student);
app.use('/', isAuthenticated, delete_student);


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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
