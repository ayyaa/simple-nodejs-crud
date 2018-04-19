const express = require('express');
const router = express.Router();
const passport = require('passport');
const Sequelize = require('sequelize');
const users = require('./sequelize/models/seq-users');
var twoFactor = require('node-2fa');

// router.post('/signin', passport.authenticate('local', {
//   // successRedirect: '/home',
//   failureRedirect: '/',
//   failureFlash: true
// }), function(req, res) {
//   users.findOne({
//     attributes: ['user','status_two_fa'],
//     where: {
//       user: req.user.user
//     }
//   })
//   .then(function(rows) {
//     console.log(rows.dataValues.status_two_fa)
//     if (rows.dataValues.status_two_fa === 'disable') {
//       req.flash('info', 'Welcome, '+ req.user.user+ ' you successfully login');
//       res.redirect('/home');
//     } else {
//       res.render('confirm-two-factor', {val_user: rows.dataValues.user})
//     }
//   })
//   res.render('confirm-two-factor', {val_user: req.user.user});
//   // req.flash('info', 'Welcome, '+ req.user.user+ ' you successfully login');
//   // res.redirect('/home');
// });

router.get('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    users.findOne({
      attributes: ['user','status_two_fa'],
      where: {
        user: req.query.username
      }
    })
    .then(function(rows) {
      if (rows.dataValues.status_two_fa === 'disable') {
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          req.flash('info', 'Welcome, '+ req.user.user+ ' you successfully login');
          return res.redirect('/home');
        });
      } else {
        req.flash('username',req.query.username)
        res.redirect('/two-fa')
        // res.render('confirm-two-factor', {val_user: rows.dataValues.user})
      }
    })
  })(req, res, next);
});

router.get('/two-fa', function(req, res, next) {
  var user = req.flash('username');
  res.render('confirm-two-factor', {username : user.toString()});
})

// router.get('/signin', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     console.log(req.query.username)
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     users.findAll({
//       where: {
//         username: req.query.username
//       }
//     }).then(function(rows) {
//       console.log(rows[0].two_fa)
//       if (rows[0].two_fa == 'disable') {
//         req.logIn(user, function(err) {
//           if (err) { return next(err); }
//           req.flash('info', 'Hi ' + req.user.username + ', You successfully logged in')  
//           return res.redirect('/' );
//         });
//       } else {
//         req.flash('username',req.query.username)
//         res.redirect('/two_fa/')
//       }
//     })
//   })(req, res, next);
// });

router.post('/confrim-two-factor', function(req, res, next) {
  users.findOne({
    attributes: ['user', 'secret_code', 'url_qr', 'status_two_fa'],
    where: {
      user: [req.body.username]
    }
  })
  .then(function (rows) {
    console.log(rows.dataValues.secret_code);
    console.log(req.body.security);
    console.log(rows.dataValues.status_two_fa);

    var newToken = twoFactor.generateToken(rows.dataValues.secret_code);
    var status = twoFactor.verifyToken(rows.dataValues.secret_code, req.body.security);
    console.log(newToken.token);
    console.log(status);

    if (status === null ) {
      req.flash('error', 'try again !');
      res.render('confirm-two-factor', {'error': req.flash('error'), val_user: req.body.username});
    } else  {
      users.findOne({
        attributes: ['user', 'secret_code', 'url_qr', 'status_two_fa'],
        where: {
          user: req.body.username
        }
      })
      .then(function(user) {
        req.login(user, function (err) {
          if (err) {
            req.flash('error', err.message);
            return res.redirect('back');
          }
          req.flash('info', 'Welcome, '+ req.user.user+ ' you successfully login');
          res.redirect('/home');
        })
      })
    }
  })
  .catch(function(error) {
    req.flash('error', 'try again !');
    res.render('confirm-two-factor', {'error': req.flash('error'), username: req.body.username});
  })
});

router.get('/',  function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/home')
  } else {
    res.render('login',{'message' :req.flash('message')});
  }
});

module.exports = router;
