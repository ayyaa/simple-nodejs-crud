const express = require('express');
const router = express.Router();
const config = require('../config');
const async = require('async');
const moment = require('moment');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const alert = require('alert-node');
const expressValidator = require('express-validator');
const validateJoi = require('./joi-validate/joi-reset-password');
const Sequelize = require('sequelize');
const users = require('./sequelize/models/seq-users');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/confirm/:token', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/home')
  } else {
    users.findAll({
      where: {
        confirm_token: [req.params.token]
      }
    })
    .then(rows => {
      if (rows.length <= 0) {
        req.flash('error', 'confirm reset token is invalid.');
        return res.redirect('/login');
      }

      res.render('confirm_password', {val_user: rows[0].user, val_email: rows[0].email});
    })
    .catch(() => {
      
    })
  }
});

router.post('/confirm/:token', function(req, res) {
  validateJoi.validate({pass: req.body.password, confirm: req.body.confirm}, function(errors, value) {
    if (!errors) {
      console.log(req.body.password);
      console.log(req.body.confirm);
      if (req.body.password != req.body.confirm) {
        req.flash('error', 'Password and confirm does not match.');
        res.render('confirm_password', {'error': req.flash('error'), val_user: req.body.user, val_email: req.body.email})
      } else {
        async.waterfall([
          function(done) {
            users.findAll({
              where: {
                confirm_token: [req.params.token]
              }
            })
            .then(function(rows) {
              if(rows.length <= 0) {
                req.flash('error', 'Confirm password token is invalid.');
                return res.redirect('/forgot');
              }

              var newPassword = config.salt.value+''+req.body.password;

              var email = rows[0].email;
              users.update({
                password: Sequelize.fn('sha1', newPassword),  
                confirm_token: null
                },
                { where: {
                  email: [email]
                }
              })
              .then(function(rows, err) {
                if (err) throw err;

                users.findAll({
                  where: {
                    email: [email]
                  }
                })
                .then(function(rows, err) {
                  done(err, rows);
                })
              })
            })
          },
          function(rows, done) {
            var mailOptions = {
              to: rows[0].email,
              from: config.message.from,
              subject: config.message.subject_new_password,
              text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + rows[0].email + ' has just been changed.\n\n' +
                'Your Username is '+rows[0].user+'\n\n' +
                'Your Password is '+req.body.password
            };

            sgMail.send(mailOptions, function(err) {
              console.log(mailOptions);

              users.findOne({
                where: {
                  user: [req.body.user]
                },
                attributes: ['id', 'user', 'password']
              })
              .then(function(user) {
                req.login(user, function(err) {
                  if (err) {
                    req.flash('error', err.message);
                    return res.redirect('back');
                  }
                  req.flash('info', 'Congratulations, you successfully registered');
                  res.redirect('/home');
                  done(err, 'done');
                })
              })
            });
          }
        ]);
      }
    } else {
      req.flash('error', errors);
      res.render('confirm_password',{'error' :req.flash('error'), val_user: req.body.user, val_email: req.body.email});
    }
  })
});

module.exports = router;
