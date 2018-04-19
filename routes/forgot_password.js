const express = require('express');
const router = express.Router();
const config = require('../config');
const request = require('request');
const async = require('async');
const moment = require('moment');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const alert = require('alert-node');
const validateJoi = require('./joi-validate/joi-forgot-password');
const Sequelize = require('sequelize');
const users = require('./sequelize/models/seq-users');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/forgot', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/home')
  } else {
    res.render('forgot_password',{'message' :req.flash('message')});
  }
});

router.post('/forgotpassword', function(req, res, next) {
  validateJoi.validate({email: req.body.email}, function(err, value) {
    if (!err) {
      if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        req.flash('error', "Please select chapcha");
        return res.render('forgot_password',{'error' :req.flash('error')});
        // return res.redirect('/forgot');
      }
      const secretKey = config.api_captcha.API;
      var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
      
      request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
          req.flash('error', 'Failed captcha verification.');
          return res.redirect('/forgot');
        }
      });

      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          users.findAll({
            where: {
              email: req.body.email
            }
          })
          .then(rows => {
            if (rows.length <= 0) {
              req.flash('error', 'No account with that email address exists.');
              res.render('forgot_password',{'error' :req.flash('error')});
            } else {
              var addAtrReset = {
                reset_password_token: token,
                reset_password_expires: moment().toDate()
              }
              users.update(
                addAtrReset,
                { where: {
                  email: req.body.email
                }
              })
              .then(function(rows, err){
                done(err, token, rows);
              })
            } 
          })
        },
        function(token, rows, done) {
          var mailOptions = {
            to: req.body.email,
            from: config.message.from,
            subject: config.message.subject_reset,
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          console.log(mailOptions);
    
          sgMail.send(mailOptions, function(err) {
            req.flash('info', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.');
            // res.redirect('/forgot');
            res.render('forgot_password',{'info' :req.flash('info')});
          });
        }
      ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
      });
    } else {
      console.log(err);
      req.flash('error', err);
      res.render('forgot_password',{'error' :req.flash('error')});
    }
  })
});

module.exports = router;
