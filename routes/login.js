const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}), function(req, res, next) {
  var user = req.body.username;
  if (!req.body.rememberme) { 
    return next(); 
  }

  var token = utils.generateToken(64);
  Token.save(token, { userId: req.user.id }, function(err) {
    if (err) { return done(err); }
    res.cookie('remember_me', token, { path: '/home', httpOnly: true, maxAge: 604800000 }); // 7 days
    return next();
  });
}, function(req, res) {
  res.redirect('/home');
});

router.get('/',  function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/home')
  } else {
    res.render('login',{'message' :req.flash('message')});
  }
});

module.exports = router;
