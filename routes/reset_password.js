const express = require('express');
const router = express.Router();
const config = require('../config');
const async = require('async');
const moment = require('moment');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const alert = require('alert-node');
const expressValidator = require('express-validator');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/reset/:token', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/home')
  } else {
    req.getConnection(function(error, conn){
      var sql = "select * from user where reset_password_token = ?";
      conn.query(sql, [req.params.token], function (err, rows){
        if (rows.length <= 0) {
          req.flash('error', 'Password reset token is invalid.');
          return res.redirect('/forgot');
        }
  
        var validTime = moment().diff(rows[0].reset_password_expires , 'minute');
  
        if (validTime > 30) {
          req.flash('error', 'Password reset token has expired.');
          return res.redirect('/forgot');
        }
  
        res.render('reset', {user: rows[0].user, email: rows[0].email});
      });
    })
  }
});

router.post('/reset/:token', function(req, res) {
  req.assert('password', 'password is requred').notEmpty();
  req.assert('confirm', 'confirm password is requred').notEmpty();

  var errors = req.validationErrors();

  if (!errors) {
    console.log(req.body.password);
    console.log(req.body.confirm);
    if (req.body.password != req.body.confirm) {
      alert('Password and confirm does not match.');
    } else {
      async.waterfall([
        function(done) {
          req.getConnection(function(error, conn){
            var sql = "select * from user where reset_password_token = ?";
            conn.query(sql, [req.params.token], function (err, rows){
              if(rows.length <= 0) {
                req.flash('error', 'Password reset token is invalid.');
                return res.redirect('/forgot');
              }
        
              var validTime = moment().diff(rows[0].reset_password_expires , 'minute');
        
              if(validTime > 30){
                req.flash('error', 'Password reset token has expired.');
                return res.redirect('/forgot');
              }
    
              var salt = config.salt.value;
              var newPassword = req.body.password;
              newPassword = salt+''+newPassword;
    
              var atrReset = {
                Reset_password_token: undefined,
                Reset_password_expires: null
              }

              var email = rows[0].email;
              var sql_update_user = "UPDATE user SET password = sha1(?), ? WHERE email = ?";
              conn.query(sql_update_user, [newPassword, atrReset, email], function(err) {
                if (err) throw err;
              });
              var sql_select_user = "select * from user where email = ?";
              conn.query(sql_select_user, [email], function(err, rows) {
                done(err, rows);
              });
    
            });
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
            req.flash('info', 'Success! Your password has been changed.');
            done(err, 'done');
          });
        }
      ], function(err) {
        res.redirect('/reset/');
      });
    }
  } else {
    var error_msg = '';
    errors.forEach(function(error) {
      error_msg += error.msg + '\n'
    })

    alert(error_msg);
    
  }
});

module.exports = router;
