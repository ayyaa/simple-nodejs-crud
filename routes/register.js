const express = require('express');
const router = express.Router();
const config = require('../config');
const async = require('async');
const moment = require('moment');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const alert = require('alert-node');
const expressValidator = require('express-validator');
const validateJoi = require('./joi-validate/joi-register');
const Sequelize = require('sequelize');
const users = require('./sequelize/models/seq-users');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/register', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/home')
  } else {
    res.render('register',{'message' :req.flash('message')});
  }
});

router.post('/register', function(req, res, next) {
  validateJoi.validate({username: req.body.username, email: req.body.email}, function(errors, value) {
    if (!errors) {
      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          users.findAll({
            attributes: ['user'],
            where: {
              user: req.body.username
            }
          })
          .then(function(rows, err) {
            if (rows.length > 0) {
              console.log(rows)
              req.flash('error', "Duplicate entry username !\nPlease input another username");
              res.render('register', {'error': req.flash('error')})
              // alert();          
            } else {
              users.findAll({
                attributes: ['email'],
                where: {
                  email: req.body.email
                }
              })
              .then(function(rows, err) {
                if (rows.length > 0){
                  req.flash('error', "Duplicate entry email !\nPlease input another email");
                  res.render('register', {'error': req.flash('error')})
                  // alert("Duplicate entry email !\nPlease input another email");
                } else {
                  users.create({ 
                    user: req.body.username, 
                    password: null,
                    email: req.body.email,
                    confirm_token: token
                  })
                  .then(function(rows, err) {
                    users.findAll({
                      where: {
                        user: req.body.username
                      }
                    })
                    .then(function(rows, err) {
                      done(err, token, rows);
                    })
                  })
                }
              })
            }
          })
        },
        function(token, rows, done) {
          var mailOptions = {
            to: rows[0].email,
            from: config.message.from,
            subject: config.message.subject_new_password,
            text: 'You are receiving this because you (or someone else) have requested to make an account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/confirm/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          console.log(rows[0].email);
          sgMail.send(mailOptions, function(err) {
            console.log(mailOptions);
            req.flash('success', 'Please, check your email to confirm your password.');
            res.render('register', {'success': req.flash('success')})
            done(err, 'done');
          });
        }
      ], function(err) {
        res.redirect('/reset/'+req.params.id);
      });   
    } else {
      req.flash('error', errors);
      res.render('register', {'error': req.flash('error')})
      // res.redirect('/register');
    } 
  })
});

module.exports = router;
