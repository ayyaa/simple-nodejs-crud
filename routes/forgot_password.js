const express = require('express');
const router = express.Router();
const config = require('../config');
const request = require('request');
const async = require('async');
const moment = require('moment');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const alert = require('alert-node');
const expressValidator = require('express-validator');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/forgot', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/home')
  } else {
    res.render('forgot_password',{'message' :req.flash('message')});
  }
});

router.post('/forgotpassword', function(req, res, next) {
  req.assert('mail', 'email is not Valid').isEmail()

  var errors = req.validationErrors();

  if (!errors) {
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
      req.flash('error', 'Please select captcha');
      return res.redirect('/forgot');
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
        req.getConnection(function(error, conn){
          var email = req.body.mail;
          var sql = "select * from user where email = ?";
          conn.query(sql, [email],function (err, rows){
            console.log(rows.length);
            if (rows.length <= 0) {
              req.flash('error', 'No account with that email address exists.');
              return res.redirect('/forgot');
            } else {
              var addAtrReset = {
                reset_password_token: token,
                reset_password_expires: moment().toDate()
              }
              var sql = "UPDATE user SET ? WHERE email = ?";
              conn.query(sql, [addAtrReset, email], function (err, rows){
                done(err, token, rows);
              }); 
            }
          });
        })
      },
      function(token, rows, done) {
        var mailOptions = {
          to: req.body.mail,
          from: config.message.from,
          subject: config.message.subject_reset,
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
  
        sgMail.send(mailOptions, function(err) {
          req.flash('info', 'An e-mail has been sent to ' + req.body.mail + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  } else {
    var error_msg = '';
    errors.forEach(function(error) {
      error_msg += error.msg + '\n'
    })

    req.flash('error', error_msg);
    res.redirect('/forgot');
  }
});

module.exports = router;
