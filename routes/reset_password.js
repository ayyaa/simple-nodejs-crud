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

router.get('/reset/:token', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/home')
  } else {
    users.findAll({
      where: {
        reset_password_token: req.params.token
      }
    })
    .then(rows => {
      if (rows.length <= 0) {
        req.flash('error', 'Password reset token is invalid.');
        return res.redirect('/forgot');
      }

      var validTime = moment().diff(rows[0].reset_password_expires , 'minute');

      if (validTime > 30) {
        req.flash('error', 'Password reset token has expired.');
        return res.redirect('/forgot');
      }

      res.render('reset', {val_user: rows[0].user, val_token: req.params.token});
    })
    .catch(() => {
      
    })
  }
});

router.post('/reset/:token', function(req, res) {
  validateJoi.validate({pass: req.body.password, confirm: req.body.confirm}, function(errors, value) {
    if (!errors) {
      console.log(req.body.password);
      console.log(req.body.confirm);
      if (req.body.password != req.body.confirm) {
        alert('Password and confirm does not match.');
      } else {
        async.waterfall([
          function(done) {
            users.findAll({
              where: {
                reset_password_token: req.params.token
              }
            })
            .then(function(rows) {
              if(rows.length <= 0) {
                req.flash('error', 'Password reset token is invalid.');
                return res.redirect('/forgot');
              }
        
              var validTime = moment().diff(rows[0].reset_password_expires , 'minute');
        
              if(validTime > 30){
                req.flash('error', 'Password reset token has expired.');
                return res.redirect('/forgot');
              }
  
              var newPassword = req.body.password;
              newPassword = config.salt.value+''+newPassword;

              var email = rows[0].email;
              users.update({
                password: Sequelize.fn('sha1', newPassword), 
                reset_password_token: null,
                reset_password_expires: null
                },
                { where: {
                  email: email
                }
              })
              .then(function(rows, err) {
                if (err) throw err;

                users.findAll({
                  where: {
                    email: email
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
            console.log(rows[0].email);
            sgMail.send(mailOptions, function(err) {
              console.log(mailOptions);
              req.flash('info', 'Success! Your password has been changed.');
              res.redirect('/login')
              done(err, 'done');
            });
          }
        ], function(err) {
          res.redirect('/reset/'+req.params.id);
        });
      }
    } else {
      req.flash('error', errors);
      res.render('reset',{'error' :req.flash('error'), val_user: req.body.user, val_token: req.body.token});
    }
  })
});

module.exports = router;
